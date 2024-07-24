import { useEffect, useState } from "react"

export default function useUserAgent() {
    const [device, setDevice] = useState(null)

    useEffect(() => {
        const detectDevice = () => {
            const userAgent = navigator.userAgent.toLowerCase()
            const isMac = /macintosh|mac os x/.test(userAgent)
            const isWindows = /windows/.test(userAgent)

            if (isMac) {
                setDevice('mac')
            } else if (isWindows) {
                setDevice('windows')
            } else {
                setDevice('unknown')
            }
        }
        detectDevice();
        window.addEventListener('resize', detectDevice);

        return () => window.removeEventListener('resize', detectDevice);
    }, [])

    return device
}
