import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';

const Chart = ({ chartData }) => {
    const pieParams = {
        height: 200,
        margin: { right: 5 },
        slotProps: { legend: { hidden: true } },
    };
    const formattedData = Object.entries(chartData).map(([key, value]) => ({
        id: key,
        value,
    }));

    return (
        <Stack direction="row" width="100%" textAlign="center" spacing={2}>
            <Box flexGrow={1}>
                <Typography>Data Overview</Typography>
                <PieChart
                    series={[
                        {
                            data: formattedData,
                        },
                    ]}
                    {...pieParams}
                />
            </Box>
        </Stack>
    );
};

export default Chart;
