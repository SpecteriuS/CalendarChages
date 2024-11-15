import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AxiosInstance from './AxiosInstance'
import Box from '@mui/material/Box';
import dayjs from 'dayjs';

const EventDetails = () => {

    const MyParam = useParams()
    const MyId = MyParam.id
    console.log(MyId)

    const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState(true)

    const GetData = () => {
        AxiosInstance.get(`appointment/${MyId}`).then((res) => {
            setEvents(res.data)
            setLoading(false)
            console.log(res.data)
        })

    }

    useEffect(() => {
        GetData();
    }, [])



    return (
        <div>
            {loading ? <p>Loading the data...</p> :
                <>
                    <Box sx={{ boxShadow: 3, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                        <Box sx={{ fontWeight: 'bold' }}>Name: </Box>
                        <Box sx={{ marginLeft: '10px' }}>{events.title}</Box>
                    </Box>

                    <Box sx={{ boxShadow: 3, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                        <Box sx={{ fontWeight: 'bold' }}>Status: </Box>
                        <Box sx={{ marginLeft: '10px' }}>{events.classNames}</Box>
                    </Box>

                    <Box sx={{ boxShadow: 3, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                        <Box sx={{ fontWeight: 'bold' }}>Start date: </Box>
                        <Box sx={{ marginLeft: '10px' }}>{dayjs(events.start).format('MMMM D, YYYY HH:mm')}</Box>
                    </Box>

                    <Box sx={{ boxShadow: 3, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                        <Box sx={{ fontWeight: 'bold' }}>End date: </Box>
                        <Box sx={{ marginLeft: '10px' }}>{dayjs(events.end).format('MMMM D, YYYY HH:mm')}</Box>
                    </Box>
                </>

            }
        </div>
    )
}

export default EventDetails