import { Amplify, Storage } from 'aws-amplify';
import { Route, Routes } from 'react-router-dom'
import { withAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { NavBar } from './components/NavBar';
import {Home} from './pages/Home'
import {Profile} from './pages/Profile'
import {FormsList} from './pages/FormsList'
import {ProductionForm} from './forms/ProductionForm'

Amplify.configure(awsExports);

function App({ signOut, user }) {
  console.log(user)
  return (
    <div>
      <NavBar user={user} signOut={signOut} />
      <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/profile' element={<Profile user={user} signOut={signOut} />} />
                    <Route path='/forms' element={<FormsList />} />
                    <Route path='/productionform' element={<ProductionForm />} />
                </Routes>
    </div>
  );
}

export default withAuthenticator(App);