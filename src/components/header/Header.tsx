import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {getWeek} from "date-fns";
import ThemeComponent from "@/components/themeComponent/ThemeComponent.tsx";
import {SelectTypes} from "@/shared/types/types.ts";
import {languageNames} from "@/shared/constants.ts";
import Select from "../UI/select/Select"
import {langMap, languagesValues} from "./model/helper";
import styles from "./styles.module.scss"


const Header = () => {
    const [lang, setLang] = useState<SelectTypes>({} as SelectTypes);

    const { t, i18n } = useTranslation();
    const currentWeek = getWeek(new Date(), { weekStartsOn: 1 });

    useEffect(() => {
        const langFromStorage = localStorage.getItem("i18nextLng") || languageNames.EN
        setLang(langMap[langFromStorage as keyof typeof langMap]);
    }, []);

    const handleChange = (value: SelectTypes) => {
        i18n.changeLanguage(value.value);
        setLang(value);
    };

    return (
        <header className={styles.header}>
            <img
                className={styles.header__logo}
                 src="https://img.icons8.com/external-sbts2018-flat-sbts2018/58/external-crm-basic-ui-elements-2.4-sbts2018-flat-sbts2018.png"
                 alt="logo"
            />
            <h1 className="h1">{t('header.welcome')}</h1>

           <div className={styles.header__right}>
               <h4 className="h4">
                   {t('header.week')} № {currentWeek}
               </h4>
               <ThemeComponent/>
               <Select
                   selected={lang}
                   setSelected={handleChange}
                   options={languagesValues}
               />
           </div>
        </header>
    );
};

export default Header;