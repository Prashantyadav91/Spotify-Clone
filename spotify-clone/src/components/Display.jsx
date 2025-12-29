import React, { useRef } from 'react'
import { Routes , Route, useLocation} from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import { useEffect } from 'react'
import { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const Display = () => {

  const {albumsData} = useContext(PlayerContext)
  const displayRef = useRef()
  const location = useLocation();
  const isAlbum = location.pathname.includes('/album/');
  const albumId = isAlbum ? location.pathname.split('/').pop() : null;
  const bgColor = isAlbum && albumsData.length > 0 ? albumsData.find((x)=>(x._id === albumId)).bgColour : "#121212"
  
  useEffect(() => {
    const element = displayRef.current;
    if (!element) return;

    if (isAlbum && bgColor) {
      element.style.backgroundImage = `linear-gradient(${bgColor}, #121212)`;
    } else {
      element.style.backgroundImage = 'none';
      element.style.backgroundColor = '#121212';
    }
  }, [location.pathname]);
  
  return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 py-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
      {
        albumsData.length > 0 ?
        <Routes>
        <Route path="/" element={<DisplayHome/>}/>
        <Route path="/album/:id" element={<DisplayAlbum album = {albumsData.find((x)=>(x._id == albumId))}/>}/>
      </Routes>
      : null
      }
      
    </div>
  )
}

export default Display
