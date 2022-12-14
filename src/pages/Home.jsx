import React, { useState, useEffect } from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { Form } from '../models';
import { CreatePalletFormModal } from '../components/CreatePalletFormModal';


//DELETE
//    const todelete = await DataStore.query(Form, 'cc2f36f7-84f7-4ae4-93ba-ba542c73ff93');
//DataStore.delete(todelete)

export function Home() {
    const [forms, setForms] = useState([])

    const getForms = async () => {
        const formsData = await DataStore.query(Form);
        return formsData
    }

    useEffect(() => {
        getForms().then(forms => setForms(forms))
    }, [])

    return (
        <div>
            {console.log(forms)}
            <div style={{ marginTop: '100px' }} >Home</div>
        </div>
    )
}
