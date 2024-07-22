import {FC} from 'react';
import {IComment} from "@/shared/store/types/types";
import {useDate} from "@/shared/hooks/useDate.ts";
import styles from "./styles.module.scss";


const CommentItem: FC<IComment> = ({date_created, designer, message}) => {
    const date = useDate(date_created)
    return (
        <div className={styles.card}>
            <div className={styles.card__left}>
                <img
                    className={styles.card__image}
                    src={designer.avatar}
                    alt="avatar"

                />
                <h4 className={styles.card__title}>{designer.username}</h4>
            </div>

            <div className={styles.card__right}>
                <p className={styles.card__date}>{date}</p>
                <p className={styles.card__message}>{message}</p>
            </div>
        </div>
    );
};

export default CommentItem;