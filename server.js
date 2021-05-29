const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');
const dbPath = './db/db.json';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// HTML routes created to serve up pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

//  API route read the `db.json` file and return all saved notes as JSON
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, dbPath));
});

//  API route receives a new note to save on the request body, adds it to the `db.json` file, and then return the new note to the client. Uses uniqid package to assign a unique ID.
app.post("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, dbPath), "utf8", function(error, response) {
        if (error) {
            console.log(error);
        }
        const notes = JSON.parse(response);
        const noteRequest = req.body;
        const newNoteID = uniqid();
        const newNote = {
            id: newNoteID,
            title: noteRequest.title,
            text: noteRequest.text
        };
        notes.push(newNote);
        res.json(newNote);
        fs.writeFile(path.join(__dirname, dbPath), JSON.stringify(notes, null, 2), function(err) {
            if (err) throw err;
        });
    });
});

//  API route delete a  note object in the `db.json` file 
app.delete("/api/notes/:id", function(req, res) {
    const deleteID = req.params.id;
    fs.readFile(dbPath, "utf8", function(error, response) {
       if (error) throw err;
        let notes = JSON.parse(response);
       
        res.json(notes.splice(deleteID-1,1));
       
        fs.writeFile(dbPath, JSON.stringify(notes, null, 2), function(err) {
            if (err) throw err;
        });

    });
});



app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));