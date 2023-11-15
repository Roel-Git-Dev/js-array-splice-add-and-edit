import { useContext, useRef, createContext } from "react"
import { AddEditContext } from "../../context/AddEditContextWrapper"

const InternalContext = createContext(null)

const componentDecider = (result) => {
    if (result === "Add") {
        return <AddInputOption />
    }
    else if (result === "Edit") {
        return <EditInputOption />
    }
}

const componentWrapperClassName = (result) => {
    if (result === "Add")
        return "add-input-options"
    if (result === "Edit")
        return "edit-input-options"
    return ""
}

const addToList = (item, listArrStateCB) => {
    listArrStateCB(prev => {
        if (prev === null) {
            let new_arr = []
            new_arr.push(item.value)
            return new_arr
        }
        let new_arr = [...prev]
        let latest_index = (new_arr.length <=  0) ? 0:new_arr.length
        new_arr.splice(latest_index, 0, item.value)
        return new_arr
    })
}

const editList = (updatedValueRef, indexToUpdateRef, listArrStateCB) => {
    listArrStateCB(prev => {
        if (prev === null) {
            return
        }
        let new_arr = [...prev]
        new_arr.splice(indexToUpdateRef.current.value, 1, updatedValueRef.current.value)
        prev = [...new_arr]
        return prev
    })
}

function AddInputOption() {
    const internal_context = useContext(InternalContext)
    const [listArr, setListArr] = internal_context
    const inputRef = useRef()
    return (
        <>
            <label htmlFor="ItemToAdd">Item to Add: </label>
            <input ref={inputRef} id="ItemToAdd" type="text" />
            <button onClick={() => { addToList(inputRef.current,setListArr)} } >Add this item</button>
        </>
      
    )
}

function EditInputOption() {
    const internal_context = useContext(InternalContext)
    const [listArr, setListArr] = internal_context
    const inputUpdateRef = useRef()
    const inputUpdateIndexRef = useRef()

    if (listArr === null) {
        return
    }

    let highestIndex = (listArr.length <= 0)? 0:listArr.length -  1

    return (
        <>
            <label htmlFor="UpdatedValue">Updated Value: </label>
            <input ref={inputUpdateRef} id="UpdatedValue" type="text" />
            <label htmlFor="UpdatedIndex">Index to update: </label>
            <input ref={inputUpdateIndexRef} type="number" min={0} max={highestIndex} />
            <button onClick={() => {editList(inputUpdateRef,inputUpdateIndexRef,setListArr) } }>Edit this index</button>
        </>

    )
}

function AddEditInputOptions() {
    const add_edit_context_receiver = useContext(AddEditContext)
    const [contextValue, setContextValue] = add_edit_context_receiver.default_context
    const [listArr, setListArr] = add_edit_context_receiver.added_context

    let component_wrapper_classname = componentWrapperClassName(contextValue)

    return (
        <>
            <InternalContext.Provider value={[listArr,setListArr]}>  
                <div className={`${component_wrapper_classname}`}>
                {componentDecider(contextValue)}
                </div>      
            </InternalContext.Provider>
        </>
    )
}

export default AddEditInputOptions