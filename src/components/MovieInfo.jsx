function MovieInfo () {
    const info =["Director", "Screenplay", "Stars", "Countries of Origin", "Release date"]
    
    return (
        <div className="flex flex-col gap-3 mt-4">
            {
                info.map((item) => (
                    <p key={item}className="text-[#F5F5F5] opacity-60">
                        {item}:
                    </p>
                ))
            }
        </div>
    )

}
export default MovieInfo
