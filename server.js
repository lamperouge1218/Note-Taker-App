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
// TODO: (10/6/2021) Make sure that GET * functions as needed in assignment README 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Notes.html upon button click and navigation to specific address
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// GET /api/notes reads the db.json file and returns all saved notes as JSON
// TODO: Every time save button is pressed, we want to read from the file again
// fs.readFile, return res.json(data)
app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", function (err, data) {
        res.send(data);
    })
});

// POST /api/notes receives a new note to save on the request body, 
// and adds it to the db.json file.
// Each note should has a unique ID
// TODO: Need to return the new note to the client. 
// Possibly an issue with the handleNoteSave function in index.js (though apparently not)
app.post("/api/notes", (req, res) => {
    console.log(`${req.method} request received to add new note`);
    // Destructuring for items 
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv1(),
        };

        // readFile function to read through the data in the db.json
        fs.readFile("./db/db.json", "utf-8", function (err, data) {
            // Const constaining the parsed data
            const parsedNotes = JSON.parse(data);
            // Pushes newNote object onto the array in the parsed data
            parsedNotes.push(newNote);
            // Overwrites the db.json file with all of the new data that has been posted.
            fs.writeFile(`./db/db.json`, JSON.stringify(parsedNotes), (err) => // Try the stringify a const thing above this - const stringParse = JSON.stringify(parsedNotes)
                err ? console.error(err) : console.log(`Note ${newNote.title} has been written to JSON file`)
            );
        })

        const response = {
            status: "success",
            body: newNote,
        };

        console.log(response);
        res.status(201).json(newNote); // possibly change this back to response
    } else {
        res.status(500).json('Error in posting note');
    }
})

app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);

