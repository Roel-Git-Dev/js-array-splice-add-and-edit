import { useState, useEffect, useContext} from 'react';
import { AddEditContext } from '../../context/AddEditContextWrapper';

const setResultToAdd = (resultStateCB) => {
    resultStateCB(prev => {
        return "Add"
    })
}

const setResultToEdit = (resultStateCB) => {
    resultStateCB(prev => {
        return "Edit"
    })
}

function ActionChooser() {
    const [result, setResult] = useState("???")  
    const add_edit_context_receiver = useContext(AddEditContext)
    const [contextValue, setContextValue] = add_edit_context_receiver.default_context

    useEffect(() => {  
        setContextValue(prev => {
            return result
        })
    },[result])

  return (
    <div id={"ActionChooser"}>
        <button  onClick={() => {setResultToAdd(setResult)}}>Add an item</button>
        <div className={"result"} >Current action: {result} item</div>
        <button  onClick={() => {setResultToEdit(setResult)}}>Edit an item</button>
    </div>
  )
}

export default ActionChooser