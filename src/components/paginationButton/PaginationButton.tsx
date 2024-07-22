import {FC} from "react";
import clsx from "clsx";
import styles from "./styles.module.scss"

interface PaginationButtonProps {
    page: number | string;
    isActive?: boolean;
    onClick: () => void;
}

const PaginationButton:FC<PaginationButtonProps> = ({isActive, page, onClick}) => {
    return (
        <button
            className={clsx(styles.btn, {
                [styles.btn_active]: isActive
            })}
            onClick={onClick}
            disabled={typeof page !== 'number'}>
            {page}
        </button>
    );
};

export default PaginationButton;