import { useState } from "react"
import "./CreateCards.css"
import { useParams } from "react-router-dom";
export function CreateCards({closeModal, cardFetch, BoardPage}){

    const [title, setTitle] = useState('')
    const {boardId} = useParams();
    const [description, setDescription] = useState('')
    const [owner, setOwner] = useState('')
    const [gifSearch, setGifSearch] = useState('')
    const [gifData, setGifData] = useState([])
    async function handleCardCreate(e){
        e.preventDefault()
        try{
            const response = await fetch(`http://localhost:3000/boards/${boardId}/card`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: title,
                    description: description,
                    owner: owner,
                    gifUrl: selectedGifUrl
            })
            })
            if(response.ok){
                const data = await response.json()
                console.log("card created: ", data)
                cardFetch()
                setTitle('')
                setDescription('')
                setOwner('')
                setGifData([])
                
              } else{
                throw new error("Error")
              }

        }catch{
            console.error("Error")
        }
    }
    async function getGifs(e){
        e.preventDefault();
        const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=6OpKrsYHKpw5VGgmjGEu8HYDNPj3QIhe&limit=6&q=${gifSearch}`);
        const data = await response.json();
        console.log(data);
        setGifData(data.data);
    }

    const [showGifModal, setShowGifModal] = useState(false);
    const [selectedGifUrl, setSelectedGifUrl] = useState('');

    function handleGifClick(gifUrl) {
        setSelectedGifUrl(gifUrl);
        setShowGifModal(true);
    }

    function handleGifModalClose() {
        setShowGifModal(false);
    }

    return(
        <div>
            <h2>CREATE A NEW CARD</h2>
            <div className="cardModal">
                <form>
                    <label htmlFor="title"></label>
                    <input type="text" placeholder="Enter Card title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <label htmlFor="description"></label>
                    <input type="text" placeholder="Enter Card description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <label htmlFor="owner"></label>
                    <input type="text" placeholder="Search GIFS" value={gifSearch} onChange={(e) => setGifSearch(e.target.value)}/>
                    <button onClick={getGifs}>Search</button>
                    <div className="gif-results">
                        {gifData && gifData.map(gif => (
                            <img
                                key = {gif.id}
                                src={gif.images.fixed_height_small.url}
                                alt={gif.title}
                                style={{cursor: 'pointer', margin: 4}}
                                onClick={() => handleGifClick(gif.images.original.url)}
                            />
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Copy GIFS URL"
                        value={selectedGifUrl}
                        readOnly
                    />
                    <label htmlFor=""></label>
                    <input type="text" placeholder="Enter Card Owner" value={owner} onChange={(e) => setOwner(e.target.value)}/>
                    {title && description && gifSearch && owner && <button type = "submit" onClick={handleCardCreate}>Create Card</button>}
                    <button type="button" onClick={() => closeModal(false)}>Close</button>
                </form>
            </div>
        </div>
    )
}