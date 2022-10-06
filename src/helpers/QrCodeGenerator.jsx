import { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import { Stack } from '@mui/system'
import { Typography } from '@mui/material'

export function QrCodeGenerator(userId) {
    const [src, setSrc] = useState('')

    QRCode.toDataURL(userId.userId).then(setSrc)
    console.log(src)
    return (
        <Stack>
            <img src={src} alt='QR Usuario' />
        </Stack>
    )
}
