import { BoardCards } from "./BoardCards";
import { cardUtility } from "./utility/cardUtility";
//function to render all the cards
export function  BoardList({cards,cardFetch,closeModal}){
    const kudosBoards = cardUtility(cards)
    return(
        <div className="KudosList">
            {
            kudosBoards.map((board,index) => {
                return(
                    <BoardCards key = {index} id = {board.id} title = {board.title} description = {board.description} owner = {board.owner} pinned = {board.pinned} gifUrl = {board.gifUrl} cardFetch={cardFetch} closeModal={closeModal}/>
                )
            })
        }
        </div>
    )
    }