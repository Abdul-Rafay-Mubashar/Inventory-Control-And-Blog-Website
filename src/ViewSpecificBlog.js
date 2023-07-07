import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import SideBar from './SideBar';

export default function ViewSpecificBlog() {
  const [Heading, SetHeading] = useState([]);
  const [Subs, SetSubs] = useState([]);
  const [Para, SetPara] = useState([]);
  const [Img, SetImgs] = useState([]);
  const [MyStyle, SetMyStyle] = useState({});
  const [ImageMyStyle, SetImageMyStyle] = useState({});
  const history = useHistory()

  const [Array, SetArray] = useState([]);
  const [Check, SetCheck] = useState(false);
  useEffect(() => {
    console.log("Ok")
    var result = localStorage.getItem('User');
    var resultAsJson = JSON.parse(result);
    if (resultAsJson == null) {
      history.push('/');
    }
  }, []);

  const Blog_Id = localStorage.getItem('Blog_Id');
  const id = JSON.parse(Blog_Id);
  const User = { id };
  console.log(User.id);

  const For_Heading = async () => {
    fetch("http://localhost:5000/api/Heading/GetById/" + id, {
      method: "post",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        SetHeading(data);
      });
  };

  const For_Subs = async () => {
    fetch("http://localhost:5000/api/Sub/GetById/" + id, {
      method: "post",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        SetSubs(data);
      });
  };

  const For_Paras = async () => {
    fetch("http://localhost:5000/api/Para/GetById/" + id, {
      method: "post",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        SetPara(data);
      });
  };

  const For_Image = async () => {
    const response = await fetch(
      "http://localhost:5000/api/Blog/Simple/Image/GetById/" + id,
      {
        method: "post",
      }
    );
    const inJson = await response.json();
    SetImgs(inJson);
    SetCheck(true);
  };

  useEffect(() => {
    For_Heading();
    For_Subs();
    For_Paras();
    For_Image();
  }, []);

  useEffect(() => {
    const Merge = Heading.concat(Subs, Para, Img);
    const sortedMerge = Merge.sort((a, b) => a.secNo - b.secNo);
    SetArray(sortedMerge);
  }, [Heading, Subs, Para]);


  return (
    <div className='Full_Page_Dashboard'>
      <SideBar />
      <div className='ViewSpecificBlog_Outline'>
        <div className='ViewSpecificBlog_Inside'>
          {Check === true ? (
            Array.map((res) => {
              if (res.name === "Heading") {
                return (
                  <div className='ViewSpecificBlog_Inside_Heading'>
                    {res.heading}
                  </div>
                );
              } else if (res.name === "SubHeading") {
                return (
                  <div className='ViewSpecificBlog_Inside_Sub'>
                    {res.subheading}
                  </div>
                );
              } else if (res.name === "Para") {
                return (
                  <div className='ViewSpecificBlog_Inside_Para'>
                    {res.content}
                  </div>
                );
              } else if (res.name === "Image") {
                return (
                  <div className='ViewSpecificBlog_Image_Outline'>
                    <img
                      alt='pic'
                      src={"http://localhost:5000/" + res.image}
                      className='ViewSpecificBlog_Image'
                    />
                  </div>
                );
              }
              return null;
            })
          ) : null}
        </div>
      </div>
    </div>
  );
}