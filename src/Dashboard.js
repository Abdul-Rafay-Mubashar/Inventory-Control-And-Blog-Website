import React from 'react'
import { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
import SideBar from './SideBar';
import Welcome from './Welcome';
import AddItems from './AddItems';
import ViewItem from './ViewItem';
import Update from './Update';
import Test from './Test';
import AddBlog from './AddBlog';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ViewBlog from './ViewBlog';
import ViewSpecificBlog from './ViewSpecificBlog';



export default function Dashboard() {
  const [Con, setCon] = useState(false)
  const history = useHistory()
  useEffect(() => {
    console.log("Ok")
    var result = localStorage.getItem('User');
    var resultAsJson = JSON.parse(result);
    
    if (resultAsJson == null) {
        history.push('/');
    }
    else{
      setCon(true)
    }
  }, []);
  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   const formData = new FormData();
  //   formData.append('image', file);

  //   fetch('http://localhost:5000/api/Image/upload-image', {
  //     method: 'POST',
  //     body: formData
  //   })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  return (
    <div className='Full_Page_Dashboard'>
        
        <SideBar />
        {Con===true?
        <Welcome/>:null
        }


    </div>
  )
}
