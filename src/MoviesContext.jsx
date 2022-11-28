import { createContext, useEffect, useState } from "react";


const MoviesContext = createContext()

function MoviesContextProvider({children}) {
    const [moviesIdArr, setMoviesIdArr] = useState([])
    const [dataError, setDataError] = useState(null)
    const [moviesList, setMoviesList] = useState([])
    const [watchlist, setWatchlist] = useState(JSON.parse(localStorage.getItem("watchlist")) || [])
    const [isLoading, setIsLoading] = useState(false)
    const [searchedMovie, setSearchedMovie] = useState("")

    console.log(searchedMovie)

    function changeSearchedMovie(search) {
        setSearchedMovie(search)
    }

    useEffect(() => {
        setIsLoading(true)
        setMoviesList([])
            async function getMoviesData(searchedMovie) {
                    if(searchedMovie) {
                        const res = await fetch(`https://www.omdbapi.com/?apikey=2913a2ca&s=${searchedMovie}`)
                        const data = await res.json()
                        if(!data.Error){
                            setDataError(null)
                            setMoviesIdArr(data.Search.map(item => {
                                return item.imdbID
                            }))
                        }else {
                            setDataError(data.Error)
                            setIsLoading(false)
                        }
                    }else {
                        setIsLoading(false)
                        setDataError(null)
                    } 
            }
            getMoviesData(searchedMovie)
    },[searchedMovie])

   useEffect(() => {
    moviesIdArr.map(id => 
        fetch(`https://www.omdbapi.com/?apikey=2913a2ca&i=${id}`)
            .then(res => res.json())
            .then(data => setMoviesList(prevList => [...prevList, data]))
        )
   },[moviesIdArr])

   function addToWatchlist(movie) {
    setWatchlist(prevList => [...prevList , movie])
   }

   function removeFromWatchlist(movie) {
    setWatchlist(prevList => prevList.filter(item => item.imdbID !== movie.imdbID))
   }
   
   useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
   },[watchlist])
    

    return (
        <MoviesContext.Provider value={{changeSearchedMovie,searchedMovie, moviesList, watchlist, addToWatchlist, removeFromWatchlist, dataError, isLoading}}>
            {children}
        </MoviesContext.Provider>
    )
}

export {MoviesContextProvider, MoviesContext}