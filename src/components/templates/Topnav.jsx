import axios from "../../utils/axios";
import React, { useState, useEffect } from 'react';
import { Link, useViewTransitionState } from 'react-router-dom';
import noimage from '/noimage.jpg';
import { useAuth0 } from "@auth0/auth0-react";

const Topnav = () => {
    const [query, setquery] = useState("");
    const [searches, setsearches] = useState([]);
    const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  

    const GetSerches = async() => {
        try{
            const {data} = await axios.get(`/search/multi?query=${query}`);
            setsearches(data.results);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    useEffect(() =>{
        GetSerches();
    }, [query]);

  return (
    <div className="w-[80%] h-[12vh] relative flex mx-auto items-center">
    <i className="text-zinc-400 text-3xl ri-search-line"></i>
    <input
       onChange={(e) => setquery(e.target.value)}
       value={query}
       className="w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent " 
       type="text" placeholder="search anything" 
    
    />
    {query.length > 0 && (
        <i 
           onClick={() => setquery("")} 
           className="text-zinc-400 text-3xl ri-close-fill right-0"
        >
        </i>
    )}
   

    <div className="z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] left-[8%] overflow-auto">
    {searches.map((s, i)=>(
        <Link 
           to={`/${s.media_type}/details/${s.id}`}
           key={i} 
           className=" hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] 
           p-10 flex justify-start items-center border-b-2 border-zinc-100"
        >
            <img 
            className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
            src={
                s.backdrop_path ||
                s.profile_path ? `https://image.tmdb.org/t/p/original/${
                     s.backdrop_path || s.profile_path
                     }` : noimage
            } 
            alt="" 
            />
            <span>{s.name || s.title || s.original_name || s.original_title}</span>
       </Link>
       ))}
    </div>

    <div>{isAuthenticated && <p>{user.name}</p>}</div>
    

    {isAuthenticated ? (
    <div className="bg-[#6556CD] rounded text-white hover:bg-[orange]">
    <button className="bg-color-[b]" 
     onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
    </div>
    ) : (
    <div className="bg-[#6556CD] rounded text-white hover:bg-[orange]">
         <button onClick={() => loginWithRedirect()}>Log In</button>
    </div> 
    )}
    
    </div>
  );
};

export default Topnav;
