import noteService from "../../../services/noteService";

export const deleteNote = (noteId) => {
    return async dispatch => {
        noteService.deleteNote(noteId).then(
            dispatch({
                type: 'DELETE_NOTE',
                noteId
            })
        )
    }
}