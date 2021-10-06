// Requires
const express = require('express');
const notesDB = require("./db/db.json");
const path = require('path');
const fs = require("fs");
const uuidv1 = require('uuidv1');

// Consts used during the process
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Requests as follows:

// Index.html on main page load. No idea how GET * Works yet.
// TODO: (10/6/2021) Make sure that GET * fucntions as needed in assignment README 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Notes.html upon button click and navigation to specific address
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// GET /api/notes reads the db.json file and returns all saved notes as JSON
app.get('/api/notes', (req, res) => res.json(notesDB));

// TODO: POST /api/notes should receive a new note to save on the request body, 
// add it to the db.json file, and then return the new note to the client. 
// Each note should have a unique ID.
app.post("/api/notes", (req, res) => {
    console.log(`${req.method} request received to add new note`);
    // Destructuring for items 
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            review_id: uuidv1(),
        };

        const noteString = JSON.stringify(newNote);

        fs.writeFile(`./db/${newNote.title}.json`, noteString, (err) =>
            err ? console.error(err) : console.log(`Note ${newNote.title} has been written to JSON file`)
        );

        const response = {
            status: "success",
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note');
    }
})

app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);