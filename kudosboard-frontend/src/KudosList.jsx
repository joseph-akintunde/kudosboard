import { KudosCards } from "./KudosCards";
import "./KudosList.css"
import { utility } from "./utility/utility";
//function to render all the boards
export function KudosList({showBoard,getBoards}){
    const kudosBoards = utility(showBoard)
    return(
        <div className="KudosList">
            {
            kudosBoards.map((board,index) => {
                return(
                    <KudosCards key = {index} id = {board.id} name = {board.name} author = {board.author} category = {board.category} getBoards={getBoards}/>
                )
            })
        }
        </div>
    )
    }
            //  <KudosCards/>
            // <KudosCards/>
            // <KudosCards/>
            // <KudosCards/>
            // <KudosCards/>
      