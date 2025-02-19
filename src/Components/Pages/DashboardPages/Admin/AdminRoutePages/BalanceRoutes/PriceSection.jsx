import React from 'react'

const PriceSection = ({ price, users, subscribers }) => {
    return (
        <div>
            <div className="stats stats-vertical shadow  flex-col md:flex">
                <div className="stat">
                    <div className="stat-title">Total Balance</div>
                    <div className="stat-value">{price} BDT</div>
                    {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                </div>

                <div className="stat">
                    <div className="stat-title">New Users</div>
                    <div className="stat-value">{users.length}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-title">New Registers</div>
                    <div className="stat-value">{subscribers.length}</div>
                </div>
            </div>
        </div>
    )
}

export default PriceSection
