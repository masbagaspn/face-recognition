import React from 'react'

function ImageLinkFormError({errorMessage}) {
  return (
    <div className='w-full flex justify-center items-center text-red-400 text-xl pt-8'>
        <h1>{errorMessage}</h1>
    </div>
  )
}

export default ImageLinkFormError