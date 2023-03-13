import React, { Fragment, useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AiFillPlayCircle, AiOutlineClose} from 'react-icons/ai'
import noImg from '../no-image-icon-6.png'
import '../styles/Videos.css'
import { Container } from './Navbar'
import TrailerMovies from '../trailers/TrailerMovies'



const Movies = () => {
  const {toggle, inputValue} = useContext(Container)
  const Input = inputValue
  const [moviesData, setMoviesData] = useState([])
  const [trailer, setTrailer] = useState(true)
  const [movieTitle, setMovieTitle] = useState('')
  const Show = Input ? 'search' : 'discover'


  const Api = `http://api.themoviedb.org/3/${Show}/movie/`
  const Images = 'https://image.tmdb.org/t/p/w500/'

  const MovieCall = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: 'dcd662d86d9efe54d3dac0ef86b528aa',
        query: Input,
      } 
    })
    const results = data.data.results
    setMoviesData(results)
    
  }

  useEffect(() => {
    setTimeout(() => {
    MovieCall()
    }, 100)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Input])

  const MoviesTitle = (movie) => {
    setMovieTitle(movie.title)
    setTrailer(!trailer)
  }
  
  
  
  return (
    <Fragment >
      <div className={toggle ? 'mainBgColor' : 'secondaryBgColor'}>
        <div className='movies-container'>
          { moviesData.map((movie) => {
            return (    
              <Fragment key={movie.id}>
                <div id={trailer ? 'container': 'NoContainer'} >
                  <AiFillPlayCircle color={'38bdab'} id={trailer ? 'playIcon' : 'hide'} fontSize={40 } onClick={() => MoviesTitle(movie)}/>
                  <img src={movie.poster_path ? `${Images}${movie.poster_path}` : noImg} alt='' onClick={() => MoviesTitle(movie)} />
                  <h3 id={movie.title.length > 28 ? 'smaller-Text' : ""}>{movie.title}</h3>
                </div>
              </Fragment>
            )
          })}

          {trailer ? console.log : <TrailerMovies  moviesTitle={movieTitle}/>}
          <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'}  className={toggle ? 'DarkTheme' : 'LightThemeClose'}  fontSize={40} cursor={'pointer'} onClick={() => setTrailer(true)}/>
        </div>
      </div>
    </Fragment>
  )
}

export default Movies