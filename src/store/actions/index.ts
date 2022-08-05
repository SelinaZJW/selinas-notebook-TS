import {getTabNotes} from "./getTabNotes";
import {moveNotes} from "./moveNotes";
import {updateTab} from "./updateTab";
import {editNoteTitle} from "./editNoteTitle";
import {updateNote} from "./updateNote";
import {deleteTab} from "./deleteTab";
import {deleteNote} from "./deleteNote";
import {createTab} from "./createTab";
import {addDraftNote} from "./addDraftNote";
import {createNote} from "./createNote";

export default {
    createNote,
    createRootNote: addDraftNote,
    createTab,
    deleteNote,
    deleteTab,
    editNote: updateNote,
    editNoteTitle: editNoteTitle,
    editTab: updateTab,
    getTabNotes,
    moveNotes
}