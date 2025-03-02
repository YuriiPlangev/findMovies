import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useGetVideoQuery } from "../redux/movieApi"; 
import PlayIcon from "../assets/icon/PlayIcon";

function Trailer({ id, type }) {
    const { t } = useTranslation();
    const [showTrailer, setShowTrailer] = useState(false);

    const { data, isLoading } = useGetVideoQuery({ id, type }, { skip: !id });
    const trailer = data?.results?.find(video => video.type === "Trailer" && video.site === "YouTube");


    const handleGetTrailer = () => {
        setShowTrailer(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const closeModal = () => setShowTrailer(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") closeModal();
        };

        if (showTrailer) {
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [showTrailer]);

    return (
        <>
            {trailer && (
                <button onClick={handleGetTrailer} className="text-white cursor-pointer active:scale-[0.9] border-[#FDD835] border-1 rounded-lg py-2 px-3 mt-2 inline-flex items-center gap-2">
                    <PlayIcon />
                    {t("watch_trailer")}
                </button>
            )}

            {showTrailer && (
                <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.9)] bg-opacity-30 z-100">
                    <div className="bg-[#FDD835] p-[2px] rounded-lg relative w-[80%] max-w-2xl">
                        <button onClick={closeModal} className="absolute top-[-10px] right-[-150px] text-[35px] hover:text-[#FDD835] text-white">
                            ✖
                        </button>

                        {isLoading ? (
                            <p className="text-center">{t("loading_trailer")}</p>
                        ) : (
                            <iframe
                                className="rounded-lg"
                                width="100%"
                                height="400"
                                src={`https://www.youtube.com/embed/${trailer?.key}`}
                                title="Trailer"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Trailer;
