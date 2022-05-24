import React from 'react'
import Logo from '../Logo/Logo'

const Navigation = ({onRouteChange}) => {
  return (
    <nav className='flex w-full justify-between items-center px-8'>
        <Logo />
        <p 
          onClick={() => onRouteChange('signin')}
          className='text-md cursor-pointer 
          hover:text-indigo-700 hover:border-b-2 hover:border-indigo-700 
          active:text-indigo-700 active:border-b-2 active:border-indigo-700 
            lg:text-base'>
            Sign Out
        </p>
    </nav>
  )
}

export default Navigation