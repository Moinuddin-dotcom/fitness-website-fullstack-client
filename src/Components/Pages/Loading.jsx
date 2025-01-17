import React from 'react'
import Lottie from "lottie-react";
import loadingLotti from '../../../src/assets/LoadingAnimation.json'

const Loading = () => {
    return (
        <div className='max-w-[50vw] mx-auto text-white'>
            <Lottie animationData={loadingLotti} ></Lottie>
        </div>
    )
}

export default Loading