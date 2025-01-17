import React, { useEffect, useState } from 'react'
import TrainerCard from './TrainerCard';





const Trainer = () => {

    const [trainers, setTrainers] = useState([])
    const trainersData = async () => {
        const res = await fetch('/public/trainer.json')
        const data = await res.json()
        // console.log(data)
        setTrainers(data)
    }

    useEffect(() => {
        trainersData()
    }, [])

    return (
        <div className="max-w-[80vw] mx-auto border border-white grid grid-cols-3">
            {trainers.map((trainer) => (
                <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
        </div>
    )
}

export default Trainer
