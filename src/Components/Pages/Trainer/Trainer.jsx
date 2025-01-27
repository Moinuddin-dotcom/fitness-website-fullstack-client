import React, { useEffect, useState } from 'react'
import TrainerCard from './TrainerCard';
import { Helmet } from 'react-helmet';
import useTrainers from '../../../Hooks/useTrainers';
import Loading from '../Loading';





const Trainer = () => {

    const [trainers, isLoading] = useTrainers()
    if (isLoading) return <Loading />
    // console.log(trainers)

    return (

        <div className="max-w-[80vw] mx-auto shadow-xl shadow-white rounded-xl grid grid-cols-3 my-10">
            <Helmet>
                <title>Trainers | Aura Fusion Gym</title>
            </Helmet>
            {trainers.map((trainer) => (
                <TrainerCard key={trainer._id} trainer={trainer} />
            ))}
        </div>
    )
}

export default Trainer
