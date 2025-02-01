function PremierMovie ({item}) {
    
    if (!item) return null; 

    return (
        <>
        <article className="max-w-[170px] h-[320px] relative">
                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} className="w-[170px] h-full object-cover rounded-lg mb-[17px]" />            
        </article>
        <h3 className="text-center text-white mt-[20px]">{item.title}</h3>
    </>
        
    )

}
export default PremierMovie