import axios from 'axios'

const baseUrl_tabs = 'https://selinas-notes.herokuapp.com/api/v1/tabs'
const baseUrl_notes = 'https://selinas-notes.herokuapp.com/api/v1/notes'

//if no parentId, is root
//if no after, is last 
const createNewNote = async (tabId, newNote) => {
  const response = await axios.post(`${baseUrl_tabs}/${tabId}/notes`, newNote)
  return response.data
}

// const editNoteTitle = async (title, noteId) => {
//   const editedNote = await axios.get(`${baseUrl_notes}/${noteId}`)
//   const updatedNote = {
//     ...editedNote,
//     title: title === editedNote.title? editedNote.title : title
//   }

//   const response = await axios.put(`${baseUrl_notes}/${noteId}`, updatedNote)
//   return response.data
//   }

//updatedNote is object/request
const editNote = async (noteId, updatedNote) => {
  const response = await axios.put(`${baseUrl_notes}/${noteId}`, updatedNote)
  return response.data
}

const editNoteTitle = async (title, noteId) => {
  const editedNote = {title}
  const response = await axios.put(`${baseUrl_notes}/${noteId}`, editedNote)
  return response.data
}

const editNoteContent = async (content, noteId) => {
  const editedNote = {content}
  const response = await axios.put(`${baseUrl_notes}/${noteId}`, editedNote)
  return response.data
}

const editNoteParentRoot = async (noteId) => {
  const editedNote = {isRoot: true}
  const response = await axios.put(`${baseUrl_notes}/${noteId}`, editedNote)
  return response.data
}

const editNoteParentNonRoot = async (parentId, noteId) => {
  const editedNote = {parentId}
  const response = await axios.put(`${baseUrl_notes}/${noteId}`, editedNote)
  return response.data
}

const editNoteOrderFirst = async (noteId) => {
  const editedNote = {first: true}
  const response = await axios.put(`${baseUrl_notes}/${noteId}`, editedNote)
  return response.data
}

const editNoteOrderNonFirst = async (after, noteId) => {
  const editedNote = {after}
  const response = await axios.put(`${baseUrl_notes}/${noteId}`, editedNote)
  return response.data
}


const deleteNote = async (noteId) => {
  const response = await axios.delete(`${baseUrl_notes}/${noteId}`)

  return response.headers
}



export default { createNewNote, editNote, editNoteTitle, editNoteContent, editNoteParentNonRoot, editNoteParentRoot, editNoteOrderFirst, editNoteOrderNonFirst, deleteNote }