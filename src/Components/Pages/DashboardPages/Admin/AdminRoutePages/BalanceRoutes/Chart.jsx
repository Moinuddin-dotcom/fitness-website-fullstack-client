import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';


const Chart = ({ subscribers, paymentData }) => {

    return (
        <BarChart
            xAxis={[{ scaleType: 'band', data: ['Subscribers', 'Payments'], label: 'Category' }]}
            series={[
                { data: [subscribers.length, paymentData.length], label: 'Count', color: '#1976d2' } // Blue color
            ]}
            className='w-[300px] h-[300px] lg:w-[500px] lg:h-[300px]'
        />
    );
};

export default Chart;
