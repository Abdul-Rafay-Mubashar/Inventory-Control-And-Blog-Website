import React, { useEffect, useState } from 'react'
import DeleteItem from './DeleteItem';
import { useHistory } from 'react-router-dom';
import SideBar from './SideBar';


export default function ViewItem() {
    const history = useHistory()
    const [array, setArray] = useState([]);
    const [arrayData, setArrayData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [check, SetCheck] = useState(false)
    const [id, setId] = useState("")
    
    useEffect(() => {
        console.log("Ok")
        var result = localStorage.getItem('User');
        var resultAsJson = JSON.parse(result);
        if (resultAsJson == null) {
          history.push('/');
          
        }
      }, []);
    const SearchItemByName = (event) => {
        // setLoading()
        var Search = {
            search: event.target.value
        }
        // if(Search.search===" ")
        // {
        //     setLoading(true)
        // }
        // else{
        console.log(Search.search)
        fetch("http://localhost:5000/api/Item/Search", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Search)
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                var Length = data.length;
                Length = Length / 2
                Length = Math.ceil(Length)
                console.log(Math.ceil(Length))
                var l = 2;
                var f = 0;
                var index = 0;
                const newArray = [];
                while (index < Length) {
                    newArray[index] = data.slice(f, l)
                    index++;
                    f = f + 2;
                    l = l + 2;
                    if (l > data.length) {
                        l = data.length;
                    }
                }
                console.log(newArray)
                setArrayData(newArray)
                console.log(array)
                setLoading(1)

            })
        // }
    }
    const callForDelete = (id) => {
        SetCheck(true)
        setId(id)

    }
    const callForUpdate = (id) => {
        localStorage.setItem("Itemid", JSON.stringify(id));
        history.push("/UpdateItem")
    }
    useEffect(() => {
        fetch("http://localhost:5000/api/Item/All", {
            method: "post"
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                var Length = data.length;
                Length = Length / 2
                Length = Math.ceil(Length)
                console.log(Math.ceil(Length))
                var l = 2;
                var f = 0;
                var index = 0;
                const newArray = [];
                while (index < Length) {
                    newArray[index] = data.slice(f, l)
                    index++;
                    f = f + 2;
                    l = l + 2;
                    if (l > data.length) {
                        l = data.length;
                    }
                }
                console.log(newArray)
                setArray(newArray);
                setLoading(true)
            })
    }, [])
    return (
        <>
            <div className='Full_Page_Dashboard'>
                <SideBar />
            {check === true ? <DeleteItem id={id} /> : null}
            <div className='View_Outline'>
                <div className='View_Outline_Search'>
                    <input type='text' className='View_Outline_Search_Bar' placeholder='Search By Name' onChange={SearchItemByName}></input>
                </div>
                {loading&& loading === true ?
                    array.map((res, index) => {
                        return (
                            <div className='View_Parent_Outline' key={index}>
                                {array[index] && array[index].map((res, indexInner) => {
                                    const correctUrl = "http://localhost:5000/" + res.image;
                                    console.log(correctUrl)
                                    return (
                                        <div className='View_Child_Outline' key={res._id}>
                                            <div className='View_Child_Inside'>
                                                <div className='Child_Pic'>
                                                    <img src={correctUrl} className='Only'></img>
                                                </div>
                                                <div className='Child_Name' >
                                                    {res.name}
                                                </div>
                                                <div className='Child_Des'>
                                                    {res.discription}
                                                </div>
                                                <div className='Child_Button_Outline'>
                                                    <div className="Child_button_delete" onClick={() => callForDelete(res._id)}>                                                    Delete Item
                                                    </div>
                                                    <div className='Child_button_update' onClick={() => callForUpdate(res._id)}>
                                                        Update Item
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    }) :loading===false? <div className='Loading_Main'><p className='Loading'>Loading....</p></div>:null
                }
                {loading && loading === 1 ?
                    arrayData.map((res, index) => {
                        return (
                            <div className='View_Parent_Outline' key={index}>
                                {arrayData[index] && arrayData[index].map((res, indexInner) => {
                                    const correctUrl = "http://localhost:5000/" + res.image;
                                    console.log(correctUrl)
                                    return (
                                        <div className='View_Child_Outline' key={res._id}>
                                            <div className='View_Child_Inside'>
                                                <div className='Child_Pic'>
                                                    <img src={correctUrl} className='Only'></img>
                                                </div>
                                                <div className='Child_Name' >
                                                    {res.name}
                                                </div>
                                                <div className='Child_Des'>
                                                    {res.discription}
                                                </div>
                                                <div className='Child_Button_Outline'>
                                                    <button className="Child_button_delete" onClick={() => callForDelete(res._id)}>                                                    Delete Item
                                                    </button>
                                                    <button className='Child_button_update' onClick={() => callForUpdate(res._id)}>
                                                        Update Item
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    }) :loading===2? <div className='Loading_Main'><p className='Loading'>Loading....</p></div>:null

                }
            </div>
            </div>
        </>
    )
}
