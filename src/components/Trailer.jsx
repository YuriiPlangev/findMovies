import { useDispatch, useSelector } from "react-redux";
import { fetchTrailer } from "../redux/trailerSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";



function Trailer({ id, type }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { trailer, status } = useSelector((state) => state.trailer);
    const [showTrailer, setShowTrailer] = useState(false);
    const [hasTrailer, setHasTrailer] = useState(false);

    useEffect(() => {
        const loadTrailer = async () => {
            const result = await dispatch(fetchTrailer({ id, type }));
            if (result.payload?.length > 0) {
                setHasTrailer(true);
            }
        };
        loadTrailer();
    }, [dispatch, id, type]);

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
            {hasTrailer && (
                <button
                    onClick={handleGetTrailer}
                    className="text-white cursor-pointer active:scale-[0.9] border-[#FDD835] border-1 rounded-lg py-2 px-3 mt-2 inline-flex items-center gap-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    {t("watch_trailer")}
                </button>
            )}

            {showTrailer && (
                <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.9)] bg-opacity-30 z-100">
                    <div className="bg-[#FDD835] p-[2px] rounded-lg relative w-[80%] max-w-2xl">
                        <button
                            onClick={closeModal}
                            className="absolute top-[-10px] right-[-150px] text-[35px] hover:text-[#FDD835] text-white"
                        >
                            ✖
                        </button>

                        {status === "succeeded" && trailer.length > 0 ? (
                            <iframe
                                className="rounded-lg"
                                width="100%"
                                height="400"
                                src={`https://www.youtube.com/embed/${trailer[0].key}`}
                                title="Trailer"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <p className="text-center">{t("loading_trailer")}</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Trailer;
