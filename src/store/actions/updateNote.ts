import noteService from "../../../services/noteService";

export const updateNote = (tabId, noteId, updatedNote) => {
    return async dispatch => {
        console.log(`editNote`, updatedNote)

        dispatch({
            type: 'SET_NOTE',
            tabId,
            noteId,
            noteData: updatedNote
        })

        const updateP = updatedNote.draft ? noteService.createNewNote(tabId, updatedNote) : noteService.editNote(noteId, updatedNote)

        updateP.then(result => {
            dispatch({
                type: 'SET_NOTE',
                tabId,
                noteData: {
                    id: noteId,
                    draft: false
                }
            })
        })
    }
}