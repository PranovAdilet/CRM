import {FC, useCallback} from "react";
import {IDesignerItem, IIssueTypes} from "@/shared/store/types/types.ts";
import styles from "./styles.module.scss";


const DesignerTableItem: FC<IDesignerItem> = ({avatar, username, issues, email}) => {

    const getTaskCounts = useCallback((issues: IIssueTypes[]) => {
        const closedTasks = issues.filter(issue => issue.status === 'Done').length;
        const inProgressTasks = issues.filter(issue => issue.status === 'In Progress').length;
        return { closedTasks, inProgressTasks };
    }, []);

    const {closedTasks, inProgressTasks} = getTaskCounts(issues);

    return (
        <tr className={styles.item}>
            <td>
                <img src={avatar} alt={username} className={styles.item__avatar}/>
            </td>
            <td>{username}</td>
            <td>{email}</td>
            <td>{closedTasks}</td>
            <td>{inProgressTasks}</td>
        </tr>
    );
};

export default DesignerTableItem;