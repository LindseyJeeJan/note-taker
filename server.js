const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// HTML routes created to serve up pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

//  API route read the `db.json` file and return all saved notes as JSON
const dbPath = './db/db.json';

app.get('/api/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, notes) => {
      if (err) {
        throw err;
      }
        res.send(JSON.parse(notes));
    });
});

//  API route create note object in the `db.json` file 
app.post('/api/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, notes) => {

        const newId = uniqid();
        data.id = newId;
        data = req.body;

        fs.appendFile(dbPath, 'utf8', (err, newNote) => {
            if (err) {
                throw err;
            }
            
            res.send(JSON.parse(notes));
        });
    });
});     

//  API route delete a  note object in the `db.json` file 
app.delete('/api/notes/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const noteId = req.params["id"];
            delete data[noteId];

            writeFile(JSON.stringify(data), () => {
                res.status(200).send(`note id:${noteId} removed`);
            });
        },
            true);
    });
 

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));