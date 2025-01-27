import React from 'react'

const PriceSection = ({ price }) => {
    return (
        <div>
            <section className="p-6 my-6 bg-gray-800 dark:bg-gray-100 text-gray-100 dark:text-gray-800">
                <div className=" grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
                    <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800">
                        <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-cyan-400 dark:bg-cyan-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                            </svg>

                        </div>
                        <div className="flex flex-col justify-center align-middle">
                            <p className="text-3xl font-semibold leading-none">{price}$</p>
                            <p className="capitalize">Total Balance</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PriceSection
