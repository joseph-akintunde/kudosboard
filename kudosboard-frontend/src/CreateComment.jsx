import { useState } from "react"
// import "./CreateCards.css"
import { useParams } from "react-router-dom";
// function to create the cards in the board's homepage. 
export function CreateComments({id, closeModal, showComment,comments}){
    // useStates for the card's title, description, and owner. 
    // also for the Gif data where it stores the user's value's gifs. it stores 6 gifs at a time because i gave it a limit of 6
    // GifSearch handles the input for the search query. useParam call here lets me access the id of the particular board i am adding cards to.
    const baseUrl =  import.meta.env.VITE_BASE_URL
    const [author, setAuthor] = useState('')
    const [message, setMessage] = useState("")
    const {boardId} = useParams();
    //API call to get the GIFS
    console.log(comments)

    async function addComment(){
        try{
            const response = await fetch(`${baseUrl}boards/${boardId}/card/${id}/comment`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    author: author,
                    message: message
            })
            });
            if(response.ok){
                const data = await response.json()
                console.log(data)
            }
            showComment()
            setAuthor('')
            setAuthor('')
        }catch(error){
            res.status(500).json({error: "Error"})
        }
    }
    return(
        <div>
            <div className="cardModal">
                <h2>CREATE A NEW CARD</h2>
                <form>
                    <label htmlFor="title"></label>
                    <input type="text" placeholder="Enter your name" value={author} onChange={(e) => setAuthor(e.target.value)}/>
                    <label htmlFor="description"></label>
                    <input type="text" placeholder="Enter Message" value={message} onChange={(e) => setMessage(e.target.value)}/>
                    {author && message && <button type = "submit" onClick={addComment}>COMMENT</button>}
                    {comments.map(comment => {
                        return <div>
                            {comment.author},
                            {comment.message}
                        </div>
                    })}
                    <button onClick={() => closeModal(true)}>CLOSE</button>
                </form>
            </div>
        </div>
    )
}