import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

import {navbarMenu} from "./model/helper.ts";
import styles from "./styles.module.scss"
import clsx from "clsx";

const Navbar = () => {
    const [selectedRoute, setSelectedRoute] = useState("");

    const navigate = useNavigate()
    const {t} = useTranslation()

    useEffect(() => {
        const pathName = location.pathname;
        setSelectedRoute(pathName);
    }, [location.pathname]);

    const handleNavigate = (route: string) => {
        navigate(route)
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.navbar__menu}>
                {
                    navbarMenu(t).map(({route, label, Icon}) => (
                        <div
                            key={route}
                            onClick={() => handleNavigate(route)}
                            className={clsx( styles.navbar__item, {
                                [styles.navbar__item_active]: selectedRoute === route}
                            )}>
                            <span className={styles.navbar__icon}>
                                <Icon/>
                            </span>
                            <h4>
                                {label}
                            </h4>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Navbar;