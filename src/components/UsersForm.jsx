import { useState, useEffect, useContext } from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Typography, Box, Avatar, Stack, Button, IconButton } from '@mui/material';
import { usersList } from '../services/UserServices'
import { QrCodeReader } from '../helpers/QrCodeReader'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Container } from '@mui/system';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import { FormsContext } from '../contexts/FormsContext';
import { getUser } from '../services/UserServices'
import { Storage } from 'aws-amplify';
import DeleteIcon from '@mui/icons-material/Delete';

export function UsersForm() {
    const { usersFormList, setUsersFormList, handleView, toggle } = useContext(FormsContext)

    const [users, setUsers] = useState([])
    const [listUsers, setListUsers] = useState([])
    const [searchUser, setSearchUser] = useState([])

    useEffect(() => { // GET USERS LIST FROM COGNITO
        usersList().then(users => setUsers(users))
    }, [])

    const handleClickAddUsers = () => { //MANAGE CLOSE 
        handleView()

    }

    const handleChangeSearch = (e) => { // MANAGE SEARCH USERS
        console.log(e.target.value)
        setSearchUser(e.target.value)
        search(e.target.value)
    }

    const search = () => { //SEARCH FUNCTION
        const result = users.filter(user => {
            return searchUser !== '' ? user.Attributes[1].Value.toLowerCase().includes(searchUser.toString().toLowerCase()) : null
        })
        setListUsers(result)
    }

    function searchAttr(attr, userData) {
        for (var i = 0; i < userData.length; i++) {
            if (userData[i].Name === attr) {
                return userData[i].Value;
            }
        }
    }

    const mapUsers = async () => {
        console.log(usersFormList)
        usersFormList.map((userData) => {
            const username = getUser(userData.user.userId).then(user => searchAttr('name', user.UserAttributes));
            username.then(username => userData.user.username = username)
        })
    }

    return (

        <Box>
            {console.log(usersFormList)}
            {toggle ? <AddUsers handleClickAddUsers={handleClickAddUsers} />
                :
                <SearchUsers searchUser={searchUser} handleChangeSearch={handleChangeSearch} listUsers={listUsers} users={users} handleView={handleView} />}
        </Box>
    )
}

const AddUsers = (props) => {
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

const SelectShift = ({ setShiftUser }) => {
    const [shift, setShift] = useState('matutino');

    const handleChange = (event) => {
        setShift(event.target.value);
        console.log(shift)
        setShiftUser(shift)
    };

    return (
        <FormControl style={{ marginTop: '5px', display: 'flex', alignItems: 'center' }} >
            <FormLabel id="radio-shift">Turno</FormLabel>
            <RadioGroup
                row
                aria-labelledby="radio-shift"
                name="radio-shift"
                value={shift}
                onClick={handleChange}
            >
                <FormControlLabel labelPlacement="top" value="vespertino" control={<Radio size="small" />} label="Matutino" />
                <FormControlLabel labelPlacement="top" value="matutino" control={<Radio size="small" />} label="Vespertino" />
            </RadioGroup>
        </FormControl>
    );
}


const SearchUsers = (props) => {
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

        const user = getUser(userInfo.Username).then(userInfo => userInfo.UserAttributes)
        user.then(user => setUserFull(user))
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

    console.log(userFull)

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
            </Container >
        </Box>

    )
}

//sx={{ display: { xs: 'none', md: 'block' } }}