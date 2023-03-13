import React, {useEffect, useState, useContext, Fragment} from 'react'
import axios from 'axios'
import { Container } from './Navbar'
import NoImg from '../no-image-icon-6.png'
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai'
import '../styles/Videos.css'

export const Trends = () => {

  const {toggle, inputValue} = useContext(Container)
  const Api ='http://api.themoviedb.org/3'
  const TrendShow = '/trending/movie/week'
  const Images = 'https://image.tmdb.org/t/p/w500/'

  const [trendsArray, setTrendsArray] = useState([]) 
  const [trendTitle, setTrendTitle] = useState('')
  const [trailer, setTrailer] = useState(true)

  const Trends = async () => {
    const data = await axios.get(`${Api}${TrendShow}`, {
      params: {
        api_key: 'dcd662d86d9efe54d3dac0ef86b528aa'
      }
    })
    const results = data.data.results
    setTrendsArray(results)
  } 

  useEffect(() => {
    setTimeout(() => {
      Trends()
    }, 100)
  }, [])


  const TrendsTitle = (trend) => {
    setTrendTitle(trend.title)
    setTrailer(!trailer)
  }

  console.log(trendsArray)


  return (
    <Fragment>
      <div className={toggle ? 'mainBgColor' : 'secondaryBgColor'}>
        <div className='movies-container'>
          {trendsArray.map((trend) => {
            return (
              <Fragment key={trend.id}>
                <div id={trailer ? 'container': 'NoContainer'}>
                  <AiFillPlayCircle id={trailer ? "playIcon" : 'hide'} fontSize={40} color='#fff' onClick={() => TrendsTitle(trend)}/>
                  <img src={trend.poster_path ? `${Images}${trend.poster_path}` : NoImg } alt='' onClick={() => TrendsTitle(trend)}/>
                  <h3 id={trend.title.length > 28 ? 'smaller-Text': ' '} className={toggle ? 'mainColor' : 'secondaryColor'}>{trend.title}</h3>
                </div>
              </Fragment>
            )
          })}
          <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'}  className={toggle ? 'DarkTheme' : 'LightThemeClose'}  fontSize={40} cursor={'pointer'} onClick={() => setTrailer(true)}/>
        </div>
      </div>
    </Fragment>
  )
}
