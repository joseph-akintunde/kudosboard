import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BoardPage from './BoardPage'
import { KudosCards } from './KudosCards'
import { KudosList } from './KudosList'
import { FilterBar } from "./FilterBar";
import { SearchComponents } from './SearchComponent'
import { CreateBoard } from './CreateBoard'
import "./Header.css"
import { useEffect } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { CreateCards } from './CreateCards'
import { BoardList } from './BoardList'
import { useParams } from 'react-router-dom'

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
    <BrowserRouter>
      <header className='Header'>
        <h1>KUDOBOARD</h1>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <div className="card">
              <SearchComponents setShowBoard={setShowBoard} />
              <FilterBar setShowBoard={setShowBoard} />
              <button onClick={() => setOpenCreateModal(true)}>Create New Board</button>
              
              <KudosList showBoard={showBoard} getBoards={getBoards} />
            </div>
          }
        />
        <Route
          path="/boards/:boardId"
          element={
            <div>
              <BoardPage/>
            </div>
          }
        />
      </Routes>
      <footer>
        <p>&copy; 2025 Kudosboard</p>
      </footer>
    </BrowserRouter>
  )
}

export default App
