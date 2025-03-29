import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AccessibleIcon from '@mui/icons-material/Accessible';
import AxiosInstance from './AxiosInstance'
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import MyActionButton from './MyActionButton';
import ProfileModal from './utils/ProfileModal';
import MyModal from './utils/Modal'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios'


const EventDetails = () => {
    const myBaseUrl = 'http://127.0.0.1:8000/';


    const [formData, setFormData] = useState({
        title: '',
        classNames: '',
        start: '',
        end: '',
        description: '',
        project: 1, // Поменять залупу-лупу
        contacts: 1,
        contact_name: '',
    })

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
            project: info.project,
            contacts: info.contacts,
            contact_name: info.contact_name,
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
            contacts: 1,
            contact_name: '',
        })
    };

    const MyParam = useParams()
    const MyId = MyParam.id

    const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState(true)
    const [profile, setProfile] = useState(true)
    const [openProfile, setOpenProfile] = useState(false)

    const GetProfile = (profileId) => {
        AxiosInstance.get(`profile/${profileId}`).then((res) => {
            setProfile(res.data)
        })
    }
    const GetData = () => {
        AxiosInstance.get(`appointment/${MyId}`).then((res) => {
            setEvents(res.data)
            setLoading(false)
        })

    }

    const DeleteData = () => {
        AxiosInstance.delete(`appointment/${MyId}/`).then(() => {
            window.location.replace("/calendar");
        })
    }

    const fileUpload = (file) => {
        axios.create({
            baseURL: myBaseUrl,
            timeout: 5000,
            headers: {
                "Content-Type": "multipart/form-data",
                accept: "application/json"
            }
        }).post(`appointment_file/`, {
            appointment: MyId,
            filename: file,
        }).then(() => {
            window.location.reload();
        })
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

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

                    <Box sx={{ boxShadow: 3, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                        <Box sx={{ fontWeight: 'bold' }}>Description: </Box>
                        <Box sx={{ marginLeft: '10px' }}>{events.description}</Box>
                    </Box>

                    <Box sx={{ boxShadow: 3, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                        <Box sx={{ fontWeight: 'bold', marginTop: "5px" }}>Contact: </Box>
                        <Stack marginLeft="5px" direction="row" spacing={1}>

                            {events.contacts ? (events.contacts.map((contact, i) => (
                                <Chip icon={<AccessibleIcon />} label={events.contact_name[i]} variant="outlined"
                                    onClick={() => {
                                        GetProfile(contact);
                                        setOpenProfile(true);
                                    }} />
                            ))) : <></>}
                        </Stack>
                    </Box>

                    <Box sx={{ boxShadow: 3, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                        <Box sx={{ fontWeight: 'bold', marginTop: "5px" }}>Files: </Box>
                        <Stack marginLeft="5px" direction="row" spacing={1} useFlexGap>
                            {events.files.map((file) => (
                                <Chip icon={<AttachFileIcon />} label={file.filename.split("/")[3]} variant="outlined"
                                    onClick={() => {
                                        window.location.replace(myBaseUrl + file.filename);
                                    }} />
                            ))}
                            {/* <Chip icon={<AddCircleOutlineIcon />} label="Add" /> */}
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload files
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={(event) => {
                                        Array.prototype.slice.call(event.target.files).map((file) => {
                                            console.log(file);
                                            fileUpload(file);
                                        })
                                    }}
                                    multiple
                                />
                            </Button>
                        </Stack>

                    </Box>

                    <Box sx={{ marginBottom: '20px' }}>
                        <Stack marginLeft="5px" direction="row" spacing={1}>
                            <MyActionButton
                                label={"Edit"}
                                type={"button"}
                                onclick={() => {
                                    handleOpen(events);
                                }}

                            />
                            <MyActionButton
                                label={"Delete"}
                                type={"submit"}
                                onclick={() => {
                                    DeleteData();
                                }}
                            />
                        </Stack>

                    </Box>
                    {openProfile ?
                        <ProfileModal
                            open={openProfile}
                            handleClose={() => {
                                setOpenProfile(false);
                            }}
                            profile={profile} />
                        : <></>
                    }
                </>

            }
        </div >
    )
}

export default EventDetails