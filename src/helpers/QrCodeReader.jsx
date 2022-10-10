import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Box } from '@mui/system';
import { AddUserFormCard } from '../components/AddUserFormCard';

export const QrCodeReader = (users) => {
  //const [data, setData] = useState('Escanea QR codigo de Usuario 🤳');
  const [userQr, setUserQr] = useState('Escanear QR codigo de Usuario Válido🤳')

  return (
    <Box style={{ padding: '1vh' }}>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setUserQr(result?.text);
          }

          if (!!error) {
            console.log(error);
          }
        }}
      />
      {userQr !== 'Escanear QR codigo de Usuario Válido🤳' ? <AddUserFormCard userId={userQr} users={users} /> : <p>{userQr}</p>}
    </Box>
  );
};

//<p style={{display: 'flex', justifyContent: 'center', marginTop:'-20px'}} >{data}</p>
//<AddUserFormCard userId={data} users={users} />