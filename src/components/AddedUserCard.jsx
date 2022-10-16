import { Typography, Box, Avatar, Stack, Button, IconButton } from '@mui/material';
import { Container } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete'
import { useState, useEffect, useContext } from 'react'
import { FormsContext } from '../contexts/FormsContext';
import { blue } from '@mui/material/colors';
import { Storage } from 'aws-amplify';
import { getUser } from '../services/UserServices';
import {SearchAttributes} from '../helpers/SearchAttributes'

export const AddedUserCard = ({ userData }) => {
    const [avatar, setAvatar] = useState('')
    const [user, setUser] = useState([])

    useEffect(() => {
        onPageRendered()
    }, [])

    const onPageRendered = async () => {
        getUserData()
        getAvatar()
    }

    const getUserData= async ()=>{
        const userAttr = await getUser(userData.user.userId).then(user =>(user.UserAttributes))
        //fetchUser.then(user=> setUser(user) )
        setUser(userAttr)
    }

    const getAvatar = async () => {
        const link = await Storage.get(`avatar/${userData.user.userId}.png`)
        setAvatar(link)
    };

    const { usersFormList, setUsersFormList, handleView, usersProfile, setUsersProfile, toggle } = useContext(FormsContext)

    const handleDelete = (id) => {
        const newFormList = usersFormList.filter((userData) => userData.user.userId !== id);
        setUsersFormList(newFormList);
    }

    return (
        <Container >
            {console.log(user)}
            <Stack direction="row" spacing={2} style={{ placeItems: 'center', justifyContent: 'center' }} >
                <Avatar sx={{ bgcolor: blue[500], width: 60, height: 60 }} src={avatar} aria-label="recipe" />
                <Stack style={{ minWidth: '250px' }} >
                    <Typography><b>{userData.user?.username}</b></Typography>
                    <Typography>{SearchAttributes('custom:puesto',user)}</Typography>
                    <Typography>Turno {userData.user?.shift}</Typography>
                </Stack>
                <IconButton onClick={() => (handleDelete(userData.user.userId))} >
                    <DeleteIcon />
                </IconButton>
            </Stack>
        </Container>
    )
}