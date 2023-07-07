import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SideBar from './SideBar';

var i = 0;
var j = 0;
var s = 0;

export default function AddBlog() {
  const history = useHistory();
  const [heading, setHeading] = useState('');
  const [subheading, setSubHeading] = useState('');
  const [content, setPara] = useState('');
  const [image, setImage] = useState(null);
  const [slider, setslider] = useState([]);

  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');
  const [CheckError, setCheckError] = useState('');
  useEffect(() => {
    console.log("Ok")
    var result = localStorage.getItem('User');
    var resultAsJson = JSON.parse(result);
    if (resultAsJson == null) {
      
      history.push('/');
      
    }
    else{

    }
  }, []);
  const blog = localStorage.getItem('ID');
  const id = JSON.parse(blog);


  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    console.log(image);
  };
  const handleSliderChange = (event) => {
    setslider(Array.from(event.target.files));
    console.log(slider);
  };

  const imageUploadSimple = async () => {
    console.log(image);
    const formData = new FormData();
    formData.append('image', image);
    const response = await fetch('http://localhost:5000/api/Blog/Simple/Image/upload/simple', {
      method: 'post',
      body: formData,
    });
    const response_json = await response.json();
    console.log(response_json);
    setCheckError(response_json)

  };
  const addImage = async () => {
    imageUploadSimple();
    console.log(CheckError);

    if (CheckError.errors === undefined) {
      i++;
      j++;
      const data = {
        name: 'Image',
        blog_id: id,
        secNo: i,
        image_id: j
      }
      console.log(data)
      const response = await fetch('http://localhost:5000/api/Blog/Simple/Image/upload/Blog-Simple-Image', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const good = await response.json()
      console.log(good)
      if (good.errors === undefined) {
        document.getElementsByClassName('Input_Image')[0].style.display = 'none';
        document.getElementsByClassName('AddBlog_Outline_Part2')[0].style.display = 'flex';
      } else {
        setError(true);
        setMsg(good.errors[0].msg);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    }
    else {
      console.log("Good")
      setError(true)
      setMsg(CheckError.errors.msg)
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
    // if (image) {
    // } else {
    // }
  };

  const handleHeadingCancel = async () => {
    // const response = await fetch('http://localhost:5000/api/Blog/Delete/' + id, {
    //   method: 'post',
    // });
    // const responseCheck = await response.json();
    // console.log(responseCheck);
    console.log("1")
    history.push('/Dashboard');
  };

  const handleHeadingSave = async () => {
    i++;
    var name = 'Heading';
    var blog_id = id;
    var secNo = i;
    const head = { name, heading, blog_id, secNo };
    console.log(head);
    const response = await fetch('http://localhost:5000/api/Heading/Add', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(head),
    });
    const responseCheck = await response.json();
    if (responseCheck.errors === undefined) {
      document.getElementsByClassName('Input_Com')[0].style.display = 'none';
      document.getElementsByClassName('AddBlog_Outline_Part2')[0].style.display = 'flex';
    } else {
      setError(true);
      setMsg(responseCheck.errors[0].msg);
      console.log(responseCheck, msg);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleSubSave = async () => {
    i++;
    var name = 'SubHeading';
    var blog_id = id;
    var secNo = i;
    const head = { name, subheading, blog_id, secNo };
    console.log(head);
    const response = await fetch('http://localhost:5000/api/Sub/Add', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(head),
    });
    const responseCheck = await response.json();
    if (responseCheck.errors === undefined) {
      document.getElementsByClassName('Input_Com1')[0].style.display = 'none';
      document.getElementsByClassName('AddBlog_Outline_Part2')[0].style.display = 'flex';
    } else {
      setError(true);
      setMsg(responseCheck.errors[0].msg);
      console.log(responseCheck.errors[0].msg, error)
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleSubCancel = () => {
    document.getElementsByClassName('Input_Com1')[0].style.display = 'none';
    document.getElementsByClassName('AddBlog_Outline_Part2')[0].style.display = 'flex';
  };
  const handleImageCancel = () => {
    document.getElementsByClassName('Input_Image')[0].style.display = 'none';
    document.getElementsByClassName('AddBlog_Outline_Part2')[0].style.display = 'flex';
  };
  const handleParaSave = async () => {
    i++;
    var name = 'Para';
    var blog_id = id;
    var secNo = i;
    const head = { name, content, blog_id, secNo };
    console.log(head);
    const response = await fetch('http://localhost:5000/api/Para/Add', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(head),
    });
    const responseCheck = await response.json();
    console.log(responseCheck);
    if (responseCheck.errors === undefined) {
      document.getElementsByClassName('For_Para')[0].style.display = 'none';
      document.getElementsByClassName('AddBlog_Outline_Part2')[0].style.display = 'flex';
    } else {
      setError(true);
      setMsg(responseCheck.errors[0].msg);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleParaCancel = () => {
    document.getElementsByClassName('For_Para')[0].style.display = 'none';
    document.getElementsByClassName('AddBlog_Outline_Part2')[0].style.display = 'flex';
  };

  const handleCompleteBlog = () => {
    document.getElementsByClassName("AddBlog_Outline_Part2")[0].style.display = "none"
    i = 0;
    j = 0;
    s = 0;
    setError(1);
    setTimeout(() => {
      setError(false);
      history.push('/Dashboard');
    }, 3000);
  };

  const handleSubAdd = () => {
    document.getElementsByClassName('Input_Com1')[0].style.display = 'flex';
    document.getElementsByClassName('AddBlog_Outline_Part2')[0].style.display = 'none';
    document.getElementsByClassName('Input_Com_Heading')[1].value = '';
  };

  const handleParaAdd = () => {
    document.getElementsByClassName('For_Para')[0].style.display = 'flex';
    document.getElementsByClassName('AddBlog_Outline_Part2')[0].style.display = 'none';
    document.getElementsByClassName('Input_Com_Heading1')[0].value = '';
  };
  const handleImageAdd = () => {
    document.getElementsByClassName('Input_Image')[0].style.display = 'flex';
    document.getElementsByClassName('AddBlog_Outline_Part2')[0].style.display = 'none';
    // document.getElementsByClassName('Input_Com_Heading1')[0].value = '';
  };

  return (
    <>
      <div className='Full_Page_Dashboard'>
        <SideBar />
        <div className="Auto">
          {error === true ? <div className="Error2">{msg}</div> : error === 1 ? <div className="Error3">Blog Is Created</div> : null}
          <div className="AddBlog_Outline">
            <div className="AddBlog_Outline_Part1">
              <div className="Input_Com">
                <div className="Input_Heading">Heading</div>
                <input className="Input_Com_Heading" type="text" onChange={(event) => { setHeading(event.target.value) }} />
                <div className="Input_Heading_Last">
                  <div className="Input_Heading_Last_ButtonBar">
                    <button className="Input_Heading_Last_ButtonBar_Cencel" onClick={handleHeadingCancel}>Cancel</button>
                    <button className="Input_Heading_Last_ButtonBar_Save" onClick={handleHeadingSave}>Save</button>
                  </div>
                </div>
              </div>
              <div className="Input_Com1">
                <div className="Input_Heading">Sub Heading</div>
                <input className="Input_Com_Heading" type="text" onChange={(event) => { setSubHeading(event.target.value) }} />
                <div className="Input_Heading_Last">
                  <div className="Input_Heading_Last_ButtonBar">
                    <button className="Input_Heading_Last_ButtonBar_Cencel" onClick={handleSubCancel}>Cancel</button>
                    <button className="Input_Heading_Last_ButtonBar_Save" onClick={handleSubSave}>Save</button>
                  </div>
                </div>
              </div>
              <div className="For_Para">
                <div className="Input_Heading1">Paragraph</div>
                <textarea className="Input_Com_Heading1" type="text" onChange={(event) => { setPara(event.target.value) }}></textarea>
                <div className="Input_Heading_Last1">
                  <div className="Input_Heading_Last_ButtonBar">
                    <button className="Input_Heading_Last_ButtonBar_Cencel" onClick={handleParaCancel}>Cancel</button>
                    <button className="Input_Heading_Last_ButtonBar_Save" onClick={handleParaSave}>Save</button>
                  </div>
                </div>
              </div>
              <div className="Input_Image">
                <div className="Input_Image_Heading">Image</div>
                <input className="Input_Com_Heading" type="file" name="image" onChange={handleImageChange} />
                <div className="Input_Heading_Last">
                  <div className="Input_Heading_Last_ButtonBar">
                    <button className="Input_Heading_Last_ButtonBar_Cencel" onClick={handleImageCancel}>Cancel</button>
                    <button className="Input_Heading_Last_ButtonBar_Save" onClick={addImage}>Save</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="AddBlog_Outline_Part2">
              <div className="Part2_Inside">
                <button className="Add_SubHeading" onClick={handleSubAdd}>Add Subheading</button>
                <button className="Add_Para" onClick={handleParaAdd}>Add Paragraph</button>
                <button className="Add_Image" onClick={handleImageAdd}>Add Image</button>
                <button className="Complete" onClick={handleCompleteBlog}>Complete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}