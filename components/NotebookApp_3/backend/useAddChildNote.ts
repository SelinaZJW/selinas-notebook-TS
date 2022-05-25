export default function useAddChildNote() {
 

  return (parentId) => {
    window.alert(`Attempting to add a child note under ${parentId}`)
  }
}