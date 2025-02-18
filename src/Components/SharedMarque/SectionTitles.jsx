import React from 'react'

const SectionTitles = ({ heading, subHeading }) => {
    return (
        <div className='md:max-w-[50vw] mx-auto my-5 text-center'>
            <p className='text-yellow-950 dark:text-yellow-400 py-2'>---- {subHeading} ----</p>
            <h3 className='text-2xl md:text-4xl text-[#08170d] dark:text-white border-y-2 border-black dark:border-white p-1'>{heading}</h3>
        </div>
    )
}

export default SectionTitles
