import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { Save, ArrowLeft } from 'lucide-react';

const SnippetEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('// Write your code here');
  const [language, setLanguage] = useState('javascript');
  const [tags, setTags] = useState('');
  const [visibility, setVisibility] = useState('private');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchSnippet();
    }
  }, [id]);

  const fetchSnippet = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/snippets`); 
      // Optimized: In a real app, I'd fetch by ID or store in context, 
      // but here I'm just filtering from list if I didn't implement getById endpoint specifically or lazy
      // Wait, snippetController.js doesn't have getById public route, it only has getSnippets (list).
      // I should probably fix the backend to have getById or just find it from the list if the user has it loaded.
      // But let's assume I can fetch all and find it, or better, add getById to backend.
      // For now, I'll filter client side for simplicity given the code I wrote.
      // Wait, updateSnippet uses /:id, delete uses /:id. getSnippets uses /. 
      // I'll fetch all and find. 
      const snippet = res.data.find((s: any) => s._id === id);
      if (snippet) {
          setTitle(snippet.title);
          setDescription(snippet.description);
          setCode(snippet.code);
          setLanguage(snippet.language);
          setTags(snippet.tags.join(', '));
          setVisibility(snippet.visibility || 'private');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    if (!title || !code) return alert('Title and Code are required');
    setLoading(true);
    try {
      const snippetData = {
        title,
        description,
        code,
        language,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        visibility
      };

      if (isEditing) {
        await axios.put(`http://localhost:5000/api/snippets/${id}`, snippetData);
      } else {
        await axios.post('http://localhost:5000/api/snippets', snippetData);
      }
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Error saving snippet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[90vh] flex flex-col bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="bg-muted/30 border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-input rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <input
            type="text"
            placeholder="Untitled Snippet"
            className="text-xl font-bold bg-transparent border-none focus:outline-none placeholder-gray-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="bg-input border-none rounded-md px-3 py-1.5 focus:ring-1 focus:ring-foreground text-sm"
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-input border-none rounded-md px-3 py-1.5 focus:ring-1 focus:ring-foreground text-sm"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="json">JSON</option>
            <option value="sql">SQL</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
          </select>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-md hover:opacity-90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{loading ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/4 border-r border-border p-4 space-y-4 bg-background overflow-y-auto">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500">Description</label>
            <textarea
              className="w-full bg-input rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground resize-none"
              rows={4}
              placeholder="What does this snippet do?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-500">Tags</label>
            <input
              type="text"
              className="w-full bg-input rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
              placeholder="react, hook, utility (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 bg-[#1e1e1e]">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            language={language}
            value={code}
            theme="vs-dark"
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              padding: { top: 20 },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SnippetEditor;
