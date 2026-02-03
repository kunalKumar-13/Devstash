const Snippet = require('../models/Snippet');

exports.getSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createSnippet = async (req, res) => {
  try {
    const { title, code, language, description, tags, visibility } = req.body;

    const newSnippet = new Snippet({
      title,
      code,
      language,
      description,
      tags,
      visibility: visibility || 'private',
      user: req.user.id
    });

    const snippet = await newSnippet.save();
    res.status(201).json(snippet);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPublicSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id).populate('user', 'username');
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
    
    if (snippet.visibility !== 'public' && (!req.user || snippet.user._id.toString() !== req.user.id)) {
        return res.status(403).json({ message: 'Access denied' });
    }

    res.json(snippet);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateSnippet = async (req, res) => {
  try {
    const { title, code, language, description, tags, isFavorite, visibility } = req.body;
    
    let snippet = await Snippet.findById(req.params.id);
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
    
    if (snippet.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    snippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      { $set: { title, code, language, description, tags, isFavorite, visibility, updatedAt: Date.now() } },
      { new: true }
    );

    res.json(snippet);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });

    if (snippet.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await snippet.deleteOne();
    res.json({ message: 'Snippet removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
