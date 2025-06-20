import { useNavigate } from "react-router-dom";
import "./KudosCards.css"
import { useState } from "react";
import { useEffect } from "react";

export function BoardCards({id, title, description, owner, gifUrl, boardId,cardFetch}){
    const [upvote, setUpvote] = useState(0)
    // const [upvoted, setUpvoted] = useState(true)
    const upvoteBtn = `upvotes: ${title}`
    // const upvotedBtn = `upvoted: ${title}`
    useEffect(() => {
        const upvotes = localStorage.getItem(upvoteBtn)
        // const onUpvoted = localStorage.getItem(upvotedBtn)
        if (upvotes) setUpvote(parseInt(upvotes))
        // if(onUpvoted === 'true') setLiked(true)
    },[upvoteBtn]);
    function upvoting(){
        const newUpvotes = upvote + 1
        setUpvote(newUpvotes)
        localStorage.setItem(upvoteBtn,newUpvotes.toString())
    }
async function deleteBoard(){
    try {
        const response = await fetch(`http://localhost:3000/boards/${boardId}/card/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            confirm("Are you sure you want to delete?")
            cardFetch()
        } else {
            console.error("Failed to delete board");
        }
    } catch (err) {
        console.error(err);
    }
}
const nav = useNavigate()
    return(
        <div className="CardContent">
            <img src = {gifUrl} alt="" />
            <p>{title}</p>
            <p>{description}</p>
            <p>{owner}</p>
            <div className="cardBtns">
                <button className="upvote" onClick={(e) => {
                    upvoting()
                    e.stopPropagation()
                    }}>UPVOTE: <span>{upvote}</span></button>
                <button className="deleteBtn" onClick={deleteBoard}>DELETE</button>
            </div>
        </div>
    );
}