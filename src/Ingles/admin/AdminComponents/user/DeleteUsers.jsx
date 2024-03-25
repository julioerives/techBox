import React from 'react'
import app from '../../../../firebaseConfig';

import { getDatabase, ref, remove } from "firebase/database";
import { getAuth, deleteUser } from 'firebase/auth';
import { showMessage } from '../../../../showMessage';
const DeleteUsers = async ( item, fetchDataUsers, setUsers) => {
    try{
    const db = getDatabase(app);
    const dbRef = ref(db, "users/" + item.itemId);
    await remove(dbRef);
    fetchDataUsers();
    }catch(e){
        showMessage("An error occurred.","Fatal");
        
    }
}

export default DeleteUsers;