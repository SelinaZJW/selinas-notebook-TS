import axios from 'axios'

import {ICreateTab, ITab} from "../src/model"

const baseUrl_tree = `/api/tree`
const baseUrl_tabs = `/api/tabs`
const baseUrl_notes = `/api/notes`

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

const createNewTabAfter = async (title, after) => {
  const newT = {title, after}
  const response = await axios.post(baseUrl_tabs, newT)
  return response.data
}


const createNewNote = async (title, content, parentId, after, tabId) => {
  const newN = {title, content, parentId, after}
  const response = await axios.post(`${baseUrl_tabs}/${tabId}/notes`, newN)
  return response.data
}

const editTabTitle = async (title, tabId) => {
  const editedTab = {title}
  const response = await axios.put(`${baseUrl_tabs}/${tabId}`, editedTab)
  return response.data
}

const editTabOrderFirst = async (tabId) => {
  const editedTab = {first: true}
  const response = await axios.put(`${baseUrl_tabs}/${tabId}`, editedTab)
  return response.data
}

const editTabOrderNonFirst = async (tabId, after) => {
  const editedTab = {after}
  const response = await axios.put(`${baseUrl_tabs}/${tabId}`, editedTab)
  return response.data
}

// const setNoteTitle = async (title, noteId) => {
//   const editedNote = await axios.get(`${baseUrl_notes}/${noteId}`)
//   const updatedNote = {
//     ...editedNote,
//     title: title === editedNote.title? editedNote.title : title
//   }

//   const response = await axios.put(`${baseUrl_notes}/${noteId}`, updatedNote)
//   return response.data
//   }

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

const deleteTab = async (tabId) => {
  const response = await axios.delete(`${baseUrl_tabs}/${tabId}`)

  return response.headers
}

const deleteNote = async (noteId) => {
  const response = await axios.delete(`${baseUrl_notes}/${noteId}`)

  return response.headers
}

export default  {}

// export default { getAllTabs, getTabNotes, createNewTab, createNewTabAfter, createNewNote, editTabTitle, editTabOrderFirst,editTabOrderNonFirst, setNoteTitle, editNoteContent, editNoteParentNonRoot, editNoteParentRoot, editNoteOrderFirst, editNoteOrderNonFirst, deleteTab, deleteNote }