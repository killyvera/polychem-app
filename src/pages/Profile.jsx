import { Authenticator } from '@aws-amplify/ui-react'
import { Box, Container, Typography, Avatar, Toolbar, Button, Badge, IconButton } from '@mui/material'
import { blue } from '@mui/material/colors';
import EmailIcon from '@mui/icons-material/Email';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { Stack } from '@mui/system';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

export function Profile({ signOut, user }) {
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

                            <Avatar sx={{ bgcolor: blue[500], width: 56, height: 56 }} aria-label="recipe" />
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
                        <Stack direction='row' spacing={1} mt={2} >
                            <Button variant='contained' size="small" >
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


const AddImageButton = () => {
    return (
        <IconButton color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" />
            <AddAPhotoIcon />
        </IconButton>
    )
}