import React, { useEffect, useState } from 'react'
import TrainerCard from './TrainerCard';
import { Helmet } from 'react-helmet';
import useTrainers from '../../../Hooks/useTrainers';
import Loading from '../Loading';
import SectionTitles from '../../SharedMarque/SectionTitles';





const Trainer = () => {

    const [trainers, isLoading] = useTrainers()
    console.log(trainers)
    if (isLoading) return <Loading />

    return (
        <>
            <SectionTitles subHeading={'Experienced Trainers'} heading={'Trainers'} />
            {/* <div className="max-w-[95vw] xl:max-w-[80vw] mx-auto shadow-xl shadow-yellow-900 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-5 my-10"> */}
            <div className="max-w-[95vw] xl:max-w-[80vw] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 my-10">
                <Helmet>
                    <title>Trainers | Aura Fusion Gym</title>
                </Helmet>
                {trainers.map((trainer) => (
                    <TrainerCard key={trainer._id} trainer={trainer} />
                ))}
            </div>
        </>
    )
}

export default Trainer
