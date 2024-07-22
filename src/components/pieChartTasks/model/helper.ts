import {TFunction} from "i18next";

interface PieChartProps {
    Done: string
    "In Progress": string
    New: string
}

export const statusesPieCharts: (t: TFunction) => PieChartProps = (t: TFunction) => {
    return {
        "Done": t("designers.done"),
        "In Progress": t("designers.inProgress"),
        "New": t("designers.new"),
    }
}

export const COLORS = ['var(--profit-color)', 'var(--expenses-color)', 'var(--difference-color)'];