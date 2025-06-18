import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { KudosCards } from './KudosCards'
import { KudosList } from './KudosList'
import { FilterBar } from "./FilterBar";
import { SearchComponents } from './SearchComponent'
import { CreateBoard } from './CreateBoard'
import "./Header.css"
import { useEffect } from 'react'

function App() {
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [showBoard, setShowBoard] = useState([])
  async function getBoards(){
    try{
      const response = await fetch(`http://localhost:3000/boards`)
      if(!response.ok){
       throw new Error("Can't create board")
      }
      const data = await response.json()
      console.log(data)
      setShowBoard(data)
    }catch{
      console.error("board couldn't load")
    }
    
  }
  useEffect(()=>{
    getBoards()
  },[])
  return (
    <>
      <header className='Header'>
        <h2>KUDOBOARD</h2>
      </header>
      <div className="card">
         <SearchComponents/>
        <FilterBar/>
        <button onClick={() => setOpenCreateModal(true)}>Create New Button</button>
        {openCreateModal && <CreateBoard 
        closeModal={setOpenCreateModal}/>}
        <KudosList showBoard = {showBoard}/>
        <footer>
          <p>&copy; 2025 Kudosboard</p>
        </footer>
      </div>
    </>
  )
}

export default App
