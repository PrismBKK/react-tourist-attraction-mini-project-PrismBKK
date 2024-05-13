 import React,{useState,useEffect} from "react";
 import axios from "axios";
 
 export default function Blogpost(){
    const [posts,setPosts]=useState([]);
    const [searchTerm,setSearchTerm]=useState('');

    useEffect(()=>{
        fetchPosts();
    },[searchTerm])

    const fetchPosts = async()=>{
        try{
            const response = await axios.get(`http://localhost:4001/trips?keywords=${searchTerm}`);
            console.log("Response data:", response.data);
            if (Array.isArray(response)) {
                setPosts(response.data.data);} 
                else if (response.data && typeof response.data === 'object') {
                    setPosts([response.data.data]);
                } else {
                    console.error("Unexpected response format:", response.data);
                }
        }catch(e){
            console.error('Error fetching trips:', error);
        }
    };

    return (
        <section className="flex flex-col mt-10">
            <div className="mx-96">
                <p>ค้นหาทีเที่ยว</p>
                <section className="flex flex-col items-center w-full">
                    <input
                    id="SearchInput"
                    type="text"
                    placeholder="หาที่เที่ยวแล้วไปกัน...."
                    value={searchTerm}
                    onChange={e=>{
                        setSearchTerm(e.target.value);
                        console.log(e)
                    }}
                    className="w-full text-center border-b"
                    />
                </section>
            </div>
            
            
            <div className="flex flex-col gap-7 mt-10 items-center">
                {posts.map((postArray) =>
                postArray.map((post, index) => (
                    <section key={index} className="flex flex-row gap-4">
                        <img 
                        src={post.photos[0]}
                        width="250"
                        height="250"
                        className="rounded-2xl"
                        />
                        <section className="flex flex-col gap-2">
                            <p className="font-black">{post.title}</p>
                            <p className="max-w-100ch whitespace-nowrap overflow-hidden text-ellipsis w-4/6">{post.description}</p>
                            <a className="underline underline-offset-1 text-blue-400 w-fit" href={post.url} target="_blank">อ่านต่อ</a>
                            <section className="flex flex-row gap-2">
                                <p>หมวด</p>
                                {post.tags.map((text)=>{
                                    return(
                                    <p id="TagElememt" className="underline underline-offset-1 text-slate-500">
                                        {text}
                                    </p>)
                                })}
                            </section>
                            <section className="flex flex-row gap-2">
                                {post.photos.slice(1).map((photo)=>{
                                    return(
                                        <img
                                        src={photo}
                                        width="100"
                                        height="100"
                                        className="rounded-2xl"
                                        />
                                    )
                                })}
                            </section>
                        </section>
                        <button onClick={()=>{navigator.clipboard.writeText(post.url)}} className="border-2 border-cyan-500 h-fit rounded-2xl p-1">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" fill="rgb(8 145 178)">
                            <path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z"/>
                        </svg>
                        </button>
                    
                </section>
            ))
        )}
        </div>
        
        </section>
    );
    
};