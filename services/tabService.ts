import axios from 'axios'
import {ITab, ITreeNode, TabId} from "../src/model";
import {TabbedItem} from "devextreme-react/form";

const baseUrl_tree = `/api/tree`
const baseUrl_tabs = `/api/tabs`

const getAllTabs = async () => {
  const response = await axios.get<ITab[]>(baseUrl_tabs)
  return response.data
}

const getTabNotes: (tabId: TabId) => Promise<ITreeNode> = async (tabId: TabId) => {
  const response = axios.get(`${baseUrl_tree}/${tabId}`)
  return response.then(resp => resp.data)
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