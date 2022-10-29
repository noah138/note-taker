const path = require('path');
const fs = require('fs');

const database = require('../db/db.json')

let userID = database.length

module.exports = (app) => {
    // GET /api/notes reads the db.json file and returns all saved notes as JSON
    app.get('/api/notes', (req,res)=>{
        res.sendFile(path.join(__dirname, "../db/db.json"))
    })
    // POST /api/notes receives a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
    app.post('/api/notes', (req,res)=>{
        let database = require('../db/db.json');

        let newNote = req.body;

        // ID is saved as its position in the JSON, increases by one each time note is stored
        newNote['id'] = userID + 1;
        userID++;

        console.log(newNote);
        
        database.push(newNote);
        fs.writeFileSync(
            path.join(__dirname, "../db/db.json"),
            JSON.stringify(database));
            res.json(database);
    })
    // delete button functionality removes the note by filtering by id
    app.delete('/api/notes/:id', (req,res)=>{
        // reads notes from json file
        let database = JSON.parse(fs.readFileSync('db/db.json'))

        // removes the note by filtering by id
        let notesLeft = database.filter(item => item.id !== req.params.id);

        // rewrites the notes minus the deleted note to the json file
        fs.writeFileSync('db/db.json', JSON.stringify(notesLeft));
        res.json(notesLeft);
    })
}



