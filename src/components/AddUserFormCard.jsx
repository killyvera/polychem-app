import React, { useEffect, useState } from 'react'
import { Typography, Box, Avatar, Stack, Button, Container } from '@mui/material';
import { SelectShift } from './SelectShift'

export function AddUserFormCard(props) {
    const [user, setUser] = useState([])
    console.log(props)

    const search = async () => {
        const result = await props.users.users.filter(user => {
            return user.Username.includes(props.userId)
        })
        console.log(result)
        setUser(result)
    }

    useEffect(() => {
        search()
    }, [props.userId])

    return (
        <Box style={{ minWidth: '350px', display: 'flex', flexDirection: 'column', borderStyle: 'solid', borderWidth: '1px', borderRadius: '3px', padding: '12px', marginTop: '7px' }} >
            <Container>
                <Stack direction="row" spacing={1} >
                    <Avatar />
                    <Typography style={{ alignSelf: 'center' }} >{user[0]?.Attributes[1].Value ? user[0].Attributes[1].Value : 'Loading...'}</Typography>
                </Stack>
                <SelectShift />
            </Container>
            <Stack direction='row' spacing={1} alignSelf='center' >
                <Button variant="contained" >Agregar</Button>
                <Button variant="outlined" >Cancelar</Button>
            </Stack>
        </Box>
    )
}

//props.user.Attributes[1].Value