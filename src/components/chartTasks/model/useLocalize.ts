import { useCallback, useEffect, useState } from "react";
import { enUS, ru } from "date-fns/locale";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { ChartDataTypes } from "./types.ts";

export const useLocalize = (data: ChartDataTypes[]) => {
    const [localizedData, setLocalizedData] = useState<ChartDataTypes[]>([]);

    const { i18n, t } = useTranslation();

    const localizeData = useCallback(() => {
        const locale = i18n.language === "ru" ? ru : enUS;

        const localizedWeekData = data.map((item) => {

            return ({
                ...item,
                week: `${t("tasks.week")} ${item.week} (${format(
                    item.startOfWeekDate,
                    "MMM",
                    { locale }
                )})`,
            })
        });

        setLocalizedData(localizedWeekData);
    }, [data, i18n.language, t]);

    useEffect(() => {
        localizeData();
    }, [data, i18n.language, localizeData]);

    return localizedData;
};
