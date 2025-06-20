import { useState } from "react"
import "./CreateBoard.css"
export function CreateBoard({closeModal,getBoards}){
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [author, setAuthor] = useState('')
    async function handleCreateBoard(e){
        e.preventDefault
        try{
            const baseUrl =  import.meta.env.VITE_BASE_URL
              const response = await fetch(`${baseUrl}boards` , {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                name: name,
                author: author,
                category: category,
            
              }),
            })
            if(response.ok){
                const data = await response.json()
                console.log("board created: ", data)
                
                getBoards()
                setName('')
                setAuthor('')
                setCategory('')
                
              } else{
                throw new error("Failed")
              }
        } catch{
            console.log("error")
        }
    }
    //create
    return(
        <div className="newBoardModal">
            <h2>CREATE NEW BOARD</h2>
            <form action="">
                <label htmlFor="name">Title: </label>
                <input type="text" id="name" name="name" value = {name} onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="category">Category: </label>
                <select name="category" id="category" value = {category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="" disabled>Select a Category</option>
                    <option value="Celebration">Celebration</option>
                    <option value="Thank_you">Thank you</option>
                    <option value="Inspiration">Inspiration</option>
                </select>
                <label htmlFor="author">Author: </label>
                <input type="text" name="author" value = {author} onChange={(e) => setAuthor(e.target.value)}/>
            </form>
            <button onClick={() => {
                closeModal(false)
                }}>CLOSE</button>
            {name && category && (<button onClick={handleCreateBoard}>CREATE BOARD</button>)}
        </div>
    )
}