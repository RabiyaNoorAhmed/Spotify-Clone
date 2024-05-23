import React from 'react'
import Navbar from '../navbar/Navbar'
import { albumsData } from '../../assets/assets'
import AlbumItem from './AlbumItem'
import { songsData } from '../../assets/assets'
import SongItem from './SongItem'

const DisplayHome = () => {
  return (
    <>
      <Navbar />
      <div className=' mb-5'>
        <h1 className=' my-2 font-bold text-2xl'>Featured Charts</h1>
        <div className='flex overflow-auto flex-wrap'>
          {albumsData.map((item, index) => (<AlbumItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))}
        </div>
      </div>

      <div className=' mb-5'>
        <h1 className=' my-2 font-bold text-2xl'>Today's biggest hits</h1>
        <div className='flex overflow-auto flex-wrap'>
         {
          songsData.map((item,index)=>(<SongItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))
         }
        </div>

      </div>

    </>
  )
}

export default DisplayHome
