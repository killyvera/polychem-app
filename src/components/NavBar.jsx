import { AppBar, Typography, Toolbar, Stack, Button, Box, makeStyles } from "@mui/material";
import Image from 'mui-image'
import React from 'react'
import Images from '../constants/Images'
import { SideBar } from "./SideBar";
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';


import { Authenticator } from '@aws-amplify/ui-react'

export function NavBar({ signOut, user }) {
    console.log(user)
    return (
        <Authenticator>
            <AppBar>
                <Box>
                    <Toolbar sx={{ justifyContent: 'space-between' }} >
                        <Stack
                            alignItems='center'
                            spacing={2}
                            direction={'row'}
                        >
                            <SideBar />
                            <Image
                                src={Images.logo}
                                width={'110px'}
                                duration={800} />

                            <Typography
                                pl={7}
                                alignSelf={'center'}
                                sx={{ display: { xs: 'none', sm: 'block' } }} >
                                <b>Bienvenido, </b>
                                {user.attributes.name ?
                                    user.attributes.name :
                                    user.attributes.email ?
                                        user.attributes.email : user.attributes.phone_number}
                            </Typography>
                        </Stack>
                        <IconButton color='inherit' >
                            <SettingsIcon />
                        </IconButton>
                    </Toolbar>
                </Box>
            </AppBar>
        </Authenticator>
    )
}
