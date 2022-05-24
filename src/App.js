import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import { requestOptions } from './requestOptions';
import ImageLinkFormError from './components/ImageLinkForm/ImageLinkFormError';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState(false);
  const [error, setError] = useState('');
  const [route, setRoute] = useState('signin')

  const calculateFaceLocation = data => {
    const result = data.outputs[0].data
    if(Object.keys(result).length === 0) 
    {
      setError('No Face Detected!')
      setBox('')
    } 
    else 
    {
      const faceDetected = data.outputs[0].data.regions[0].region_info.bounding_box
      const image = document.getElementById('imageInput');
      console.log(image)
      const width = Number(image.width)
      const height = Number(image.height)

      setBox({
        left: (faceDetected.left_col * width).toFixed(),
        top: (faceDetected.top_row * height).toFixed(),
        right: (width - (faceDetected.right_col * width)).toFixed(),
        bottom: (height - (faceDetected.bottom_row * height)).toFixed()
      })
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  const handleRoute = (endpoint) => {
    setRoute(endpoint)
  }

  const handleSubmit = async () => {
    setImageUrl(input);
    setError('')
    setBox('')
    try{
      const request = requestOptions(input)
      const response = await fetch("https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs", request)
      const result = await response.json()
      console.log(result)
      if(result.status.code > 10000) {
        setError(result.status.description)
      } else if(result.status.code === 10000){
        calculateFaceLocation(result)
      } else {
        setError('Something went wrong!')
      }
    } 
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="max-w-screen min-h-screen font-apercumono bg-indigo-50 p-6 flex flex-col lg:items-center">
      {
        route === 'home' 
        ? <>
          <Navigation onRouteChange={handleRoute}/>
          <ImageLinkForm handleChange={handleChange} handleSubmit={handleSubmit} />
          {error && <ImageLinkFormError errorMessage={error}/>}
          <FaceRecognition box={box} imageUrl={imageUrl}/>
        </>
        : ( 
          route === 'signin' 
          ? <SignIn onRouteChange={handleRoute}/>
          : <Register onRouteChange={handleRoute}/>
        )
      }
    </div>
  );
}

export default App;
