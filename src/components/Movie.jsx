import StarIcon from "../assets/icon/StarIcon";


function Movie ({item, onClick}) {
    
    if (!item) return null; 

    return (
        <>
        <article onClick={onClick} className="max-w-[170px] h-[320px] relative cursor-pointer">
                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} className="w-[170px] h-full object-cover rounded-lg" />            
            <div className="bg-black h-[44px] w-[] absolute top-69 p-2 flex gap-1 text-white rounded-tr-lg">
                <StarIcon />
                <span>{item.vote_average.toFixed(1)}</span>
            </div>
            <h3 className="text-center text-white mt-[8px] pr-7">{item.title || item.name}</h3>
        </article>
    </>
        
    )

}
export default Movie