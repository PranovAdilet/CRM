import {TFunction} from "i18next";

export const chartsBarData = (t: TFunction) => {
    return [
        {
            dataKey: "profit",
            fill: "var(--profit-color)",
            name: t("tasks.profit")
        },
        {
            dataKey: "expenses",
            fill: "var(--expenses-color)",
            name: t("tasks.expenses")
        },
        {
            dataKey: "difference",
            fill: "var(--difference-color)",
            name: t("tasks.difference")
        }
    ]
}