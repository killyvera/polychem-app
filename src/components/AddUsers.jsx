import { Typography, Box, Avatar, Stack, Button, IconButton } from '@mui/material';
import { Container } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete'
import { useState, useEffect, useContext } from 'react'
import { FormsContext } from '../contexts/FormsContext';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AddedUserCard } from './AddedUserCard';

export const AddUsers = (props) => {
    const { usersFormList, setUsersFormList, handleView, usersProfile, setUsersProfile, toggle } = useContext(FormsContext)

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
                    <AddedUserCard  key={index} userData={userData} />
                )) : <Container>Agregar Usuarios</Container>
                }
            </Box>
        </Container >

    )
}
