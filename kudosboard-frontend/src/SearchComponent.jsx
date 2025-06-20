import './SearchComponents.css'
import { useState } from 'react'    
export function SearchComponents({setShowBoard}){
        const [search, setSearch] = useState('')
        async function filterBoards(selectedSearchTerm) {
            const baseUrl =  import.meta.env.VITE_BASE_URL
            setSearch(selectedSearchTerm)
            try {
                const response = await fetch(`${baseUrl}boards?search=${selectedSearchTerm}`, {
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
        function handleSubmit(e){
            e.preventDefault();
            filterBoards(search);
         }
    
    return(
        <form className='SearchComponents' onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="boards"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <button type="submit">SEARCH</button>
            <button onClick={() => { setSearch(''); setShowBoard([]); }}>CLEAR</button>
        </form>
    )
}