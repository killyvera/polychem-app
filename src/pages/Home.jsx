import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import {QrCodeReader} from '../helpers/QrCodeReader'

export function Home() {
    return (
        <Box style={{ paddingTop: '10vh', maxHeight: '300px' }} >
            <Container>
                <Typography variant='h4' >Home</Typography>
            </Container>
            <QrCodeReader />
        </Box>

    )
}
