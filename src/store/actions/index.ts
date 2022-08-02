import {getTabNotes} from "./getTabNotes";
import {moveNotes} from "./moveNotes";
import {editTab} from "./editTab";
import {updateNoteTitle} from "./updateNoteTitle";
import {updateNote} from "./updateNote";
import {deleteTab} from "./deleteTab";
import {deleteNote} from "./deleteNote";
import {createTab} from "./createTab";
import {createRootNote} from "./createRootNote";
import {createNote} from "./createNote";

export default {
    createNote,
    createRootNote,
    createTab,
    deleteNote,
    deleteTab,
    editNote: updateNote,
    editNoteTitle: updateNoteTitle,
    editTab,
    getTabNotes,
    moveNotes
}