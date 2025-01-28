import React from 'react'

const SectionTitles = ({ heading, subHeading }) => {
    return (
        <div className='md:max-w-[20vw] mx-auto my-5 text-center'>
            <p className='text-yellow-400 py-2'>---- {subHeading} ----</p>
            <h3 className='text-4xl border-y-2 p-1'>{heading}</h3>
        </div>
    )
}

export default SectionTitles
