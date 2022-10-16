import { Typography, Box, Avatar, Stack, Button, IconButton } from '@mui/material';
import { Container } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete'
import { useState, useEffect, useContext } from 'react'
import { FormsContext } from '../contexts/FormsContext';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const AddUsers = (props) => {
    const { usersFormList, setUsersFormList, handleView, usersProfile, setUsersProfile, toggle } = useContext(FormsContext)

    const handleDelete = (id) => {

        const newFormList = usersFormList.filter((userData) => userData.user.userId !== id);
        setUsersFormList(newFormList);
    }


    return (
        <Container>
            {console.log(usersProfile)}
            <Box style={{ display: 'flex', justifyContent: 'space-around', marginTop: '3vh' }}>
                <Typography variant='h5' style={{ alignSelf: 'center' }} >Personal Empleado</Typography>
                <Button onClick={props.handleClickAddUsers} variant="contained" size="large" style={{ borderRadius: '100px', padding: '15px' }}>
                    <PersonAddIcon sx={{ fontSize: 35 }} />
                </Button>
            </Box>
            <Box>
                {usersFormList.length > 0 ? usersFormList.map((userData, index) => (
                    <Container key={index} style={{ borderRadius: '3px', padding: '12px', marginTop: '7px', backgroundColor: 'aliceblue' }} >
                        <Stack direction="row" spacing={2} style={{ placeItems: 'center', justifyContent: 'center' }} >
                            <Avatar sx={{ width: 55, height: 55 }} style={{ margin: '4px' }} />
                            <Stack style={{ minWidth: '250px' }} >
                                <Typography><b>{userData.user?.username}</b></Typography>
                                <Typography>{userData.user?.profile}</Typography>
                                <Typography>Turno {userData.user?.shift}</Typography>
                            </Stack>
                            <IconButton onClick={() => (handleDelete(userData.user.userId))} >
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                    </Container>

                )) : <Container>Agregar Usuarios</Container>
                }
            </Box>
        </Container >

    )
}