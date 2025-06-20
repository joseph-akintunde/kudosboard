import './SearchComponents.css'
import { useState } from 'react'    
export function SearchComponents({setShowBoard}){
        const [search, setSearch] = useState('')
        async function filterBoards(selectedSearchTerm) {
            setSearch(selectedSearchTerm)
            try {
                const response = await fetch(`http://localhost:3000/boards?search=${selectedSearchTerm}`, {
                    method: 'GET'
                })
                if (response.ok) {
                    const data = await response.json()
                    console.log(data)
                    setShowBoard(data)
                }
            } catch {
                console.error("board couldn't load")
            }
        }
    
    return(
        <div className='SearchComponents'>
            <input
                type="text"
                placeholder="boards"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <button type="submit" onClick={() => filterBoards(search)}>SEARCH</button>
            <button onClick={() => { setSearch(''); setShowBoard([]); }}>CLEAR</button>
        </div>
    )
}