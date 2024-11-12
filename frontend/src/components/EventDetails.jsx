import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AxiosInstance from './AxiosInstance'
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import MyActionButton from './MyActionButton';
import MyEditModal from './utils/EditModal';

const EventDetails = () => {

    
    const MyParam = useParams()
    const MyId = MyParam.id

    const [loading, setLoading] = useState(true)
    const [eventos, setEventos] = useState(true)

    const GetData = () => {
        AxiosInstance.get(`appointment/${MyId}`).then((res) => {
            setEventos(res.data)
            setLoading(false)
            console.log(res.data)
        })

    }

    const DeleteData = () => {
        AxiosInstance.delete(`appointment/${MyId}/`).then((res) => {
            window.location.replace("/calendar");
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
                        <Box sx={{ marginLeft: '10px' }}>{eventos.title}</Box>
                    </Box>

                    <Box sx={{ boxShadow: 3, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                        <Box sx={{ fontWeight: 'bold' }}>Status: </Box>
                        <Box sx={{ marginLeft: '10px' }}>{eventos.classNames}</Box>
                    </Box>

                    <Box sx={{ boxShadow: 3, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                        <Box sx={{ fontWeight: 'bold' }}>Start date: </Box>
                        <Box sx={{ marginLeft: '10px' }}>{dayjs(eventos.start).format('MMMM D, YYYY HH:mm')}</Box>
                    </Box>

                    <Box sx={{ boxShadow: 3, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                        <Box sx={{ fontWeight: 'bold' }}>End date: </Box>
                        <Box sx={{ marginLeft: '10px' }}>{dayjs(eventos.end).format('MMMM D, YYYY HH:mm')}</Box>
                    </Box>

                    <Box sx={{ boxShadow: 3, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                        <Box sx={{ fontWeight: 'bold' }}>Description: </Box>
                        <Box sx={{ marginLeft: '10px' }}>{eventos.description}</Box>
                    </Box>


                    <Box sx={{ marginBottom: '20px' }}>
                        <MyActionButton
                            label={"Edit"}
                            type={"button"}
                            onclick={() => {
                                alert(eventos.title);
                            }}

                        />

                    </Box>
                    <Box sx={{ marginBottom: '20px' }}>
                        <MyActionButton
                            label={"Delete"}
                            type={"submit"}
                            onclick={() => {
                                DeleteData();
                            }}
                        />

                    </Box>
                </>

            }
        </div>
    )
}

export default EventDetails