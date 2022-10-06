import { Authenticator} from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify';
import { Box, Container, Typography, Avatar, Toolbar, Button, Badge, IconButton } from '@mui/material'
import { blue } from '@mui/material/colors';
import EmailIcon from '@mui/icons-material/Email';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { Stack } from '@mui/system';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';
import { editAvatar } from '../services/UserServices';
import { QrCodeGenerator } from '../helpers/QrCodeGenerator';

export function Profile({ signOut, user }) {
    const [userId, setUserId] = useState('no userId')
    const [avatar, setAvatar] = useState('')
    const [toggle, setToggle]= useState(false)

    useEffect(() => {
        user ? setUserId(user.username) : setUserId('No user Id')
        onPageRendered()

    }, [toggle])

    const onPageRendered = async () => {
        getAvatar()
        //Auth.currentAuthenticatedUser()
    }

    const AddImageButton = () => {
        return (
            <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={onChange} />
                <AddAPhotoIcon />
            </IconButton>
        )
    }

    const onChange = async (e) => {
        const avatarImage = e.target.files[0]
        console.log(avatarImage)
        await Storage.put(`avatar/${userId}.png`, avatarImage, {
            contentType: "image/png"
        }).then(result => console.log(result))
            .catch(err => console.log(err));
            setToggle(!toggle)
    }

    const getAvatar = async () => {
        const id = await user.username
        const link = await Storage.get(`avatar/${id}.png`)
        console.log(link)
        setAvatar(link)
        editAvatar(user.username, link)
    };

    return (
        <Authenticator>
            <Box style={{ paddingTop: '10vh', maxHeight: '300px' }} >
                <Container>
                    <Typography variant='h4' >Perfil de Usuario</Typography>
                    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10vh' }} >
                        <Badge
                            badgeContent={<AddImageButton style={{ margin: '' }}
                                color='primary'
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }} />} >

                            <Avatar sx={{ bgcolor: blue[500], width: 124, height: 124 }} src={avatar} aria-label="recipe" />
                        </Badge>
                        <Toolbar>
                            <Typography variant='h5' >
                                {user.attributes.name}
                            </Typography>
                        </Toolbar>
                        <Box>
                            <Typography variant='h6' >
                                Dpto. {user.attributes['custom:departamento']}
                            </Typography>
                            <Typography>
                                Cargo {user.attributes['custom:puesto']}
                            </Typography>
                        </Box>
                        <Box>
                            <Toolbar>
                                <EmailIcon style={{ marginRight: '12px' }} />
                                <Typography>
                                    {user.attributes.email}
                                </Typography>
                            </Toolbar>
                            <Toolbar style={{ marginTop: '-25px' }} >
                                <ContactPhoneIcon style={{ marginRight: '12px' }} />
                                <Typography>
                                    {user.attributes.phone_number}
                                </Typography>
                            </Toolbar>
                        </Box>
                        <Stack spacing={1} mt={1} >
                            <QrCodeGenerator userId={user.username} />
                            <Button onClick={signOut} variant='contained' size="small" >
                                <ExitToAppIcon style={{ marginRight: '7px' }} />
                                Salir
                            </Button>
                        </Stack>
                    </Container>
                </Container>
            </Box>
        </Authenticator>
    )
}
