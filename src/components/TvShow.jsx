import React, { Fragment, useContext , useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Videos.css'
import { AiFillPlayCircle} from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'
import NoImg from '../no-image-icon-6.png'
import {  Container } from './Navbar'
import TrailerTvShow from '../trailers/TrailerTvShow'

export const TvShow = () => {
  const {toggle, inputValue} = useContext(Container)
  const [tvShow, setTvShow] = useState([])
  const [trailer, setTrailer] = useState(true)
  const [title, setTitle] = useState('')
  const input = inputValue
  const Show = input ? 'search' : 'discover'
 
  const Api = `http://api.themoviedb.org/3/${Show}/tv/`
  const Images = "https://image.tmdb.org/t/p/w500/"

  const TvShows = async () => {
    const data = await axios.get(Api, {       
        params: { 
          api_key: 'dcd662d86d9efe54d3dac0ef86b528aa',
          query: input

      }
    })

    const results = data.data.results
    setTvShow(results)
    
  }

  useEffect(() => {
    setTimeout(() => {
    TvShows()
    }, 100)

  }, [input])



  const tvShowTitle = (tv) => {
    setTitle(tv.name)
    setTrailer(!trailer)
  }


  return (
    <Fragment>
      <div className={toggle ? 'mainBgColor' : 'secondaryBgColor'}>
      <div className='movies-container'>
      {tvShow.map((tv) => {
        return (
          <Fragment key={tv.id}>
            <div id={trailer ? 'container' : 'NoContainer'} >
            <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? "playIcon" : 'hide'} onClick={() => tvShowTitle(tv)}/>
            <img src={tv.poster_path ? `${Images}${tv.poster_path}` : NoImg } alt='' onClick={() => tvShowTitle(tv)} />
            <h3 id={tv.name.length > 28 ? 'smaller-Text' : ''} className={toggle ? 'mainColor' : 'secondaryColor'}>{tv.name}</h3>
            </div>
          </Fragment>
        )
      })}


      {trailer ? console.log : <TrailerTvShow  tvShow={title}/>}
      <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'}  className={toggle ? 'DarkTheme' : 'LightThemeClose'}  fontSize={40} cursor={'pointer'} onClick={() => setTrailer(true)}/>
      </div>
      </div>
    </Fragment>
  )
}
