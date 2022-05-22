const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    let allNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    res.json(allNotes);
});

app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync("./db/db.json"));

    noteList.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
});

app.delete("/api/notes:id", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});


app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));