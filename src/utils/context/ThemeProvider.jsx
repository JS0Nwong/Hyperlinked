import { createContext, useEffect, useState, useContext } from 'react'

const ThemeContext = createContext()

export function useTheme() { return useContext(ThemeContext) }

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false)
    const darkCodeTheme = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16/dracula.min.css'
    const lightCodedTheme = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs.min.css'
    const toggleTheme = () => { setDarkMode((prev) => !prev) }

    useEffect(() => {
        const localTheme = localStorage.getItem('theme')
        if (!localTheme) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')) {
                setDarkMode(true)
            }
        } else {
            setDarkMode(localTheme === 'dark')
        }
    }, [])
    
    useEffect(() => {
        document.documentElement.className = darkMode ? 'dark' : 'light'
        localStorage.setItem('theme', darkMode ? 'dark' : 'light')
        const head = document.head
        let link = document.createElement('link')
        link.rel = 'stylesheet'
        link.type = 'text/css'
        link.href = darkMode ? darkCodeTheme : lightCodedTheme
        head.appendChild(link)
        return () => { head.removeChild(link) }
    }, [darkMode])

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
export default ThemeContext