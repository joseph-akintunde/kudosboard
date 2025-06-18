import './SearchComponents.css'
export function SearchComponents(){
    return(
        <div className='SearchComponents'>
            <input type="text" placeholder="boards"/>
            <button type="submit">SEARCH</button>
            <button>CLEAR</button>
        </div>
    )
}