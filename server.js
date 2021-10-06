const express = require('express');
const notesDB = require("./db/db.json");
const path = require('path');
const fs = require("fs");
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Requests as follows:

// Index.html on main page load. No idea how GET * Works yet.
// TODO: Make sure that GET * fucntions as needed in assignment README (10/6/2021)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

// Notes.html upon button click and navigation to specific address
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html')); 
});

// TODO: GET /api/notes should read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => res.json(notesDB));

// TODO: POST /api/notes should receive a new note to save on the request body, 
// add it to the db.json file, and then return the new note to the client. 
// Each note should have a unique ID.

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);