
import React, { useEffect, useState } from 'react';

import ProfileAfterLoginCheck from './sections/ProfileAfterLoginCheck';
import Loading from '../Common/Loading';
import { useNavigate } from "react-router";

const Profile = () => {

    const [selectedDIV, setSelectedDIV] = useState(<Loading/>);
    const navigate = useNavigate();   
// alert(window.localStorage.getItem('loggedInUsername'))
    useEffect(() => {     
      if(window.localStorage.getItem('loggedInUsername') != null) {
        setSelectedDIV(<ProfileAfterLoginCheck/>);
      }
      else {
          navigate("/");
      }
    }, []);
   
    return (
       <>
          {selectedDIV}
       </>
  )
}

export default Profile;