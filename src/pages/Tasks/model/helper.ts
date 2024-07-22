import {TFunction} from "i18next";

export const typeChartButtons = (t: TFunction) => {
    return [
        {
            label: t("tasks.chart"),
            value: "lineChart"
        },
        {
            label: t("tasks.pieChart"),
            value: "pieChart"
        }
    ]
}


