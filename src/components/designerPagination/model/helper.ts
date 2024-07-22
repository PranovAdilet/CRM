import {TFunction} from "i18next";

export const designersFilterOptions = (t: TFunction) => {
    return [
        {
            label: t("designers.all"),
            value: "all"
        },
        {
            label: t("designers.new"),
            value: "New"
        },
        {
            label: t("designers.inProgress"),
            value: "In Progress"
        },
        {
            label: t("designers.done"),
            value: "Done"
        }
    ]
}