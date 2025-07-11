const express = require('express');
const router = express.Router();
const Note = require('../../models/Notes'); 

// in-memory storage for notes 
const notes = [];

// @route           POST api/notes
// @description     Create a fresh new note entry
router.post('/', async (req, res) => {
  const { subject, bodyText, category, author } = req.body; 
  if (!subject || !bodyText) {
    return res.status(400).json({ msg: 'Subject and body text are essential for a new note.' });
  }

  const newNote = new Note({
    subject,
    bodyText,
    category: category || 'General',
    author: author || 'Anonymous', 
  });

  notes.push(newNote);
  res.status(201).json(newNote);
});

// @route           GET api/notes
// @description     Retrieve all saved notes
router.get('/', (req, res) => {
  res.json(notes);
});

// @route           GET api/notes/:id
// @description     Find a specific note by its ID
router.get('/:id', (req, res) => {
  const note = notes.find(n => n.noteId === req.params.id);
  if (!note) return res.status(404).json({ msg: 'Requested note not found.' });
  res.json(note);
});

// @route           PUT api/notes/:id
// @description     Update an existing note's details
router.put('/:id', (req, res) => {
  const note = notes.find(n => n.noteId === req.params.id);
  if (!note) return res.status(404).json({ msg: 'Note for update not found.' });

  const { subject, bodyText, category, author } = req.body; 
  if (subject) note.subject = subject;
  if (bodyText) note.bodyText = bodyText;
  if (category) note.category = category;
  if (author) note.author = author; 
  note.lastModifiedDate = new Date();

  res.json(note);
});

// @route           DELETE api/notes/:id
// @description     Remove a note by its ID
router.delete('/:id', (req, res) => {
  const index = notes.findIndex(n => n.noteId === req.params.id);
  if (index === -1) return res.status(404).json({ msg: 'Note to delete not found.' });

  notes.splice(index, 1);
  res.json({ msg: 'Note successfully removed.' });
});

module.exports = router;