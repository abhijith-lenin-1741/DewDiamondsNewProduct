import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import UserLogin from './sections/UserLogin';
import Loading from './Loading';

const Login = () => {

  const navigate = useNavigate();
  const [selectedDIV, setSelectedDIV] = useState(<Loading/>);       
 
  useEffect(() => {
  //   // alert(window.localStorage.getItem('loggedInUsername'));
  //   if(window.localStorage.getItem('loggedInUsername')) {
  //     axios
  //     .post('http://127.0.0.1:8000/accounts/userAuthVerify', 
  //     {
  //       "username": window.localStorage.getItem('loggedInUsername'),    
  //       "password": window.localStorage.getItem('loggedInUserPassword'), 
  //     })
  //     .then((response) => {
  //       //alert(response.data);

  //       if(response.data === "notExists") {
  //         setSelectedDIV(<UserLogin/>);
  //       }
  //       else {
  //         window.localStorage.setItem('loggedInUsername', window.localStorage.getItem('loggedInUsername'));
  //         window.localStorage.setItem('loggedInUserPassword', window.localStorage.getItem('loggedInUserPassword'));
  //         window.localStorage.setItem('loggedInUserrole', window.localStorage.getItem('loggedInUserrole'));

  //         navigate("/dashboard");
  //       }
  //       //navigate("/dashboard");
  //       //setSelectedDIV(<UserLogin/>);

  //     });
  //   }
  //   else {
   
  //     setSelectedDIV(<UserLogin/>);
  //   }
  setSelectedDIV(<UserLogin/>);
   });
  
    return(
        <>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5">
                  <div class="card-body p-0">
                    {selectedDIV}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>

    )
  
}

export default Login;
