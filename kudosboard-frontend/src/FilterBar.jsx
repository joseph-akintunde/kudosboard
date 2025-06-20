import { useState } from "react"
import "./FilterBar.css"

export function FilterBar({ setShowBoard }) {
    const [category, setCategory] = useState('')
    async function filterBoards(selectedCategory, sortOption = '') {
        setCategory(selectedCategory)
        const sort = selectedCategory === 'recent'?'recent':''
        try {
            const response = await fetch(`http://localhost:3000/boards?category=${selectedCategory}&sort=${sortOption}`, {
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

    return (
        <div className="FilterBar">
            <button value="all" onClick={() => filterBoards('all')}>ALL</button>
            <button value="Recent" onClick={() => filterBoards(category,'recent')}>RECENT</button>
            <button value="Celebration" onClick={() => filterBoards('Celebration')}>CELEBRATION</button>
            <button value="Thank you" onClick={() => filterBoards('Thank_you')}>THANK YOU</button>
            <button value="Inspiration" onClick={() => filterBoards('Inspiration')}>INSPIRATION</button>
        </div>
    )
}