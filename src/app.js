const express = require('express')
const noteModel = require('./models/note.model')
const cors = require("cors")

const app = express()


app.use(express.json())
app.use(express.static('./public'))

app.use(cors())

app.post('/api/notes', async (req,res)=>{
    console.log(req.body);
    
    const {Title, Description} = req.body
    let note = await noteModel.create({
        Title, Description
    })

    res.status(201).json({
        message : "Note Created Successfully",
        note
    })
} )


app.get("/api/notes",async  (req,res)=>{
    let notes = await noteModel.find()
    res.status(200).json({
        message : "Notes fetched successfully",
        notes 
    })
})
app.delete("/api/notes/:id",async  (req,res)=>{ 
    const noteId = req.params.id
    await noteModel.findByIdAndDelete(noteId)
    res.status(200).json({
        message : "Notes Deleted successfully"
    })
})

module.exports = app