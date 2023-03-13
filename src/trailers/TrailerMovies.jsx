import React, {Fragment, useState, useEffect} from 'react'
import ReactPlayer from 'react-player'
import movieTrailer from 'movie-trailer'
import '../styles/TrailerMovie.css'

function TrailerMovies({moviesTitle}) {

    const [video, setVideo] = useState('')
    const [videoURL, setVideoURL] = useState('')

    const handleSearch = () => {
        setVideo(moviesTitle)
        movieTrailer(video).then((res) => {
            setVideoURL(res)
        })
    }

    useEffect(() => {
        setTimeout(() => {
        handleSearch()
        }, 50)
    }, [videoURL])



  return (
   <Fragment>
        <div className='Container'>
        </div>
        <div className='player'>
            <ReactPlayer url={videoURL} controls={true} width='1000px' height='550px' muted={false}/>
        </div>

   </Fragment>
  )
}

export default TrailerMovies
