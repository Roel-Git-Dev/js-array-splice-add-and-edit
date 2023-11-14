import { useState, createContext } from 'react'

const AddEditContext = createContext()

function AddEditContextWrapper(props) {
  const [contextValue, setContextValue] = useState("")
  const { children, extraContext } = props

  const passed_context = {
      default_context: [contextValue, setContextValue],
      added_context: extraContext
  }

  return (
      <AddEditContext.Provider value={passed_context} >
          {children}
      </AddEditContext.Provider>
  )
}

export default AddEditContextWrapper
export { AddEditContext }