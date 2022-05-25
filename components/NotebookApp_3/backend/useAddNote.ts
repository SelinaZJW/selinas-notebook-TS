

export default function useAddNote() {
 

  return (id, parentId) => {
    window.alert(`Attempting to add note under ${parentId} with ${id}`)
  }
}