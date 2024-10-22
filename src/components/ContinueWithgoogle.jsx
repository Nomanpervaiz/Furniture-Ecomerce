import React from 'react'
import googlelogo from "../assets/googleLogo.png"
import { message } from 'antd';
import { auth, provider, signInWithPopup } from '../utility/Firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function ContinueWithgoogle() {
const navigate = useNavigate()

const continueWithGoogle = ()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    message.success(user)
    navigate(0)

  }).catch((error) => {
    const errorMessage = error.message;
    message.error(errorMessage)
  })
}

    return (
        <>
            <button onClick={continueWithGoogle} className="flex border bg-white rounded-full justify-center items-center px-4 py-2 text-black">
                <img
                    className="h-6 w-6 mr-2"
                    src={googlelogo}
                    alt="Google logo"
                />
                Continue With Google
            </button>
        </>
    )
}

export default ContinueWithgoogle