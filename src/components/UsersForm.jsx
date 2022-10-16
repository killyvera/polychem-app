import { useState, useEffect, useContext } from 'react'

import { Typography, Box, Avatar, Stack, Button, IconButton } from '@mui/material';
import { usersList } from '../services/UserServices'
import { QrCodeReader } from '../helpers/QrCodeReader'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Container } from '@mui/system';
import { FormsContext } from '../contexts/FormsContext';
import { getUser } from '../services/UserServices'
import { Storage } from 'aws-amplify';
import { AddUsers } from './AddUsers';
import { SearchUsers } from './SearchUsers';
import { SelectShift } from './SelectShift';


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
//sx={{ display: { xs: 'none', md: 'block' } }}