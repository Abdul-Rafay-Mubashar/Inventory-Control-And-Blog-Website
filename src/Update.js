import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import SideBar from './SideBar';



export default function Update() {
    const [name, setName] = useState(null)
    const [price, setPrice] = useState(null)
    const [discription, setDes] = useState(null)
    const [Msg, setMsg] = useState(null)
    const [Con, setCon] = useState(false)
    const [Con2, setCon2] = useState(false)
    const history = useHistory()
    useEffect(() => {
        console.log("Ok")
        var result = localStorage.getItem('User');
        var resultAsJson = JSON.parse(result);
        if (resultAsJson == null) {
            history.push('/');

          
        }
      }, []);
    var id = localStorage.getItem("Itemid")
    var idjson = JSON.parse(id)
    const funct = async () => {

        console.log(idjson)
        const data = await fetch("http://localhost:5000/api/Item/getitem/" + idjson, {
            method: "post",
            // body:JSON.stringify(Items)
        })
        const response = await data.json()
        console.log(response)
        setName(response.name)
        setPrice(response.price)
        setDes(response.discription)
    }
    const cencel = () => {
        localStorage.removeItem("Itemid")
        history.push("/ViewItem")
            window.location.reload() 
    }
    const update = async () => {
        const Items = { name, price, discription };
        console.log(Items);
        const data = await fetch("http://localhost:5000/api/Item/Update/" + idjson, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Items)
        });
        const response = await data.json();
        console.log(response);
        if (response.error === undefined) {
            setMsg(response.msg)
            setCon2(true)
            setTimeout(() => {
                setCon2(false)
                history.push("/ViewItem")
            }, 2000);
        }
        else {
            setMsg(response.error.msg)
            setCon(true)
            setTimeout(() => {
                setCon(false)
            }, 2000);
        }
    }
    useEffect(() => {

        funct()
    }, [])

    return (
        <>
            <div className='Full_Page_Dashboard'>
                <SideBar />
                <div className='AddItems'>
                    {Con === true ? <div className='Error2'>{Msg}</div> : Con2 === true ? <div className='Error3'>{Msg}</div> : null}

                    <div className='AddItems_OutLine'>

                        <div className='AddItems_Inside'>
                            <div className='Top_Line'>
                                <div className='Top_Line_Half'>
                                    <div className='Data_Get_Element'>
                                        <div className='Data_Get_Heading'>
                                            Name
                                        </div>
                                        <input className='Data_Get' value={name} onChange={(event) => setName(event.target.value)}  ></input>
                                    </div>
                                </div>
                                <div className='Top_Line_Half'>
                                    <div className='Data_Get_Element'>
                                        <div className='Data_Get_Heading'>
                                            Price
                                        </div>
                                        <input className='Data_Get' value={price} onChange={(event) => setPrice(event.target.value)}  ></input>
                                    </div>
                                </div>
                            </div>
                            <div className='Top_Line'>
                                <div className='Top_Line_Half'>
                                    <div className='Data_Get_Element'>
                                        <div className='Data_Get_Heading'>
                                            Description
                                        </div>
                                        <input className='Data_Get' type='text' value={discription} onChange={(event) => setDes(event.target.value)}  ></input>
                                    </div>
                                </div>
                            </div>
                            <div className='Last_Line'>
                                <div className='Top_Line_Half'>
                                    <div className='Data_Get_Element'>
                                        <input className='Choose_Img' placeholder='Choose File' type='file' ></input>
                                    </div>
                                </div>
                                <div className='Top_Line_Half'>
                                    <div className='Data_Get_Button'>
                                        <button className='Submit_Button1' onClick={cencel}  >Cencel</button>
                                        <button className='Submit_Button' onClick={update}  >Submit</button>
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
