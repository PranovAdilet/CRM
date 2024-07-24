import {useEffect, useState} from "react";
import styles from "./styles.module.scss"

const ThemeComponent = () => {
    const light = "light"
    const dark = "dark"
    
    const themeFromStorage = localStorage.getItem("theme") || light;

    const [theme, setTheme] = useState(themeFromStorage);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === light ? dark : light;
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };
    return (
        <div className={styles.container}>
            <div className={styles.button}>
                <span className={styles.button__text}>Light</span>
                <label  htmlFor="theme-toggle" className={styles.button__label}>
                    <input checked={theme === dark} onChange={toggleTheme} type="checkbox" id="theme-toggle" className={styles.button__checkbox}/>
                    <span className={styles.button__slider}></span>
                </label>
                <span className={styles.button__text}>Dark</span>
            </div>
        </div>

    );
};

export default ThemeComponent;