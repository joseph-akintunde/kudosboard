import { useState } from 'react'
import './App.css'
import BoardPage from './BoardPage'
import { KudosList } from './KudosList'
import { FilterBar } from "./FilterBar";
import { SearchComponents } from './SearchComponent'
import { CreateBoard } from './CreateBoard';
import "./Header.css"
import { useEffect } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
function App() {
  const baseUrl =  import.meta.env.VITE_BASE_URL
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [showBoard, setShowBoard] = useState([])
  const [darkMode, setDarkMode] = useState(false);
  function toggleDarkMode() {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode',(newMode));
      return newMode;
    });
  }

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);
  async function getBoards(){
    try{
      const response = await fetch(`${baseUrl}boards`)
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

  useEffect(() => {
  document.body.className = darkMode ? 'dark-mode' : 'light-mode';
}, [darkMode]);
  return (
    <BrowserRouter>
    <div>
        <header className='Header'>
        <button onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
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
              {openCreateModal && <CreateBoard closeModal={setOpenCreateModal} getBoards = {getBoards}/>}
              <KudosList showBoard={showBoard} getBoards={getBoards} />
            </div>
          }
        />
        <Route
          path="/boards/:boardId"
          element={
              <BoardPage/>
          }
        />
      </Routes>
      <footer>
        <p>&copy; 2025 Kudosboard</p>
      </footer>
    </div>
    </BrowserRouter>
  )
}

export default App
