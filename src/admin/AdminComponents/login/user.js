import React, { useEffect, useState } from 'react';
import app from '../../../firebaseConfig';
import { getDatabase, ref, get } from 'firebase/database';

export const user = () => {
  const [userData, setUserData] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, 'users/Admin');
      const snapshot = await get(dbRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUserData(data);
      }
    };
    console.log(userData)
    fetchData();
  }, []);

  return userData;
};
export default user