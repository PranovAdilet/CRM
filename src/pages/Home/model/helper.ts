import {TFunction} from "i18next";
import {IIssueTypes} from "@/shared/store/types/types.ts";


export const typeButtons = (t: TFunction) => {
    return [
        {
            label: t("home.comments"),
            value: "comments"
        },
        {
            label: t("home.designers"),
            value: "designers"
        }
    ]
}

export const calculateMedian = (numbers:  number[]) => {
    if (numbers.length === 0) return 0;
    numbers.sort((a, b) => a - b);
    const half = Math.floor(numbers.length / 2);
    if (numbers.length % 2) return numbers[half];
    return (numbers[half - 1] + numbers[half ]) / 2.0;
}


export const calculateTaskDuration = (issue: IIssueTypes) => {
    const start = new Date(issue.date_started_by_designer).getTime();

    const end = new Date(issue.date_finished_by_designer).getTime();
    return (end - start) / (1000 * 60 * 60);
};


export interface InitialAccTypes {
    completedTasks: number;
    medianTaskDuration: number;
    avatar: string;
    email: string;
    issues: IIssueTypes[];
    thumbnails: { avatar: string; };
    username: string;
}