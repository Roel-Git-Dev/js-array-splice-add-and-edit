import { useState, useEffect, useRef } from "react"
import "./App.css"
import ActionChooser from "./components/ActionChooser/ActionChooser"
import AddEditInputOptions from "./components/AddEditInputOptions/AddEditInputOptions"
import AddEditContextWrapper from "./context/AddEditContextWrapper"

const screenResizing = (screenWidthStateCB, appTitleStateCB) => {
    screenWidthStateCB(prev => {
        return window.innerWidth
    })
    appTitleStateCB(prev => {
        if (window.innerWidth > 600)
            return "Array Splice; Using Add and Edit"
        else
            return "Using Add and Edit, Splice, Operations"
    })

}

function App() {
    const [listArr, setListArr] = useState(null)
    const [appTitle, setAppTitle] = useState("")
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    //This effect is use once a page load
    useEffect(() => {
        if (window.innerWidth > 600)
            setAppTitle(prev => "Array Splice; Using Add and Edit")
        else
            setAppTitle(prev => "Using Add and Edit, Splice, Operations")
    })

    //This effect is use for screen resizing
    useEffect(() => {  
        window.addEventListener("resize", () => { screenResizing(setScreenWidth,setAppTitle) })
        return () => {
            window.removeEventListener("resize", () => { screenResizing(setScreenWidth,setAppTitle) })
        }
    }, [])


    return (
    <>
            <h1 className={"app-title"} >{appTitle}</h1>
            <h2>Choose the action you want</h2>
            <AddEditContextWrapper extraContext={[listArr,setListArr]}>
            <ActionChooser />  
            <AddEditInputOptions/>
            </AddEditContextWrapper>
       
            <div id="ItemListContainer">
                <h2>Current Items</h2>
                {
                    (listArr === null) ? <h3>No Items Yet</h3> 
                    :
                    <ul>
                       {

                        listArr.map((item, index) => {
                            return <li key={`${index}_${item}`}>[{index}] {item}</li>
                        })
                       }
                   </ul>
                }
               
            </div>
        </>
    )
}

export default App


