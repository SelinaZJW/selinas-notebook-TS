import axios from 'axios'

const baseUrl_tree = 'https://selinas-notes.herokuapp.com/api/v1/tree'
const baseUrl_tabs = 'https://selinas-notes.herokuapp.com/api/v1/tabs'

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



const editTab = async (tabId, updatedTab) => {
  const response = await axios.put(`${baseUrl_tabs}/${tabId}`, updatedTab)
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


const deleteTab = async (tabId) => {
  const response = await axios.delete(`${baseUrl_tabs}/${tabId}`)

  return response.headers
}

export default { getAllTabs, getTabNotes, createNewTab, createNewTabAfter, editTab, editTabTitle, editTabOrderFirst,editTabOrderNonFirst, deleteTab }