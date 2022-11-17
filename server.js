const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()
const port = 6900

const noteData = require('./db/db.json')
const { fstat } = require('fs')
// console.log(noteData[0].title)
const dbPath = path.join(__dirname, 'db', 'db.json')

app.use(express.static('public'))
app.use(express.json())

// API routes
// GET
app.get('/api/notes', (req, res) => {
  fs.readFile(dbPath, 'utf8', function(err, data) {
    if (err) {
        res.status(500).json(err)
        return
    }
    const json = JSON.parse(data)
    res.json(json)
  })
})
// POST
app.post('/api/notes', (req, res) => {
 //   console.log(req.body)
    const { title, text } = req.body
    const newNote = {
        ...req.body,
        id: Math.random()
    }

 //   console.log(newNote)

    fs.readFile(dbPath, 'utf8', function (err, data) {
        const noteData = JSON.parse(data)
        console.log(noteData)
        noteData.push(newNote)
        fs.writeFile(dbPath, JSON.stringify(noteData), function(err) {
            if (err) {
                res.status(500).json(err)
                return
            }
            res.status(200).json(newNote)
        })
    })
})


// html routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))   
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))   
})

// running
app.listen(port, () => {
    console.log(`app runnning on http://localhost:${port}`)
})
