export function utility(data){
    const boardArray = []
    for(let i = 0; i<data.length; i++){
        let board = data[i]
        let boardProperties = {
            "name": board.name,
            "author": board.author,
            "category": board.category
        }
        boardArray.push(boardProperties)
    }
    return boardArray
}