import {FC} from "react";
import {ArrowUpDown} from "lucide-react";
import clsx from "clsx";
import {setSort} from "@/shared/store/reducers/designersSlice.ts";
import {selectDesigners, useAppDispatch, useTypedSelector} from "@/shared/store";
import {DesignerColumnsTypes} from "@/pages/Designers/model/types.ts";
import styles from "./styles.module.scss";

const DesignerThItem:FC<DesignerColumnsTypes> = ({sortKey, label}) => {
    const { sortBy} = useTypedSelector(selectDesigners);
    const dispatch = useAppDispatch()

    const handleSortBy = () => {
        const value = sortKey === sortBy ? null : sortKey
        dispatch(setSort(value));
    }
    return (
        <th className={styles.item__wrapper}>
            {
                !sortKey && <span>{label}</span>
            }
            {
                sortKey &&
                <div
                    onClick={handleSortBy}
                    className={clsx(styles.item, {
                        [styles.item_active]: sortBy === sortKey,
                    })}
                >
                    <span>{label}</span>
                    <span><ArrowUpDown/></span>
                </div>
            }
        </th>
    );
};

export default DesignerThItem;