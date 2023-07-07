import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';


export default function DeleteItem(props) {
    const history=useHistory();
    const [check,setCheck]=useState("Are You Sure You Want To Delete This")

    const Delete = async (id) => {
        const Response=await fetch("http://localhost:5000/api/Item/Delete/"+id,{
            method:"put",
            body:id
        })
        console.log(id)
        setCheck("Deleted")
        document.getElementsByClassName("Button_Bar")[0].style.display="none";
        setTimeout(() => {
            window.location.reload() 
        }, 2000);

       
    }


    const Cancel=()=>{
        document.getElementsByClassName("Delete_Outline")[0].style.display="none";
        document.getElementsByClassName("Delete_Outline1")[0].style.display="none";
        history.push('/ViewItem')
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
