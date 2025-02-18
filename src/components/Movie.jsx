

function Movie ({item, categories, onClick}) {
    
    if (!item) return null; 

    return (
        <>
        <article onClick={onClick} className="max-w-[170px] h-[320px] relative cursor-pointer">
                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} className="w-[170px] h-full object-cover rounded-lg" />            
            <div className="bg-black h-[44px] w-[] absolute top-69 p-2 flex gap-1 text-white rounded-tr-lg">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
<rect width="20" height="20" fill="#1E1E1E"/>
<g id="Find Movies - Home Page" clipPath="url(#clip0_0_1)">
<rect width="1440" height="1133" transform="translate(-136 -505)" fill="black"/>
<g id="Movie - cover">
<rect id="Rectangle 11" x="-8" y="-226" width="171" height="258" rx="8" fill="url(#pattern0_0_1)"/>
<rect id="Rectangle 13" x="-8" y="-226" width="171" height="258" rx="8" fill="black" fillOpacity="0.24"/>
<g id="Frame 1">
<rect width="69" height="44" transform="translate(-8 -12)" fill="black"/>
<g id="Group 10">
<g id="Frame 49">
<g id="material-symbols:star-rounded">
<path id="Vector" d="M10.3765 15.4042L6.31609 17.8502C6.13672 17.9643 5.94919 18.0132 5.75351 17.9969C5.55783 17.9806 5.38661 17.9154 5.23985 17.8013C5.09308 17.6871 4.97894 17.5446 4.8974 17.3737C4.81587 17.2022 4.79956 17.0104 4.84848 16.7984L5.92473 12.1754L2.32909 9.06899C2.16602 8.92222 2.06426 8.75492 2.02382 8.56706C1.98273 8.37986 1.9948 8.19657 2.06002 8.0172C2.12525 7.83782 2.22309 7.69106 2.35355 7.57692C2.484 7.46277 2.66338 7.38939 2.89167 7.35677L7.63694 6.94095L9.47145 2.58704C9.55299 2.39136 9.67953 2.2446 9.85107 2.14676C10.022 2.04892 10.1971 2 10.3765 2C10.5559 2 10.7313 2.04892 10.9029 2.14676C11.0738 2.2446 11.2 2.39136 11.2815 2.58704L13.116 6.94095L17.8613 7.35677C18.0896 7.38939 18.269 7.46277 18.3994 7.57692C18.5299 7.69106 18.6277 7.83782 18.6929 8.0172C18.7582 8.19657 18.7706 8.37986 18.7301 8.56706C18.689 8.75492 18.5869 8.92222 18.4239 9.06899L14.8282 12.1754L15.9045 16.7984C15.9534 17.0104 15.9371 17.2022 15.8556 17.3737C15.774 17.5446 15.6599 17.6871 15.5131 17.8013C15.3664 17.9154 15.1951 17.9806 14.9994 17.9969C14.8038 18.0132 14.6162 17.9643 14.4369 17.8502L10.3765 15.4042Z" fill="url(#paint0_linear_0_1)"/>
</g>
</g>
</g>
</g>
</g>
</g>
<defs>
<pattern id="pattern0_0_1" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlinkHref="#image0_0_1" transform="matrix(0.00209552 0 0 0.00138889 -0.00292398 0)"/>
</pattern>
<linearGradient id="paint0_linear_0_1" x1="2" y1="2" x2="20.0632" y2="18.0337" gradientUnits="userSpaceOnUse">
<stop stopColor="#FFEE58"/>
<stop offset="1" stopColor="#FF8F00"/>
</linearGradient>
<clipPath id="clip0_0_1">
<rect width="1440" height="1133" fill="white" transform="translate(-136 -505)"/>
</clipPath>

</defs>
                </svg>
                <span>{item.vote_average.toFixed(1)}</span>
            </div>
            <h3 className="text-center text-white mt-[8px] pr-7">{item.title || item.name}</h3>
        </article>
    </>
        
    )

}
export default Movie