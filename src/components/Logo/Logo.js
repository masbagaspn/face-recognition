import React from 'react'
import brain from './brain.png'

const Logo = () => {
  return (
    <div className='w-8 h-8 flex justify-center items-center'>
        <img src={brain} alt='brain-logo' className='w-8'/>
    </div>
  )
}

export default Logo