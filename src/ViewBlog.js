import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';
import DeleteBlog from './DeleteBlog';
import SideBar from './SideBar';

export default function ViewBlog() {
    const [Heading, setHeadings] = useState([]);
    const [Image, setImageArray] = useState([]);
    const [ForMerge, setForMerge] = useState([]);
    const [Array, setArray] = useState([]);

    const [Check, setCheck] = useState(false);
    const [id, setId] = useState(null);
    const [Click, setClick] = useState(false);
    const history = useHistory()

    useEffect(() => {
        console.log("Ok")
        var result = localStorage.getItem('User');
        var resultAsJson = JSON.parse(result);
        if (resultAsJson == null) {
            history.push('/');

          
        }
      }, []);
    const SearchItemByName = (event) => {
        var Search = {
            search: event.target.value
        }
        console.log(Search.search)
        fetch("http://localhost:5000/api/Heading/Search", {
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
                console.log(Image)
                var arr = data;
                console.log(arr)
                if (arr.length > 0 && Image.length > 0) {
                    const mergedArray = arr.map((obj1) => {
                        const matchingObj2 = Image.find((obj2) => obj2.blog_id === obj1.blog_id);
                        return { ...obj1, ...matchingObj2 };

                    });
                    const Length = Math.ceil(mergedArray.length / 2);
                    const newArray = [];
                    let f = 0;
                    let l = 2;

                    for (let index = 0; index < Length; index++) {
                        newArray[index] = mergedArray.slice(f, l);
                        f += 2;
                        l += 2;
                        if (l > mergedArray.length) {
                            l = mergedArray.length;
                        }
                    }
                    setArray(newArray)
                    console.log(Array)
                    setCheck(1)
                }
            })
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/Blog/Simple/Image/GetAll');
                const imageArray = await response.json();
                setImageArray(imageArray);
                console.log(imageArray)
                fetch('http://localhost:5000/api/Heading/GetAll')
                    .then((res) => res.json())
                    .then((data) => {
                        setForMerge(data);
                        setCheck(true);
                        console.log(data)
                    });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log(Check,ForMerge)
        if (Check && ForMerge.length > 0 && Image.length > 0) {
            const mergedArray = ForMerge.map((obj1) => {
                const matchingObj2 = Image.find((obj2) => obj2.blog_id === obj1.blog_id);
                return { ...obj1, ...matchingObj2 };
            });
            console.log(mergedArray)
            const Length = Math.ceil(mergedArray.length / 2);
            const newArray = [];
            let f = 0;
            let l = 2;

            for (let index = 0; index < Length; index++) {
                newArray[index] = mergedArray.slice(f, l);
                f += 2;
                l += 2;
                if (l > mergedArray.length) {
                    l = mergedArray.length;
                }
            }

            setHeadings(newArray);
            console.log(Heading)
        }
    }, [Check, ForMerge, Image]);

    const prop_send = (id) => {
        setId(id);
        setClick(true);
    };

    return (
        <>
            <div className='Full_Page_Dashboard'>
                <SideBar />
                <div className="ViewBlog_OutLine">
                    <div className="ViewBlog_Outline_Search">
                        <input type='text' className='View_Outline_Search_Bar' placeholder='Search By Name' onChange={SearchItemByName}>

                        </input>
                    </div>
                    {Check === true ?
                        Heading.map((res, headingIndex) => (
                            <div key={headingIndex} className="Blog_Container">
                                {res.map((data, dataIndex) => (
                                    <div key={dataIndex} className="Blog_Container_Part1">
                                        <div className="Edit_Delete_View">
                                            <div className="Buttons_Edit_Delete_View" onClick={() => prop_send(res[dataIndex].blog_id)}>
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdK-OVUv3wRwzOXvRqZogb--M8Jh6un3V2nA&usqp=CAU" alt="pic" className="Img_Edit_Delete_View" />
                                            </div>

                                        </div>
                                        <Link
                                            to="/ViewSpecificBlog"
                                            onClick={() => {
                                                localStorage.setItem('Blog_Id', JSON.stringify(data.blog_id));
                                            }}
                                            className="Blog_Outline"
                                        >
                                            <img src={"http://localhost:5000/" + data.image} alt="pic" className="View_Blog_Pic" />
                                            <div className="Blog_Heading">
                                                <div className="Headoing_B">{data.heading}</div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )) : Check === false ? <div className='Loading_Main'><p className='Loading'>Loading....</p></div> : null
                    }
                    {Check === 1 ?
                        Array.map((res, headingIndex) => (
                            <div key={headingIndex} className="Blog_Container">
                                {res.map((data, dataIndex) => (
                                    <div key={dataIndex} className="Blog_Container_Part1">
                                        <div className="Edit_Delete_View">
                                            <div className="Buttons_Edit_Delete_View" onClick={() => prop_send(res[dataIndex].blog_id)}>
                                                <img src="" alt="pic" className="Img_Edit_Delete_View" />
                                            </div>
                                            <div className="Buttons_Edit_Delete_View">
                                                <img src="" alt="pic" className="Img_Edit_Delete_View" />
                                            </div>
                                            <div className="Buttons_Edit_Delete_View">
                                                <img src="" alt="pic" className="Img_Edit_Delete_View" />
                                            </div>
                                        </div>
                                        <Link
                                            to="/ViewSpecificBlog"
                                            onClick={() => {
                                                localStorage.setItem('Blog_Id', JSON.stringify(data.blog_id));
                                            }}
                                            className="Blog_Outline"
                                        >
                                            <img src={"http://localhost:5000/" + data.image} alt="pic" className="View_Blog_Pic" />
                                            <div className="Blog_Heading">
                                                <div className="Headoing_B">{data.heading}</div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )) : Check === 2 ? <div className='Loading_Main'><p className='Loading'>Loading....</p></div> : null

                    }
                </div>
                {Click && <DeleteBlog id={id} />}
            </div>
        </>
    );
}