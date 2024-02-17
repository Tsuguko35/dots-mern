import { useEffect, useState } from "react";


export const GetWindowWidth = () =>{
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
        };
        

        window.addEventListener('resize', handleWindowResize);

        return () => {
        window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return windowWidth
}