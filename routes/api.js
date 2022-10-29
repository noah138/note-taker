const path = require('path');
const fs = require('fs');

const database = require('../db/db.json')

let userID = database.length

// rewrites the JSON file
function reWrite() {
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(database));
        res.json(database);
}

module.exports = (app) => {
    // GET /api/notes reads the db.json file and returns all saved notes as JSON
    app.get('/api/notes', (req,res)=>{
        res.sendFile(path.join(__dirname, "../db/db.json"))
    });
    // POST /api/notes receives a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
    app.post('/api/notes', (req,res)=>{
        let newNote = req.body;

        // ID is saved as its position in the JSON, increases by one each time note is stored
        newNote['id'] = userID + 1;
        userID++;
        
        database.push(newNote);
        reWrite();
    });

    // note deleting function
    app.delete('/api/notes/:id', (req,res)=>{
        // loop through database, when note matches id of deleted note, splice it
        for (let i = 0; i < database.length; i++) {
            if (database[i].id == req.params.id) {
                database.splice(i,1);
                break;
            }
        }
        reWrite();
    });
}