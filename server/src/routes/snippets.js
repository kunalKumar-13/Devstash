const express = require('express');
const router = express.Router();
const { getSnippets, createSnippet, updateSnippet, deleteSnippet, getPublicSnippet } = require('../controllers/snippetController');
const auth = require('../middleware/auth');

router.get('/', auth, getSnippets);
router.get('/public/:id', getPublicSnippet); // Public route
router.post('/', auth, createSnippet);
router.put('/:id', auth, updateSnippet);
router.delete('/:id', auth, deleteSnippet);

module.exports = router;
