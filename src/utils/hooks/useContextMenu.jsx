import { useState, useEffect } from "react";

export default function useContextMenu() {
    const [points, setPoints] = useState({ x: 0, y: 0 });
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const handleClick = () => setShowMenu(false);
        document.addEventListener("click", handleClick);
        return () => {
          document.removeEventListener("click", handleClick);
        };
      }, []);
    return { points, setPoints, showMenu, setShowMenu }
}
