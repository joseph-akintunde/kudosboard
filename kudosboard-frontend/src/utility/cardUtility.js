//utility function to render cards in the board page
export function cardUtility(data){
    let cardArray = []
    for(let i = 0; i<data.length; i++){
        let dat = data[i]
        let items = {
            "id": dat.id,
            "gifUrl": dat.gifUrl,
            "title": dat.title,
            "description": dat.description,
            "owner": dat.owner,
            "boardId": dat.boardId
        }
        cardArray.push(items)
    }
    return cardArray
}