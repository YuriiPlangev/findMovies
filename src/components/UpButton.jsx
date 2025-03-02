function UpButton() {
    const handleScroll = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <div className="fixed bottom-4 right-4 z-50 cursor-pointer" onClick={handleScroll}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>            
        </div>
    )
}    
export default UpButton