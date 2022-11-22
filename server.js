const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get('/', (req, res) => {
    console.log(1);
    res.sendFile(path.join(initial_path, "index.html"));
})

app.get('/home', (req, res) => {
    console.log(2);
    res.sendFile(path.join(initial_path, "index.html"));
})

app.get('/editor', (req, res) => {
    console.log(3);
    res.sendFile(path.join(initial_path, "editor.html"));
})

app.post('/upload', (req, res) => {
    console.log(4);
    let file = req.files.image;
    let date = new Date();

    // image name
    let imagename = (date.getTime() + file.name);
    // .replace(" ", "%20") .replace(/\s/g, '%20')
    // image upload path
    let path = 'public/uploads/' + imagename;

    // create upload
    file.mv(path, (err, result) => {
        if (err) {
            throw err;
        } else {
            // our image upload path
            res.json(`uploads/${imagename}`)
        }
    })
})

app.get("/:blog/editor", (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
})

app.use((req, res) => {
    res.json("404");
})

app.listen("3000", () => {
    console.log('listening......');
})