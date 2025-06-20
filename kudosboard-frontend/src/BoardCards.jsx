import { useNavigate } from "react-router-dom";
import "./BoardCards.css"
import { useState } from "react";
import { useEffect } from "react";
import { CreateComments } from "./CreateComment";
 //function which shows how the cards should look like
export function BoardCards({id, title, description, owner, gifUrl, pinned, boardId,cardFetch,closeModal}){
    const baseUrl =  import.meta.env.VITE_BASE_URL
    //setting default upvote value to start from 0
    const [upvote, setUpvote] = useState(0)
    //how the number of likes per card would be saved in local storage
    const upvoteBtn = `upvotes: ${title}`
    const [comments, setComments] = useState([])
    const [openModal, setOpenModal] = useState(false)
    
    //ensures the number of upvotes stays even when page is refreshed
    useEffect(() => {
        const upvotes = localStorage.getItem(upvoteBtn)
        if (upvotes) setUpvote(parseInt(upvotes))
    },[upvoteBtn]);
    // upvoting function which only increases
    function upvoting(){
        const newUpvotes = upvote + 1
        setUpvote(newUpvotes)
        localStorage.setItem(upvoteBtn,newUpvotes.toString())
    }
    //function to grab comments.
    async function showComment(){
        try{
            const response = await fetch(`${baseUrl}boards/${boardId}/card/${id}/comment`, {
                method: "GET"
            });
            if(response.ok){
                const data = await response.json()
                console.log(data)
                setComments(data)
            }
        }catch{

        }
    }
    //function for deleting the cards
    async function deleteBoard(){
    try {
        const response = await fetch(`${baseUrl}boards/${boardId}/card/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            cardFetch()
        } else {
            console.error("Failed to delete board");
        }
    } catch (err) {
        console.error(err);
    }
}
async function togglePin({pinned}){
        const response = await fetch(`${baseUrl}boards/${boardId}/card/${id}/pin`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pinned: !pinned
            }),
        })
        cardFetch()
    }
    return(
        //how the cards look like
        <div className="CardContent" onClick={showComment}>
            <img src = {gifUrl} alt="" />
            <p>{title}</p>
            <p>{description}</p>
            <p>{owner}</p>
            
            <div className="cardBtns">
                <button className="upvote" onClick={(e) => {
                    upvoting()
                    e.stopPropagation()
                    }}>UPVOTE: <span>{upvote}</span>
                </button>
                <button onClick={() => setOpenModal(true)}>ADD COMMENT</button>
                {openModal && <CreateComments id={id} closeModal={setOpenModal} showComment={showComment} comments={comments}/>}
                <button className="deleteBtn" onClick={deleteBoard}>DELETE</button>
                <button className= "pinBtn" onClick={() => togglePin({pinned})}>{pinned ? "📌":"PIN"}</button>
            </div>
        </div>
    );
}