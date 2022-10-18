import { Tabs, Tab, } from '@mui/material'
import { useState } from 'react'
import FactoryIcon from '@mui/icons-material/Factory';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ScienceIcon from '@mui/icons-material/Science';
import GroupsIcon from '@mui/icons-material/Groups';
import { UsersForm } from '../components/UsersForm';
import { FormulaForm } from '../components/FormulaForm';

export function ProductionForm() {
  const [value, setValue] = useState(0)

  const handleTabs = (event, value) => {
    setValue(value)
  }
  return (
    <div style={{ marginTop: '10vh' }} >
      <Tabs centered value={value} onChange={handleTabs} >
        <Tab label={<FactoryIcon fontSize="large" />} variant='contained' />
        <Tab label={<ScienceIcon fontSize="large" />} />
        <Tab label={<ShoppingBasketIcon fontSize="large" />} />
        <Tab label={<GroupsIcon fontSize="large" />} />
      </Tabs>
      <TabPanel value={value} index={1} children={<FormulaForm />} />
      <TabPanel value={value} index={3} children={<UsersForm />} />
    </div>
  )

}

function TabPanel(props){
  const{children, value, index}= props
  return(
      <div>
          {
              value===index &&(
                  <div>
                      {children}
                  </div>
              )
          }
      </div>
  )
}