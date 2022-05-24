import React from 'react'

const ImageLinkForm = ({handleChange, handleSubmit}) => {
  return (
    <div className='w-full h-full flex flex-col justify-start items-center pt-16 gap-4'>
        <p className='w-2/3 text-center py-4
            sm:2/3 md:w-3/5 lg:w-1/2'>
            The Magic Brain will detect faces in your pictures. Give it a try!
        </p>
        <div className='w-[90%] shadow font-apercupro
            md:w-3/5 lg:w-1/2'>
            <input 
                type='text'
                onChange={handleChange}
                className='w-2/3 outline-none p-2 rounded-sm
                    sm:px-2 md:px-4 lg:w-4/5 lg:h-12'
            />
            <button 
                onClick={handleSubmit}
                className='w-1/3 lg:h-12 bg-indigo-200 text-indigo-700 p-2 rounded-sm 
                hover:bg-indigo-700 
                hover:text-indigo-200
                    lg:w-1/5'>
                    Detect
            </button>
        </div>
    </div>
  )
}

export default ImageLinkForm