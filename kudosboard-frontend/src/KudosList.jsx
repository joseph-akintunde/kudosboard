import { KudosCards } from "./KudosCards";
import "./KudosList.css"
import { utility } from "./utility/utility";
export function KudosList({showBoard}){
    const kudosBoards = utility(showBoard)
    return(
        <div className="KudosList">
            {
            kudosBoards.map((board,index) => {
                return(
                    <KudosCards key = {index} name = {board.name} author = {board.author} category = {board.category} onDelete={() => {setShowBoard(prev => prev.filter(card => card.name !== board.name))}}/>
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
      