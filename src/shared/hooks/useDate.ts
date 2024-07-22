import {formatDistanceToNow} from "date-fns";
import { ru, enUS } from "date-fns/locale"
import {useTranslation} from "react-i18next";


export const useDate = (dateString: string) => {
    const {i18n} = useTranslation()
    const date = new Date(dateString);
    const localeType = i18n.language === "en" ? enUS : ru
    return formatDistanceToNow(date, { addSuffix: true, locale: localeType });
}