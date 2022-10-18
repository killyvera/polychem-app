import React from 'react'
import Images from '../constants/Images'
import { Container, Box } from '@mui/system'

export const FormulaForm = () => {

    const ingredients = [
        {
            name: 'Sal rosa del Himalaya',
            image: Images.ingredient,
            quantity: 2000,
        },
        {
            name: 'Sal rosa del Himalaya',
            image: Images.ingredient,
            quantity: 2000,

        },
        {
            name: 'Sal rosa del Himalaya',
            image: Images.ingredient,
            quantity: 2000,
        }
    ]

    return (
        ingredients.length > 0 ? ingredients.map((ingredient, index) => (
            <Box style={{ backgroundColor: 'aliceblue', margin: '10px', display:'flex', alignItems: 'center'}} key={index} >
                <img src={ingredients[0].image} style={{ height: '90px', opacity: '100%', backgroundColor: 'white', padding: '5px' }} />
                <div style={{marginLeft:'14px'}} >
                    <p>
                        {ingredient.name}
                    </p>
                    <p>
                        <b>
                            {ingredient.quantity} pzas.
                        </b>
                    </p>
                </div>

            </Box>
        )) : <div>No Ingredient</div>

    )
}
