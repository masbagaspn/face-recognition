import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ImageLinkFormError from './components/ImageLinkForm/ImageLinkFormError';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import { postRequestOption, putRequestOption } from './api/requestOptions';

const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState(false);
  const [error, setError] = useState('');
  const [route, setRoute] = useState('signin');
  const [user, setUser] = useState('');

  const resetState = () => {
    setInput('')
    setImageUrl('')
    setBox(false)
    setError('')
    setRoute('signin')
    setUser('')
  }

  const loadUser = data => {
    setUser(data)
  }

  const calculateFaceLocation = result => {
    if(!Object.keys(result).length)
    {
      setError('No Face Detected!')
      setBox('')
    } else {
      const faceDetected = result.data.outputs[0].data.regions[0].region_info.bounding_box
      const image = document.getElementById('imageInput');

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

    try{
      setImageUrl(input);
      setError('');
      setBox('');
      
      const request = postRequestOption({input: input})
      const response = await fetch("https://magic-brain-api.herokuapp.com/clarifai", request)
      const result = await response.json();

      if(result.errorMessage) return setError(result.errorMessage);
      calculateFaceLocation(result);

      const bodyRequest = {
        imageUrl: input,
        id: user.id
      }
      console.log(imageUrl);
      const putResponse = await fetch('https://magic-brain-api.herokuapp.com/image', putRequestOption(bodyRequest))
      const update = await putResponse.json();

      if(update.success){
        setError('Success');
        setUser(Object.assign(user, {entries: update.data.entries}));
        
      } else {
        setError(update.errorMessage);
      }
    } catch(err){
      console.log(err)
    }
  }

  return (
    <div className="max-w-screen min-h-screen font-apercupro bg-indigo-50 p-6 flex flex-col md:items-center lg:items-center">
      {
        route === 'home' 
        ? <>
          <Navigation user={user} resetState={resetState}/>
          <ImageLinkForm handleChange={handleChange} handleSubmit={handleSubmit} user={user}/>
          {error && <ImageLinkFormError errorMessage={error}/>}
          <FaceRecognition box={box} imageUrl={imageUrl}/>
        </>
        : ( 
          route === 'signin' 
          ? <SignIn onRouteChange={handleRoute} loadUser={loadUser} />
          : <Register onRouteChange={handleRoute} loadUser={loadUser} />
        )
      }
    </div>
  );
}

export default App;
