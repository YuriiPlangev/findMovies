function PremierMovie ({item, onClick}) {
    
    if (!item) return null; 

    return (
        <>
        <article onClick={onClick} className="max-w-[170px] h-[320px] relative cursor-pointer">
                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} className="w-[170px] h-full object-cover rounded-lg mb-[17px]" />            
        </article>
        <h3 className="text-center text-white mt-[20px] pr-7">{item.title || item.name }</h3>
    </>
        
    )

}
export default PremierMovie