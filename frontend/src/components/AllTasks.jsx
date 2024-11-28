import { React, useState, useEffect } from 'react'
import AxiosInstance from './AxiosInstance'
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';

const AllTasks = () => {

    const [loading, setLoading] = useState(true)
    const [directions, setDirections] = useState([])

    const GetData = () => {
        AxiosInstance.get(`direction`).then((res) => {
            setDirections(res.data)
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

                directions.map((direction) => (
                    <><Accordion>
                        <AccordionSummary id="panel-header" aria-controls="panel-content">
                            <Box sx={{ fontWeight: 'bold', marginLeft: '10px' }}>{direction.name}</Box>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Box sx={{ marginLeft: '10px' }}>{direction.description}</Box>
                            {direction.projects.map((project) => (
                                <>
                                    <Accordion>
                                        <AccordionSummary id="panel-header" aria-controls="panel-content">
                                            <Box sx={{ fontWeight: 'bold', marginLeft: '10px' }}>{project.name}</Box>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box sx={{ marginLeft: '10px' }}>{project.description}</Box>
                                            {console.log('appointments', project.appointments)}
                                            {project.appointments.map((appointment) => (
                                                <>
                                                    <Accordion>
                                                        <AccordionSummary id="panel-header" aria-controls="panel-content">
                                                            <Box sx={{ fontWeight: 'bold', marginLeft: '10px' }}>{appointment.title}</Box>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                                                                <Box sx={{ fontWeight: 'bold' }}>Status: </Box>
                                                                <Box sx={{ marginLeft: '10px' }}>{appointment.classNames}</Box>
                                                            </Box>

                                                            <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                                                                <Box sx={{ fontWeight: 'bold' }}>Start date: </Box>
                                                                <Box sx={{ marginLeft: '10px' }}>{dayjs(appointment.start).format('MMMM D, YYYY HH:mm')}</Box>
                                                            </Box>

                                                            <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                                                                <Box sx={{ fontWeight: 'bold' }}>End date: </Box>
                                                                <Box sx={{ marginLeft: '10px' }}>{dayjs(appointment.end).format('MMMM D, YYYY HH:mm')}</Box>
                                                            </Box>

                                                            <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                                                                <Box sx={{ fontWeight: 'bold' }}>Description: </Box>
                                                                <Box sx={{ marginLeft: '10px' }}>{appointment.description}</Box>
                                                            </Box>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </>
                                            ))}
                                        </AccordionDetails>
                                    </Accordion>
                                </>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                    </>
                ))
            }
        </div>
    )
}

export default AllTasks