import React from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Player from './components/musicplayer/Player'
import Display from './components/display/Display'

const App = () => {
  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
        <Sidebar />
        <Display />
      </div>
      <Player />
    </div>
  )
}

export default App
