import React from 'react'
import { Stack } from '@mui/system'

export const FormsList = () => {
    const forms = [
        {
            title: 'Formulario 1',
            questions: 4,
            time: '12:30-14:30',
            days: 'Lun Mar Jue',
            depto: 'Produccion'
        },
        {
            title: 'Formulario 2',
            questions: 12,
            time: '12:30-14:30',
            days: 'Lun Mar Jue',
            depto: 'Produccion'
        },
        {
            title: 'Formulario 3',
            questions: 7,
            time: '12:30-14:30',
            days: 'Lun Mar Jue',
            depto: 'Produccion'
        },
        {
            title: 'Formulario 4',
            questions: 20,
            time: '12:30-14:30',
            days: 'Lun Mar Jue',
            depto: 'Producción'
        },
    ]
    console.log(forms[0].title)
    return (
        <div>
            <h1 style={{ paddingTop: '7vh' }} >Formularios</h1>
            {forms.map((form, index) => (
                <div style={{ margin: '12px', backgroundColor: 'gray', borderRadius: '5px' }} key={index}>
                    <Stack direction="row" spacing={2} style={{ alignItems: 'center' }} >
                        <h3 style={{ padding: '4px' }} >
                            {form.title}
                        </h3>
                        <h4>
                            Dpto:{form.depto}
                        </h4>
                        <h5 style={{ padding: '4px' }} >
                            Preguntas:{form.questions}
                        </h5>
                    </Stack>
                    <Stack direction="row" spacing={2} style={{ alignItems: 'center' }} >
                        <h5>
                            Días: {form.days}
                        </h5>
                        <h5 style={{ padding: '4px' }} >
                            Horario:{form.time}
                        </h5>
                    </Stack>
                </div>
            ))}
        </div>
    )
}
