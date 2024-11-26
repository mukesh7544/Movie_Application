import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { asyncloadmovie, removemovie } from '../store/actions/movieActions';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import HorizontalCards from "./templates/HorizontalCards"
import Loading from "./Loading";  


const Moviedetails = () => {
  const {pathname} = useLocation(); 
  const navigate = useNavigate();
  const {id} = useParams();
  const {info} = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);
  return info ? (
       <div 
        style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
                     info.detail.backdrop_path
                     })`,
                     backgroundPosition: "center",
                     backgroundSize: "cover",
                     backgroundRepeat: "no-repeat",
        }} className="relative w-screen h-[188vh] px-[10%] ">

          {/*Part 1 navigation */}
         <nav className="w-full h-[10vh] text-zinc-100 flex items-center gap-10 font-2 text-2xl ">
         <Link 
            onClick={()=> navigate(-1)} 
            className="hover:text-[#6556CD] ri-arrow-left-line">
            </Link>

            <a target="_blank" href={info.detail.homepage}>
               <i className="hover:text-[#6556CD] ri-external-link-fill"></i>
            </a>
            <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
               <i className="hover:text-zinc-200 ri-earth-fill"></i>
            </a>
            <a target="_blank" href={`https://www.imdb.com/title/${info.externalid.imdb}/`} >IMDB</a> {/*jo koi bhi movies or tv k liye us movie k launch site ka link se yaha sctivate kiye hai*/}
         </nav> 
         

         {/*Part 2 Poster and Details Or it a movies image after searching details about the any movie*/}
         <div className="w-full flex ">
         <img 
                  className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] object-cover" 
                  src={`https://image.tmdb.org/t/p/original/${
                     info.detail.poster_path || info.detail.backdrop_path
                     }`}
                     alt="" 
                />

                <div className="content ml-[5%] text-white">
                  <h1 className="text-5xl font-black">
                  {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}

                  <small className="text-2xl font-bold text-zinc-200">
                    ({info.detail.release_date.split("-")[0]}) 
                  </small>
                  </h1>

                    <div className="mt-3 mb-5 flex items-center gap-x-3">
                    <span className="rounded-full text-xl font-semibold
                     bg-yellow-600 text-white w-[6vh] h-[6vh] flex justify-center items-center ">
                       {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
                     </span> 
                     <h1 className="font-semibold text-2xl w-[60px] leading-6 ">Users Score</h1>
                     <h1>{info.detail.release_date}</h1>
                     <h1>{info.detail.genres.map((g) => g.name).join(", ")} </h1>
                     <h1>{info.detail.runtime}min</h1>
                    </div>

                    <h1 className="text-2xl font-semibold italic text-zinc-200">
                    {info.detail.tagline} 
                    </h1>

                    <h1 className="text-xl mb-3 mt-5">Overview</h1>
                    <p>{info.detail.overview} </p>
                    
                    <h1 className="text-xl mb-3 mt-5"> Movies Translated</h1>
                    <p className="mb-10">{info.translations.join(" ")} </p>

                    <Link className="p-5 rounded-lg bg-[#6556CD] hover:text-zinc-400" to={`${pathname}/trailer`}>
                       <i class="text-xl ri-play-fill mr-3"></i>
                        Play Trailer
                    </Link>
                </div>
         </div>


          {/*Part 3 Available on Platforms*/}
         <div className="w-[80%] flex flex-col gap-y-5 mt-10 ">
                {info.watchproviders && info.watchproviders.flatrate && (
                        <div className="flex gap-x-10 items-center text-white ">
                        <h1>Available On Platforms</h1>
                       { info.watchproviders.flatrate.map((w,i) => (
                          <img
                             key={i}
                             title={w.provider_name}
                             className="w-[5vh] h-[5vh] rounded-md " 
                             src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                             alt=""
                          />
                     ))} 
                  </div>
                 )}

                     {info.watchproviders && info.watchproviders.rent && (
                        <div className="flex gap-x-10 items-center text-white ">
                        <h1>Available On Rent</h1>
                       { info.watchproviders.rent.map((w,i) => (
                          <img 
                           key={i}
                             title={w.provider_name}
                             className="w-[5vh] h-[5vh] rounded-md " 
                             src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                             alt=""
                          />
                     ))} 
                  </div>
                 )}


                 {info.watchproviders && info.watchproviders.buy && (
                        <div className="flex gap-x-10 items-center text-white ">
                        <h1>Available To Buy</h1>
                       { info.watchproviders.buy.map((w,i) => (
                          <img
                             key={i}
                             title={w.provider_name}
                             className="w-[5vh] h-[5vh] rounded-md " 
                             src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                             alt=""
                          />
                     ))} 
                  </div>
                 )}
         </div>

         {/* Part-4  Recommendations and Platform*/}\
         <hr className="mt-3 mb-3 border-none h-[2px] bg-zinc-500 "/>
         <h1 className="text-3xl font-bold text-white">
         Recommendations & Similar Stuff
         </h1>
         <HorizontalCards 
              data= {
                 info.recommendations.length > 0 ? info.recommendations : info.similar}
                 />
         <Outlet/>
   </div>
  ): (
      <Loading/>
   );
};

export default Moviedetails;
