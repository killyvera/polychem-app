import { useState, useEffect, useContext } from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Typography, Box, Avatar, Stack, Button } from '@mui/material';
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

export function UsersForm() {
    const { usersFormList, setUsersFormList } = useContext(FormsContext)

    const [users, setUsers] = useState([])
    const [listUsers, setListUsers] = useState([])
    const [searchUser, setSearchUser] = useState([])
    const [toggle, setToggle] = useState(true)

    useEffect(() => {
        usersList().then(users => setUsers(users))
    }, [])

    const handleView = () => {
        setToggle(!toggle)
        console.log(toggle)
    }

    const handleClickAddUsers = () => {
        handleView()
    }
    const handleChangeSearch = (e) => {
        console.log(e.target.value)
        setSearchUser(e.target.value)
        search(e.target.value)
    }

    const search = () => {
        const result = users.filter(user => {
            return searchUser !== '' ? user.Attributes[1].Value.toLowerCase().includes(searchUser.toString().toLowerCase()) : null
        })
        setListUsers(result)
    }

    return (
        <Box>
            {console.log(listUsers)}

            {toggle ? <AddUsers handleClickAddUsers={handleClickAddUsers} />
                :
                <SearchUsers searchUser={searchUser} handleChangeSearch={handleChangeSearch} listUsers={listUsers} users={users} />}
        </Box>
    )
}

const AddUsers = (props) => {
    //const {usersForm, setUsersForm} = useContext(FormsContext)
    return (
        <Box style={{ display: 'flex', justifyContent: 'space-around', marginTop: '3vh' }}>
            <Typography variant='h5' style={{ alignSelf: 'center' }} >Personal Empleado</Typography>
            <Button onClick={props.handleClickAddUsers} variant="contained" size="large" style={{ borderRadius: '100px', padding: '15px' }}>
                <PersonAddIcon sx={{ fontSize: 35 }} />
            </Button>
        </Box>

    )
}

const SelectShift = () => {
    const [shift, setShift] = useState('');

    const handleChange = (event) => {
        setShift(event.target.value);
    };

    return (
        <FormControl style={{ marginTop: '5px', display: 'flex', alignItems: 'center' }} >
            <FormLabel id="radio-shift">Turno</FormLabel>
            <RadioGroup
                row
                aria-labelledby="radio-shift"
                name="radio-shift"
                value={shift}
                onChange={handleChange}
            >
                <FormControlLabel labelPlacement="top" value="Matutino" control={<Radio size="small" />} label="Matutino" />
                <FormControlLabel labelPlacement="top" value="Vespertino" control={<Radio size="small" />} label="Vespertino" />
            </RadioGroup>
        </FormControl>
    );
}


const SearchUsers = (props) => {
    return (
        <Box>
            <Container>
                <QrCodeReader users={props.users} />
            </Container>
            <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <Box>
                    <input style={{ width: '350px', textAlign: 'center' }} value={props.searchUser} placeholder=' Ingresa nombre de Usuario 🔍' onChange={props.handleChangeSearch} />
                </Box>
                {props.listUsers.length >= 1 && props.listUsers.length <= 3 ? props.listUsers.map((user, index) => (
                    <Box key={index} style={{ minWidth: '350px', display: 'flex', flexDirection: 'column', borderStyle: 'solid', borderWidth: '1px', borderRadius: '3px', padding: '12px', marginTop: '7px' }} >
                        <Container>
                            <Stack direction="row" spacing={1} >
                                <Avatar />
                                <Typography style={{ alignSelf: 'center' }} >{user.Attributes[1].Value}</Typography>
                            </Stack>
                            <SelectShift />
                        </Container>
                        <Stack direction='row' spacing={1} alignSelf='center' >
                            <Button variant="contained" >Agregar</Button>
                            <Button variant="outlined" >Cancelar</Button>
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