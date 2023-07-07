import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import SideBar from './SideBar'

export default function AddItems() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [discription, setDes] = useState("")
    const [Msg, setMsg] = useState(null)
    const [Con, setCon] = useState(false)
    const [Con2, setCon2] = useState(false)
    const [images, setImg] = useState(false)
    const [img, setImgs] = useState(false)
    const history=useHistory()
    useEffect(() => {
        console.log("Ok")
        var result = localStorage.getItem('User');
        var resultAsJson = JSON.parse(result);
        if (resultAsJson == null) {
            history.push('/');

          
        }
      }, []);
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setImg(event.target.files[0]);
        console.log(images)
    };
    const uploadImage = async () => {
        // const ItemId = uniqueId;
        const image = images;
        console.log(image)
        const formData = new FormData();
        // formData.append('itemid', ItemId);
        formData.append('image', image);
        const Response = await fetch('http://localhost:5000/api/Item/upload', {
            method: 'post',
            body: formData
        })
        const response_json = await Response.json()
        console.log(response_json)
        setImgs(response_json)
        console.log(img)
    }
    const ADDItem = async () => {
        console.log(images)
        uploadImage()
        const User = { name, price, discription }


        console.log(User)
        const Response = await fetch("http://localhost:5000/api/Item/Add", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(User)

        })
        const Response_Json = await Response.json();


        console.log(Response_Json)
        if (Response_Json.error !== undefined) {
            setMsg(Response_Json.error.msg)
            setCon(true)
            setCon2(false)
            // setCon2(false)
        }
        else {
            setMsg(Response_Json)
            console.log(Msg)
            setCon2(true)
            setCon(false)
            uploadImage(Response_Json._id)

            // setCon(false)
        }
            window.location.reload() 
    }
    const ADD = () => {
        ADDItem()
    }
    return (
        <>
            <div className='Full_Page_Dashboard'>
                <SideBar />
                <div className='AddItems'>
                    {Con === true ? <div className='Error2'>{Msg}</div> : Con2 === true ? <div className='Error3'>{Msg.name} Is Created</div> : null}
                    <div className='AddItems_OutLine'>
                        <div className='AddItems_Inside'>
                            <div className='Top_Line'>
                                <div className='Top_Line_Half'>
                                    <div className='Data_Get_Element'>
                                        <div className='Data_Get_Heading'>
                                            Name
                                        </div>
                                        <input className='Data_Get' value={name} onChange={(event) => { setName(event.target.value) }} ></input>
                                    </div>
                                </div>
                                <div className='Top_Line_Half'>
                                    <div className='Data_Get_Element'>
                                        <div className='Data_Get_Heading'>
                                            Price
                                        </div>
                                        <input className='Data_Get' value={price} onChange={(event) => { setPrice(event.target.value) }}></input>
                                    </div>
                                </div>
                            </div>
                            <div className='Top_Line'>
                                <div className='Top_Line_Half'>
                                    <div className='Data_Get_Element'>
                                        <div className='Data_Get_Heading'>
                                            Description
                                        </div>
                                        <input className='Data_Get' value={discription} onChange={(event) => { setDes(event.target.value) }} ></input>
                                    </div>
                                </div>
                            </div>
                            <div className='Last_Line'>
                                <div className='Top_Line_Half'>
                                    <div className='Data_Get_Element'>
                                        <form method="POST" action="/Upload" enctype="multipart/form-data" className='Choose_Img'>
                                            <input type="file" className='Choose_Img' onChange={(event) => setImg(event.target.files[0])} name='Img' required />

                                        </form>
                                    </div>
                                </div>
                                <div className='Top_Line_Half'>
                                    <div className='Data_Get_Element'>
                                        <button className='Submit_Button' onClick={ADD} >Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
