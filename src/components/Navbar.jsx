import React, { Fragment, useState }from 'react'
import {HiSearch} from 'react-icons/hi'
 
import { Routes, Route, NavLink } from 'react-router-dom'

import Movies from './Movies'
import { TvShow } from './TvShow'
import { Trends } from './Trends'
import { Pricing } from './Pricing'

import './../styles/NavbarStyle.css'


export const Container = React.createContext()

const Navbar = () => {
  const [toggle, setToggle ] = useState(true)
  const [inputValue, setInputValue] = useState('')


  return (
    <Container.Provider value={{toggle, inputValue}}>
    <Fragment>
      
      <nav className={toggle ? '' : 'navBarColor'}>
        <div className="nav-options">

          <NavLink to="/" >
          <h1 id={toggle ? '' : 'heading'}>REACTFLIX</h1>
          </NavLink>
          
          <NavLink to="/" style={({isActive}) => {return {color: isActive ? '#fff' : "#38bdab"}}}>
          <span id={toggle ? 'Movies' : 'MoviesLight'}>Movies</span>
          </NavLink>
          
          <NavLink to="/tv-show" style={({isActive}) => {return {color: isActive ? '#fff' : "#38bdab"}}}>
          <span id={toggle ? 'Movies' : 'MoviesLight'}>Tv Show</span>
          </NavLink>
          
          <NavLink to="/trending" style={({isActive}) => {return {color: isActive ? '#fff' : "#38bdab"}}}>
          <span id={toggle ? 'Movies' : 'MoviesLight'}>Trending</span>
          </NavLink>
          
          <NavLink to="/pricing" style={({isActive}) => {return {color: isActive ? '#fff' : "#38bdab"}}}>
          <span id={toggle ? 'Movies' : 'MoviesLight'}>Pricing</span>
          </NavLink>
        
        </div>


        <div className='input-group'>
        <input type="text" placeholder='Search Wherever You Want' onChange={(e) => setInputValue(e.target.value)}/>

        <HiSearch  fontSize={21} color={toggle ? "38bdab" : "ff206e"} id="search"/>

               
        <div id="Color-switcher" onClick={() => setToggle(!toggle)}>
          <div id={toggle ? "Color-switcher-mover" : "Color-switcher-moved"}></div>
        </div>
        </div>


      </nav>
      
      <Routes>
        <Route path='/' element={<Movies />} />
        <Route path='/tv-show' element={<TvShow />} />
        <Route path='/trending' element={<Trends />} />
        <Route path='/pricing' element={<Pricing />} />

      </Routes>

    </Fragment>
    </Container.Provider>
  )
}

export default Navbar