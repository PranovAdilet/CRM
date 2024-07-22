import {DesignerColumnsTypes} from "@/pages/Designers/model/types.ts";
import {TFunction} from "i18next";



export const columns: (t: TFunction) => DesignerColumnsTypes[] = (t) => {
    return [
        { label: t("designers.avatar")},
        { label: t("designers.username"), sortKey: 'username'},
        { label: t("designers.email"), sortKey: 'email'},
        { label: t("designers.closedTasks")},
        { label: t("designers.inProgressTasks")}
    ];
}

