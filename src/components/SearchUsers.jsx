import { useState, useContext } from 'react'

import { Typography, Box, Avatar, Stack, Button, IconButton } from '@mui/material';

import { QrCodeReader } from '../helpers/QrCodeReader'

import { Container } from '@mui/system';
import { FormsContext } from '../contexts/FormsContext';
import { getUser } from '../services/UserServices'
import { Storage } from 'aws-amplify';

import { SelectShift } from './SelectShift';

export const SearchUsers = (props) => {
    const { usersFormList, setUsersFormList, handleView, usersProfile, setUsersProfile } = useContext(FormsContext)
    const [shiftUser, setShiftUser] = useState('')
    const [user, setUser] = useState([])
    const [userFull, setUserFull] = useState([])

    function searchAttr(attr, userData) {
        for (var i = 0; i < userData.length; i++) {
            if (userData[i].Name === attr) {
                return userData[i].Value;
            }
        }
    }

    const getAvatar = async (userId) => {
        const id = userId
        const link = await Storage.get(`avatar/${id}.png`)
        return link
    }

    const handleClose = () => {
        handleView()
    }

    const HandleAdd = async (userInfo) => {
        console.log(userInfo)

        const userData = {
            user: {
                userId: userInfo.Username,
                username: searchAttr('name', userInfo.Attributes),
                profile: searchAttr('profile', userInfo.Attributes),
                puesto: '',
                shift: shiftUser,
            }
        }
        const newUsersFormList = [...usersFormList]
        newUsersFormList.push(userData)
        setUsersFormList(newUsersFormList)
        handleView()
    }

    const UpdateUser = async () => {

    }

    return (
        <Box>
            {props.searchUser.length <= 0 ? <Container>
                <QrCodeReader users={props.users} handleView={props.handleView} />
            </Container>: <div></div>}
            <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: props.searchUser.length <=0? '4px':'90px' }} >
                <Box>
                    <input style={{ width: '350px', textAlign: 'center' }} value={props.searchUser} placeholder=' Ingresa nombre de Usuario 🔍' onChange={props.handleChangeSearch} />
                </Box>
                {props.listUsers.length >= 1 && props.listUsers.length <= 3 ? props.listUsers.map((user, index) => (
                    <Box key={index} style={{ minWidth: '350px', display: 'flex', flexDirection: 'column', borderStyle: 'solid', borderWidth: '1px', borderRadius: '3px', padding: '12px', marginTop: '7px' }} >
                        <Container>
                            <Stack direction="row" spacing={1} >
                                <Avatar />
                                <Typography style={{ alignSelf: 'center' }} >{searchAttr('name', user.Attributes)}</Typography>
                            </Stack>
                            <SelectShift setShiftUser={setShiftUser} />
                        </Container>
                        <Stack direction='row' spacing={1} alignSelf='center' >
                            <Button onClick={() => (HandleAdd(user))} variant="contained" >Agregar</Button>
                            <Button onClick={handleClose} variant="outlined" >Cancelar</Button>
                        </Stack>
                    </Box>
                )) : <Typography style={{ paddingTop: '14vh' }} >
                    No search Results
                </Typography>}
                <Button onClick={handleClose} variant='contained' style={{marginTop:'20px'}} >
                    Cancelar
                </Button>
            </Container >
        </Box>

    )
}
