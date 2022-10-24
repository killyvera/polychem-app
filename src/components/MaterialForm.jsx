
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import Images from '../constants/Images'
import { Container, Box, } from '@mui/system'
import Button from '@mui/material/Button';
import { FormsContext } from '../contexts/FormsContext';
import { useState, useEffect, useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';

// import required modules
import { Pagination } from "swiper";

export function MaterialForm() {
  const { ingredients } = useContext(FormsContext)
  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} style={{ paddingTop: '18px' }}>
        {
          ingredients.length > 0 ? ingredients.map((ingredient, index) => (
            <SwiperSlide key={index} >
              <Box style={{ backgroundColor: 'aliceblue', margin: '10px', display: 'flex', alignItems: 'center' }}  >
                <img src={ingredients[0].image} style={{ height: '90px', opacity: '100%', backgroundColor: 'white', padding: '5px' }} />
                <div style={{ marginLeft: '14px' }} >
                  <p>
                    {ingredient.name}
                  </p>
                  <p>
                    <b>
                      Faltan, almenos {ingredient.quantity.toLocaleString()} pzas.
                    </b>
                  </p>
                </div>

              </Box>
              <div>
                <Button variant="contained" >
                  <AddIcon />
                </Button >
              </div>
              <Container style={{ marginBottom: '40px', marginTop: '18px' }} >
                <form style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                  <label>Lote:
                    <input type="text" style={{ marginLeft: '7px' }} />
                  </label>
                  <label>
                    <input type="text" style={{ marginLeft: '7px', marginRight: '7px', maxWidth: '70px' }} />
                    Kg
                  </label>
                </form>
              </Container>
            </SwiperSlide>
          )) : <div>No Ingredient</div>
        }
      </Swiper>
    </>
  );
}
