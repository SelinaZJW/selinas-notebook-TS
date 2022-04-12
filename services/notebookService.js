import axios from 'axios'

const baseUrl_tree = 'https://selinas-notes.herokuapp.com/api/v1/tree'
const baseUrl_tabs = 'https://selinas-notes.herokuapp.com/api/v1/tabs'
const baseUrl_notes = 'https://selinas-notes.herokuapp.com/api/v1/notes'

const getAllTabs = async () => {
  const response = await axios.get(baseUrl_tabs)
  return response.data
}

const getTabNotes = async (tabId) => {
  const response = await axios.get(`${baseUrl_tree}/${tabId}`)
  return response.data
}

const createNewTab = async (title) => {
  const newT = {title}
  const response = await axios.post(baseUrl_tabs, newT)
  return response.data
}

const createNewNote = async (parentId, title, content, tabId) => {
  const newN = {parentId, title, content}
  const response = await axios.post(`${baseUrl_tabs}/${tabId}/notes`, newN)
  return response.data
}

const editTab = async (title, tabId) => {
  const editedTab = {title}
  const response = await axios.put(`${baseUrl_tabs}/${tabId}`, editedTab)
  return response.data
}

const editNoteTitle = async (title, noteId) => {
  const editedNote = await axios.get(`${baseUrl_notes}/${noteId}`)
  const updatedNote = {
    ...editedNote,
    title: title === editedNote.title? editedNote.title : title
  }

  const response = await axios.put(`${baseUrl_notes}/${noteId}`, updatedNote)
  return response.data
  }

const editNoteContent = async (content, noteId) => {
  const editedNote = await axios.get(`${baseUrl_notes}/${noteId}`)
  const updatedNote = {
    ...editedNote,
    content: content
  }

  const response = await axios.put(`${baseUrl_notes}/${noteId}`, updatedNote)
  return response.data
}

//parentId is null, if changing level to level 1, right below tab level
const editNoteParent = async (parentId, noteId) => {
  const editedNote = await axios.get(`${baseUrl_notes}/${noteId}`)
  const updatedNote = {
    ...editedNote,
    parentId: parentId
  }

  const response = await axios.put(`${baseUrl_notes}/${noteId}/set-parent`, updatedNote)
  return response.data
}

export default { getAllTabs, getTabNotes, createNewTab, createNewNote, editTab, editNoteTitle, editNoteContent, editNoteParent }