import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, box, box:{top, right, bottom, left}}) => {
  
  return (
    <div className='w-[350px] mt-8 relative mx-auto'>
      <img
        src={imageUrl}
        alt=''
        id='imageInput'
        className="w-[350px] h-auto">
      </img>
      {box && <div 
        className='bounding-box' style={{top: Number(top), right: Number(right), bottom: Number(bottom), left: Number(left)}}
      >
      </div>}
    </div>
  )
}

export default FaceRecognition