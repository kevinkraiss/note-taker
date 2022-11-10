const path = require('path')
const express = require('express')
const app = express()
const port = 6900

const noteData = require('./db/db.json')
// console.log(noteData[0].title)

app.use(express.static('public'))

// api route
app.get('/api/notes'), (req, res) => {
    let result = noteData
    console.log(req.query)
}

// html route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))   
})

// running
app.listen(port, () => {
    console.log(`app runnning on http://localhost:${port}`)
})
