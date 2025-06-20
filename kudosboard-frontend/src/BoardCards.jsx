import { useNavigate } from "react-router-dom";
import "./KudosCards.css"
import { useState } from "react";
import { useEffect } from "react";
 //function which shows how the cards should look like
export function BoardCards({id, title, description, owner, gifUrl, boardId,cardFetch}){
    //setting default upvote value to start from 0
    const [upvote, setUpvote] = useState(0)
    //how the number of likes per card would be saved in local storage
    const upvoteBtn = `upvotes: ${title}`
    
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
    //function for deleting the cards
    async function deleteBoard(){
    try {
        const response = await fetch(`http://localhost:3000/boards/${boardId}/card/${id}`, {
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
    return(
        //how the cards look like
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