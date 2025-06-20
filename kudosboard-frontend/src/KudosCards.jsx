import { useNavigate } from "react-router-dom";
import "./KudosCards.css"
//function for how the boards are displayed
export function KudosCards({id, name, author, category,getBoards}){
let RandomNumber = Math.floor(Math.random() * 1000) + 1
const getImg = `https://picsum.photos/${RandomNumber}` //generating random pictures from picsum.photos
//function to delete a board
async function deleteBoard(){
    const baseUrl =  import.meta.env.VITE_BASE_URL
    try { //fetching the delete method for boards 
        const response = await fetch(`${baseUrl}boards/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            getBoards()
            //if response not valid, it won't delete
        } else {
            throw new error("Failed to delete board");
        }
    } catch (err) {
        console.error(err);
    }
}
//calling react navigate due to use of React Routing. it'd be able to go to another route(path)
const nav = useNavigate()
    return(
        //how the board should look like. displaying the random image, name of board, category, author, and 2 buttons.
        <div className="CardContent">
            <img width="300px" height="300px" src={getImg} alt="Card Name" />
            <p>{name}</p>
            <p>{category}</p>
            <p>{author}</p>
            <div className="cardBtns">
                {/* opens the board homepage where the board's cards would be displayed */}
                <button className="viewBtn" onClick={() => nav(`boards/${id}`)}>VIEW BOARD</button> 
                {/* delete's the board from the page and record */}
                <button className="deleteBtn" onClick={deleteBoard}>DELETE BOARD</button>
            </div>
        </div>
    );
}