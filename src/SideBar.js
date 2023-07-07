import React from 'react'
import { useHistory } from 'react-router-dom';

import Welcome from './Welcome'
import { Link } from 'react-router-dom';


export default function SideBar() {
    const history = useHistory()

    const Slider=()=>{
        var first=0;
        document.getElementsByClassName("Mobile_SideBar_Outline_For_Bar")[0].style.display="flex";
        var Intervel=setInterval(() => {
            document.getElementsByClassName("Mobile_SideBar_Outline_For_Bar")[0].style.width=first+"%";
            first=first+2
            if(first===72)
            {
                clearInterval(Intervel)
            }
        }, 1);
    }
    const SliderBack=()=>{
        var first=70;
        var Intervel=setInterval(() => {
            document.getElementsByClassName("Mobile_SideBar_Outline_For_Bar")[0].style.width=first+"%";
            first=first-2
            if(first===0)
            {
                document.getElementsByClassName("Mobile_SideBar_Outline_For_Bar")[0].style.display="none";
                clearInterval(Intervel)
            }
        }, 1);
    }
    const Blog_Formation = async () => {
        const Response = await fetch("http://localhost:5000/api/Blog/Add", {
            method: 'post'
        })
        const Json_Response = await Response.json()
        console.log(Json_Response._id)
        localStorage.setItem("ID", JSON.stringify(Json_Response._id))
    }
    const LogOut=()=>{
        localStorage.clear()
        // history.push("/")
    }
    return (
        <>
            <div className='SideBar_Outline'>
                <div className='SideBar_Main'>
                    <div className='Pic_Frame'>
                        <div className='Pic_Div'>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRMAu236nSTdB6gGu-7Zxdxi2h1y5Lavrpc6e3wGybd8izItpws6wOMA2GzZUgcF71elU&usqp=CAU' alt='pic' className='Pic_Logo'></img>
                        </div>
                    </div>
                    <div className='SideBar_OptionBar_Outline'>
                        <div className='SideBar_Option_Box'>
                            <div className='Option_TextBox'>
                                <div className='Option_Img'>
                                    <img src='https://cdn-icons-png.flaticon.com/512/5481/5481993.png' className='Img_Option' alt='Pic'></img>
                                </div>
                                <Link to="/AddBlog" className='Option_Text' onClick={Blog_Formation}>
                                    Add Blog
                                </Link>
                            </div>
                        </div>
                        <div className='SideBar_Option_Box'>
                            <div className='Option_TextBox'>
                                <div className='Option_Img'>
                                    <img src='https://png.pngtree.com/png-vector/20190116/ourmid/pngtree-vector-writing-icon-png-image_322035.jpg' className='Img_Option' alt='Pic'></img>
                                </div>
                                <Link to="ViewBlog" className='Option_Text'>
                                    View Blog
                                </Link>
                            </div>
                        </div>
                        <div className='SideBar_Option_Box'>
                            <div className='Option_TextBox'>
                                <div className='Option_Img'>
                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVUlqCtI1EqLkv0Tt2MyIo3qdZgJl9aPsn1Q&usqp=CAU' className='Img_Option' alt='Pic'></img>
                                </div>
                                <Link to="/AddItems" className='Option_Text'>
                                    Add Items
                                </Link>
                            </div>
                        </div>
                        <div className='SideBar_Option_Box'>
                            <div className='Option_TextBox'>
                                <div className='Option_Img'>
                                    <img src='https://cdn-icons-png.flaticon.com/512/5481/5481993.png' className='Img_Option' alt='Pic'></img>
                                </div>
                                <Link to="/ViewItem" className='Option_Text'>
                                    View Items
                                </Link>
                            </div>
                        </div>
                        <div className='SideBar_Option_Box_LogOut'>
                            <div className='Option_TextBox'>
                                <div className='Option_Img'>
                                    <img src='https://cdn-icons-png.flaticon.com/512/5481/5481993.png' className='Img_Option' alt='Pic'></img>
                                </div>
                                <Link to="/" className='Option_Text' onClick={LogOut}>
                                    LogOut
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='Mobile_SideBar_Outline'>
                <div className='Mobile_SideBar'>
                    <button className='Mobile_SideBar_Button'>
                        <img src='https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/menu-bar-1.png' className='Mobile_SideBar_Button_Img'onClick={Slider}></img>
                    </button>
                </div>
            </div>
            <div className='Mobile_SideBar_Outline_For_Bar'>
                <div className='Mobile_SideBar_Outline_For_Bar_Inside'>
                    <div className='Mobile_SideBar_Outline_Component_Exit'>
                        <div className='Mobile_SideBar_Button'>
                            <img src='https://img.freepik.com/free-icon/cancel_318-926072.jpg?w=2000' className='Mobile_SideBar_Button_Img' onClick={SliderBack}>

                            </img>
                        </div>
                    </div>
                    <Link to="/AddBlog" className='Mobile_SideBar_Outline_Component'>
                        Add Blog
                    </Link>
                    <Link to="/ViewBlog" className='Mobile_SideBar_Outline_Component' onClick={Blog_Formation}>
                        View Blog
                    </Link>
                    <Link to="/AddItems" className='Mobile_SideBar_Outline_Component'>
                        Add Items
                    </Link>
                    <Link to="/ViewItem" className='Mobile_SideBar_Outline_Component'>
                        View Items
                    </Link>
                    <Link to="/Login" className='Mobile_SideBar_Outline_Component_LogOut' onClick={LogOut}>
                        LogOut
                    </Link>
                </div>
            </div>
        </>
    )
}
