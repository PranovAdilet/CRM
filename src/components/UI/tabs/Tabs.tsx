import {Dispatch, FC, SetStateAction} from 'react';
import {SelectTypes} from "@/shared/types/types.ts";
import clsx from "clsx";
import styles from "./styles.module.scss"

interface TabsProps {
    type: string;
    setType: Dispatch<SetStateAction<string>>;
    options: SelectTypes[]
}

const Tabs: FC<TabsProps> = ({setType, type, options}) => {
    const handleType = (newType: string) => setType(newType);

    const isActive = (value: string) => {
        return clsx(styles.order__button, {
            [styles.button_active]: value === type,
        });
    };

    return (
        <div className={styles.buttons}>
            {options.map(({value, label}) =>
                <button
                    type="button"
                    key={value}
                    onClick={() => handleType(value)}
                    className={clsx(styles.button, isActive(value))}>
                    {label}
                </button>
            )}
        </div>
    );
};

export default Tabs;