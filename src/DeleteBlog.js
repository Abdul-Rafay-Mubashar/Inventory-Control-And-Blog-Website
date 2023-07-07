import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';


export default function DeleteBlog(props) {
    console.log(props.id)
    const history=useHistory();
    const [check,setCheck]=useState("Are You Sure You Want To Delete This")


    const DeleteForBlog = async (id) => {
        console.log(id)
        const Response=await fetch("http://localhost:5000/api/Blog/Delete/"+id,{
            method:"put",
            // headers:{
            //     "Content-Type":"application/json"
            // },
            body:JSON.stringify(id)
        })
        console.log(id)
        setCheck("Deleted")
        document.getElementsByClassName("Button_Bar")[0].style.display="none";
        // setTimeout(()=>{
        //     window.location.reload()
        // },2000)
       
    }
    const DeleteForHeading = async (id) => {
        console.log(id)
        const Response=await fetch("http://localhost:5000/api/Heading/Delete/"+id,{
            method:"put",
            // headers:{
            //     "Content-Type":"application/json"
            // },
            body:JSON.stringify(id)
        })
        console.log(id)
        setCheck("Deleted")
        document.getElementsByClassName("Button_Bar")[0].style.display="none";
        // setTimeout(()=>{
        //     window.location.reload()
        // },2000)
       
    }
    const DeleteForPara = async (id) => {
        console.log(id)
        const Response=await fetch("http://localhost:5000/api/Para/Delete/"+id,{
            method:"put",
            // headers:{
            //     "Content-Type":"application/json"
            // },
            body:JSON.stringify(id)
        })
        console.log(id)
        setCheck("Deleted")
        document.getElementsByClassName("Button_Bar")[0].style.display="none";
        // setTimeout(()=>{
        //     window.location.reload()
        // },2000)
       
    }

    const DeleteForSubs= async (id) => {
        console.log(id)
        const Response=await fetch("http://localhost:5000/api/Sub/Delete/"+id,{
            method:"put",
            // headers:{
            //     "Content-Type":"application/json"
            // },
            body:JSON.stringify(id)
        })
        console.log(id)
        setCheck("Deleted")

        document.getElementsByClassName("Button_Bar")[0].style.display="none";
        setTimeout(()=>{
            document.getElementsByClassName("Delete_Outline")[0].style.display="none";
            document.getElementsByClassName("Delete_Outline1")[0].style.display="none";
            // history.push('/Dashboard')
            // history.push('/ViewBlog')

            // window.location.reload()

        },2000)
        setTimeout(() => {
            window.location.reload() 
        }, 2000);
        

       
    }
    const Delete=async(id)=>{
        DeleteForBlog(id)
        DeleteForHeading(id)
        DeleteForPara(id)
        DeleteForSubs(id)

    }
    const Cancel=()=>{
        document.getElementsByClassName("Delete_Outline")[0].style.display="none";
        document.getElementsByClassName("Delete_Outline1")[0].style.display="none";
        history.push('/ViewBlog')
        window.location.reload();


    }
    return (
        <>
            <div className='Delete_Outline'>

            </div>
            <div className='Delete_Outline1'>
                <div className='Delete_Alert_Outline'>
                    <div className='Delete_Alert_Top'>

                    </div>
                    <div className='Delete_Alert_Msg'>
                        {check}
                    </div>
                    <div className='Button_Bar'>
                        <div className="Delete_button_delete"  onClick={Cancel}>      
                           Cancel
                        </div>
                        <div className='Cancel_button_update' onClick={()=>Delete(props.id)}>
                            Delete Item
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
