require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const app = express()
const FoldersService = require('./folders-service')
const NotesService = require('./notes-service')

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

  const knex = require('knex')
  const knexInstance = knex({
    client: 'pg',
    connection: "postgresql://rachelemilyperez@localhost/noteful"
  })
  console.log('connection successful');

  FoldersService.getAllFolders(knexInstance)
  .then(folders => console.log(folders))
  .then(() =>
    FoldersService.insertFolder(knexInstance, {
      // id:  'id',
      folder_name: 'NewFolder',
      contents: 'New content'
    })
  )
  .then(newFolder => {
    console.log(newFolder)
    return FoldersService.updateFolder(
      knexInstance,
      newFolder.id,
      { folder_name: 'Updated name' }
    ).then(() => FoldersService.getById(knexInstance, newFolder.id))
  })
  .then(folder => {
    console.log(folder)
    return FoldersService.deleteFolder(knexInstance, folder.id)
  })

  NotesService.getAllNotes(knexInstance)
  .then(notes => console.log(notes))
  .then(() =>
    NotesService.insertNote(knexInstance, {
      note_name: 'new note',
      folder: 3,
      // content: 'New content'
    })
  )
  .then(newNote => {
    console.log(newNote)
    return NotesService.updateNotes(
      knexInstance,
      newNote.id,
      { note_name: 'Updated name' }
    ).then(() => NotesService.getById(knexInstance, newNote.id))
  })
  .then(note => {
    console.log(note)
    return NotesService.deleteNote(knexInstance, note.id)
  })

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

// app.get('/', (req, res) => {
//     res.send('Hello, world!')
// })

// // app.get('/notes', (req, res) => {
// //   const knexInstance = req.app.get('db')
// //   NotesService.getAllNotes(knexInstance)
// //     .then(notes => {
// //       res.json(notes)
// //     })
// //     .catch(next)
// // })

// // app.post('/notes', (req, res) => {
// //     res.send('Post notes!')
// // })

// app.get('/folders', (req, res) => {
//   const knexInstance = req.app.get('db')
//   FoldersService.getAllFolders(knexInstance)
//   .then(folders => {
//     res.json(folders)
//   })
//   .catch(next)  
// })

// app.post('/folders', (req, res) => {
//     res.send('Post folders!')
// })

app.use(function errorHandler(error, req, res, next) {
  let response
  if (process.env.NODE_ENV === 'production') {
  response = { error: { message: 'server error' } }
  } else {
    console.error(error)
  response = { message: error.message, error }
  }
  res.status(500).json(response)
})
    
module.exports = app