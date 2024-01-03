import React, { useEffect, useRef, useState } from 'react'
import Sucesspage from '../../COMPONENT/Third_party_auth/Sucess_page/Sucesspage'
import './Demo.css'
import { firebaseDb } from '../../Firebase/Firebase_config'
import { Document, Page } from 'react-pdf';
import CopyrightPage from '../Copyright/Copyright';
import axios from 'axios';
const Demo = () => {



  const options = {
    method: 'GET',
    url: 'https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile',
    params: {
      linkedin_url: 'https://www.linkedin.com/in/williamhgates/',
      include_skills: 'false'
    },
    headers: {
      'X-RapidAPI-Key': '8882540312mshfca10ac73a29300p1a2820jsn006b813c9ee7',
      'X-RapidAPI-Host': 'fresh-linkedin-profile-data.p.rapidapi.com'
    }
  };

  useEffect(async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [])



  return (
    <>
      ssss
    </>
  )
}

export default Demo