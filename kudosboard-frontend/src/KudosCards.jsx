import "./KudosCards.css"

export function KudosCards({id, name, author, category,getBoards}){
let RandomNumber = Math.floor(Math.random() * 1000) + 1
const getImg = `https://picsum.photos/${RandomNumber}`
async function deleteBoard(){
    try {
        const response = await fetch(`http://localhost:3000/boards/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            confirm("Are you sure you want to delete?")
            getBoards()
        } else {
            console.error("Failed to delete board");
        }
    } catch (err) {
        console.error(err);
    }
}
    return(
        <div className="CardContent">
            <img width="300px" height="300px" src={getImg} alt="Card Name" />
            <p>{name}</p>
            <p>{category}</p>
            <p>{author}</p>
            <div className="cardBtns">
                <button className="viewBtn">VIEW BOARD</button>
                <button className="deleteBtn" onClick={deleteBoard}>DELETE BOARD</button>
            </div>
        </div>
    );
}