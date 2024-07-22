import styles from "./styles.module.scss"
import {FC} from "react";

interface Props {
    type?: "full" | "default"
}

const Loading:FC<Props> = ({type = "default"} ) => {
    return (
        <div className={styles[type]}>
            <div className="spinner"></div>
        </div>
    );
};

export default Loading;