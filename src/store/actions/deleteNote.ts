import noteService from "../../../services/noteService";

export const deleteNote = (tabId, noteId) => {
    return async dispatch => {
        noteService.deleteNote(noteId).then(
            dispatch({
                type: 'DELETE_NOTE',
                tabId,
                noteId
            })
        )
    }
}