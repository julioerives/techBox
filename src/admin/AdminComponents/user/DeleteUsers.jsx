import React from 'react'
import app from "../../../firebaseConfig";
import { getDatabase, ref, remove } from "firebase/database";
const DeleteUsers = async ( item, fetchDataUsers, setUsers ) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "users/" + item.itemId);
    await remove(dbRef);
    fetchDataUsers();
}

export default DeleteUsers;