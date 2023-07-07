import React from 'react'

export default function Welcome() {
    const Data=localStorage.getItem("User")
    const DataAsJson=JSON.parse(Data)
  return (
    <div className='Welcome_Outline'>
      Welcome {DataAsJson.name}
    </div>
  )
}
