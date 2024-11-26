import React from "react";
import { Link } from "react-router-dom";


const HorizontalCards = ({data}) => {
  return (
      <div className="w-full flex  overflow-y-hidden mb-5 p-5 ">
         {data.length > 0 ? data.map((d, i)=> (
            <Link 
               to={`/${d.media_type}/details/${d.id}`} 
               key={i} 
               className="min-w-[15%] h-[40vh] bg-zinc-900 mr-5 mb-5"
            >
            <img 
               className="w-full h-[55%] object-cover"
                src={`https://image.tmdb.org/t/p/original${
                      d.backdrop_path || d.poster_path
                     }`} 
            alt="" />
            <div className="text-white p-3 h-[45%] overflow-y-auto">
            <h1 className="text-l font-semibold">
                {d.title || d.name || d.original_name || d.original_title}
            </h1>
            <p className="overflow-hidden text-sm ">
                {d.overview.slice(0, 20)}...
                <span className="text-zinc-500">more</span>
            </p>
            </div>
         </Link>
         )): <h1 className="text-3xl mt-5 font-black text-center">Nothing  to show</h1>}
      </div>
  );
};

export default HorizontalCards;
