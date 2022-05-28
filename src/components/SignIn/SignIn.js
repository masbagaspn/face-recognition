import React, { useState } from 'react'
import { postRequestOption } from '../../api/requestOptions'
import Logo from '../Logo/Logo'

function SignIn({loadUser, onRouteChange}) {
    const [signInUsername, setSignInUsername] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmitSignIn = async (e) => {
        e.preventDefault()
        if( !signInUsername && !signInPassword ) return setErrorMessage('Fill in the blank form')

        const requestBody = {
            username: signInUsername,
            password: signInPassword
        }

        const response = await fetch('https://magic-brain-api.herokuapp.com/signin', postRequestOption(requestBody))
        const result = await response.json()

        if(!result.success) return setErrorMessage(result.errorMessage)
        
        loadUser(result.data)
        onRouteChange('home')
            
    }

    const handleUsernameChange = (e) => {
        e.preventDefault()
        setSignInUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        e.preventDefault()
        setSignInPassword(e.target.value)
    }

    return (
        <div className='flex flex-col w-full h-[calc(100vh-5rem)] justify-between p-4 md:w-1/2 lg:w-1/3'>

            <div className='w-full h-1/6 flex items-center gap-2 lg:w-1/8'>

                <Logo className='h-full'/>
                <h1 className='text-sm font-bold'>Magic<br/>Brain</h1>

            </div>

            <form className='w-full h-full flex flex-col justify-between items-start gap-4'>

                <div className='h-1/5 w-full flex flex-col justify-start lg:justify-start lg:items-center'>

                    <h1 className='text-3xl font-bold text-indigo-700 lg:text-xl'>Sign In.</h1>
                    <p className='text-lg font-apercupro text-gray-400 pt-3 lg:text-sm'>Fill with your account details!</p>

                </div>

                <div className='h-3/5 w-full flex flex-col justify-end items-end pb-8'>

                    <div className='flex flex-col w-full py-2'>

                        <label className='pb-2 text-lg lg:text-sm'>Username</label>
                        <input 
                            onChange={handleUsernameChange}
                            className='h-[3rem] w-full rounded px-4 
                            outline-none outline-offset-0 outline-gray-300 outline-1 focus:outline-indigo-700
                            lg:h-[2.5rem] lg:rounded-none'
                            type='text'
                        />

                    </div>

                    <div className='flex flex-col w-full py-2'>

                        <label className='pb-2 text-lg lg:text-sm'>Password</label>
                        <input 
                            onChange={handlePasswordChange}
                            className='h-[3rem] w-full rounded px-4 
                            outline-none outline-offset-0 outline-gray-300 outline-1 
                            focus:outline-indigo-700
                            lg:h-[2.5rem] lg:rounded-none'
                            type='password'
                        />
                        {errorMessage 
                            && <span 
                                    className='text-red-400 mt-2'
                                >
                                    {errorMessage}
                                </span>
                        }

                    </div>

                </div>

                <div className='h-1/5 w-full flex flex-col gap-2 lg:items-center'>

                    <button 
                        onClick={handleSubmitSignIn}
                        className='w-2/5 h-1/2 rounded-sm bg-indigo-500 text-indigo-50
                        outline-none outline-offset-0 focus:outline-indigo-300
                        lg:h-[2.75rem]
                        hover:bg-indigo-700 hover:text-indigo-50
                        focus:bg-indigo-700 focus:text-indigo-50'
                    >
                            Sign In!
                    </button>
                    <span className='w-full h-1/2 text-center text-[.6rem] flex items-end justify-center cursor-pointer
                        lg:h-1/3 lg:text-[.75rem] outline-none'>
                        Doesn't have an account&#63;&nbsp;

                        <span 
                            onClick={() => onRouteChange('register')}
                            className='text-indigo-400 font-bold outline-none border-b-2 border-indigo-400
                            focus:border-indigo-700 focus:text-indigo-700 focus:outline-1 focus:outline-indigo-700
                            hover:border-indigo-700 hover:text-indigo-700
                            active:border-indigo-700 active:text-indigo-700'>
                            Let's create a new one!
                        </span>

                    </span>

                </div>

            </form>

        </div>
  )
}

export default SignIn