import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BoardList } from "./BoardList";
import { CreateCards } from "./CreateCards";
//function for the individual boards' homepage
export default function BoardPage(){
    const baseUrl =  import.meta.env.VITE_BASE_URL
    const {boardId} = useParams();
    const [board, setBoard] = useState({})
    const [cards, setCards] = useState([])
    const [openCreateModal, setOpenCreateModal] = useState(false)
    //ensures you can access the boards by their id which will be crucial for adding cards and other stuff
    async function boardFetch(){
        const response = await fetch(`${baseUrl}boards/${boardId}`)
        if(response.ok){
            const data = await response.json()
             setBoard(data)
        }
    }
//fetches the cards that belong to a particular board
    async function cardFetch() {
    //if not right board Id return nothing
    if (!boardId) return;
        try {
            const response = await fetch(`${baseUrl}boards/${boardId}/card` ,{
                method: "GET"
            }
            );
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
            <BoardList cards={cards} cardFetch={cardFetch} closeModal={setOpenCreateModal}/>
        </div>
    )
}