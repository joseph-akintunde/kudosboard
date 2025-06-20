import { useState } from "react"
import "./CreateCards.css"
import { useParams } from "react-router-dom";
// function to create the cards in the board's homepage. 
export function CreateCards({closeModal, cardFetch}){
    // useStates for the card's title, description, and owner. 
    // also for the Gif data where it stores the user's value's gifs. it stores 6 gifs at a time because i gave it a limit of 6
    // GifSearch handles the input for the search query. useParam call here lets me access the id of the particular board i am adding cards to.
    const baseUrl =  import.meta.env.VITE_BASE_URL
    const [title, setTitle] = useState('')
    const {boardId} = useParams();
    const [description, setDescription] = useState('')
    const [owner, setOwner] = useState('')
    const [gifSearch, setGifSearch] = useState('')
    const [gifData, setGifData] = useState([])

    //API call to get the GIFS

    async function getGifs(e){
        e.preventDefault();
        const apiKey = import.meta.env.VITE_GIPHY_API_KEY; //task: remember to correct this in the env file
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=6&q=${gifSearch}`);
        const data = await response.json();
        console.log(data);
        //add the data array to gifData
        setGifData(data.data);
    }
    const [selectedGifUrl, setSelectedGifUrl] = useState(''); //for the gifUrl bar
    function handleGifClick(gifUrl) {
        //handles the url for any clicked gif
        setSelectedGifUrl(gifUrl);
    }
    // handles the card creation
    async function handleCardCreate(e){
        e.preventDefault()
        try{
            // fetches from this url
            const response = await fetch(`${baseUrl}boards/${boardId}/card`, {
                // POST- add
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
                //renders all the  required parameters empty after creating the card
                cardFetch()
                setTitle('')
                setDescription('')
                setOwner('')
                setGifData([])
                setGifSearch('')
                setSelectedGifUrl('')
                
              } else{
                throw new error("Error")
              }

        }catch{
            console.error("Error")
        }
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
                        {/* mapping the array, gifData where all the gif properties are. */}
                        {gifData && gifData.map(gif => (
                            <img
                                key = {gif.id}
                                src={gif.images.fixed_height_small.url}
                                alt={gif.title}
                                style={{cursor: 'pointer', margin: 4}}
                                onClick={() => handleGifClick(gif.images.original.url)} //when i click on any of the gifs, it renders its url in the copy url input
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
                    {title && description && gifSearch && <button type = "submit" onClick={handleCardCreate}>Create Card</button>}
                    <button type="button" onClick={() => closeModal(false)}>Close</button>
                </form>
            </div>
        </div>
    )
}