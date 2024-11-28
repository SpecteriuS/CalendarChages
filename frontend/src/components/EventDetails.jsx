import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AxiosInstance from './AxiosInstance'
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import MyActionButton from './MyActionButton';
import MyModal from './utils/Modal'


const EventDetails = () => {

    const [formData, setFormData] = useState({
        title: '',
        classNames: '',
        start: '',
        end: '',
        description: '',
        project: 1, // Поменять залупу-лупу
    })

    console.log('data formshit', formData)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const [open, setOpen] = useState(false);

    const handleOpen = (info) => {
        setOpen(true)
        setFormData({
            title: info.title,
            classNames: info.classNames,
            start: dayjs(info.start),
            end: dayjs(info.end),
            description: info.description,
            project: info.project
        })
    };
    const handleClose = () => {
        setOpen(false)
        setFormData({
            title: '',
            classNames: '',
            start: '',
            end: '',
            description: '',
            project: 1, // Поменять залупу-лупу
        })

    };
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
                    <MyModal
                        open={open}
                        handleClose={handleClose}
                        myDate={MyId}
                        formData={formData}
                        handleChange={handleChange}
                        method="PUT"
                    />

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
                                handleOpen(eventos);
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