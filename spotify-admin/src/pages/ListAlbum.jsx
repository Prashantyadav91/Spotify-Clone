import React, { useEffect, useState } from 'react'
import { url } from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'

const ListAlbum = () => {
  const [data, setData] = useState([])

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`)
      if (response.data.success) {
        setData(response.data.albums)
      } else {
        toast.error("Something went wrong")
      }
    } catch (error) {
      toast.error("Error occured")
    }
  }

  const removeAlbum = async (id)=>{
    try {
      const response = await axios.post(`${url}/api/album/remove`,{id})
      if(response.data.success){
        toast.success(response.data.message)
        await fetchAlbums()
      }
    } catch (error) {
      toast.error("Error occured")
    }
  }

  useEffect(()=>{
    fetchAlbums()
  },[])


  return (
    <div>
      <p className='font-bold '>All Albums List :-</p>
      <hr className='w-32 mt-1 '/>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center p-3 border border-gray-300 text-sm mr-5 bg-gray-100 gap-2.5'>
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Colour</b>
          <b>Action</b>
        </div>
        {data.map((item,index)=>{
          return(
            <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center p-3 border border-gray-300 text-sm mr-5 gap-2.5'>
              <img className='w-12' src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <input type="color" value={item.bgColour}/>
              <p onClick={()=>removeAlbum(item._id)} className='cursor-pointer text-xl ml-4' >X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListAlbum
