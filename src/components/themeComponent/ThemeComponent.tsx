import {useEffect, useState} from "react";
import {Moon, Sun} from "lucide-react";
import styles from "./styles.module.scss"

const ThemeComponent = () => {
    const themeFromStorage = localStorage.getItem("theme") || "light";

    const [theme, setTheme] = useState(themeFromStorage);

    const light = "light"
    const dark = "dark"

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === light ? dark : light;
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };
    return (
        <button data-testid="theme-button" onClick={toggleTheme} type="button">
            {theme === light ? <Moon className={styles.form__moon}/> : <Sun className={styles.form__sun}/>}
        </button>
    );
};

export default ThemeComponent;