import { useEffect } from "react"

export const useClickOutside = (ref, callback, isActive = true) => {
    useEffect(()=>{

        if (!isActive) return;

        const handleClickOutside = (e) => {
            if(ref.current && !ref.current.contains(e.target)){
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref, callback, isActive]);
};