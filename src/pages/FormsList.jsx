import React from 'react'
import { Stack } from '@mui/system'
import { Link } from 'react-router-dom'

export const FormsList = () => {
    const form = [
        {
            title: 'Formulario 1',
            questions: 4,
            time: '12:30-14:30',
            days: 'Lun Mar Jue',
            depto: 'Produccion'
        },
    ]

    console.log(form[0].title)
    return (
        <div>

            <h1 style={{ paddingTop: '7vh' }} >Formularios</h1>
            <Link style={{ textDecoration: 'blink' }} to='/productionform'>
                <div style={{ margin: '12px', backgroundColor: 'gray', borderRadius: '5px', color: 'black' }}>
                    <Stack direction="row" spacing={2} style={{ alignItems: 'center' }} >
                        <h3 style={{ padding: '4px' }} >
                            {form[0].title}
                        </h3>
                        <h4>
                            Dpto:{form[0].depto}
                        </h4>
                        <h5 style={{ padding: '4px' }} >
                            Preguntas:{form[0].questions}
                        </h5>
                    </Stack>
                    <Stack direction="row" spacing={2} style={{ alignItems: 'center' }} >
                        <h5>
                            Días: {form[0].days}
                        </h5>
                        <h5 style={{ padding: '4px' }} >
                            Horario:{form[0].time}
                        </h5>
                    </Stack>
                </div>
            </Link>
        </div>
    )
}

