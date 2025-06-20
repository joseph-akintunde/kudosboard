import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BoardList } from "./BoardList";
import { CreateCards } from "./CreateCards";
export default function BoardPage(){
    const {boardId} = useParams();
    const [board, setBoard] = useState({})
    const [cards, setCards] = useState([])
    const [openCreateModal, setOpenCreateModal] = useState(false)

    async function boardFetch(){
        const response = await fetch(`http://localhost:3000/boards/${boardId}`)
        if(response.ok){
            const data = await response.json()
             setBoard(data)
        }
    }
    async function cardFetch(){
        const response = await fetch(`http://localhost:3000/boards/${boardId}/card`)
         if(response.ok){
            const data = await response.json()
             setCards(data)
        }
    }

async function cardFetch() {
    if (!boardId) return;
    try {
        const response = await fetch(`http://localhost:3000/boards/${boardId}/card`);
        if (response.ok) {
            const data = await response.json();
            setCards(data);
        } else {
            setCards([]);
            console.error("Failed to fetch cards");
        }
    } catch (error) {
        setCards([]);
        console.error("Error fetching cards:", error);
    }
}

useEffect(() => {
    cardFetch();
}, [boardId]);
    
    useEffect(() =>{
        boardFetch()
        cardFetch()
    },[boardId])
    return(
        <div>
            <h2>{board.name}</h2>
             <button onClick={() => setOpenCreateModal(true)}>CREATE NEW CARD</button>
            {openCreateModal && (
                            <CreateCards closeModal={setOpenCreateModal} cardFetch = {cardFetch} />
                          )}
            <BoardList cards={cards} cardFetch={cardFetch}/>
        </div>
    )
}