import {lazy, Suspense, useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {getComments} from "@/shared/store/actions/comments.ts";
import {getDesigners} from "@/shared/store/actions/designers.ts";
import {selectComments, selectDesigners, useAppDispatch, useTypedSelector} from "@/shared/store";
import CommentItem from "@/components/commentItem/CommentItem.tsx";

import Tabs from "@/components/UI/tabs/Tabs.tsx";

import {calculateMedian, calculateTaskDuration, InitialAccTypes, typeButtons} from "./model/helper";
import styles from "./styles.module.scss"
import Loading from "@/components/UI/loading/Loading.tsx";
import ErrorBoundary from "@/components/errorBoundary/ErrorBoundary.tsx";

const DesignerItem = lazy(() => import('@/components/designerItem/DesignerItem.tsx'));

const Home = () => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation();

    const {comments, status: commentsStatus} = useTypedSelector(selectComments);
    const {designers, status: designersStatus} = useTypedSelector(selectDesigners);

    const [type, setType] = useState(typeButtons(t)[0].value)

    useEffect(() => {
        dispatch(getComments());
        dispatch(getDesigners({}));
    }, [dispatch]);

    const processedDesigners = useMemo(() => {
        if (!designers) return [];

        const initialAccumulator: InitialAccTypes[] = [];

        return designers.results.reduce((acc, designer) => {
            const completedIssues = designer.issues.filter(issue => issue.date_finished_by_designer);
            const taskDurations = completedIssues.map(calculateTaskDuration);
            const medianTaskDuration = calculateMedian(taskDurations);

            if (completedIssues.length > 0) {
                acc.push({
                    ...designer,
                    completedTasks: completedIssues.length,
                    medianTaskDuration
                });
            }

            return acc;
        }, initialAccumulator)
            .sort((a, b) =>
                a.medianTaskDuration - b.medianTaskDuration || b.completedTasks - a.completedTasks)
            .slice(0, 10);

    }, [designers]);

    const isLoading = commentsStatus === "loading" || designersStatus === "loading";
    const isError = commentsStatus === "rejected" || designersStatus === "rejected";

    if (isLoading) {
        return <Loading/>
    }

    if (isError) {
        return <h3 className="h3">Упс, произошла ошибка при запросе</h3>;
    }

    return (
        <div className={styles.home}>
            <Tabs
                type={type}
                setType={setType}
                options={typeButtons(t)}
            />
            <div className={styles.home__list}>
                {type === "comments" && comments?.map(comment => (
                    <CommentItem key={comment.id} {...comment} />
                ))}
                {type === "designers" && (
                    <Suspense fallback={<Loading />}>
                        <ErrorBoundary>
                            {processedDesigners?.map(designer => (
                                <DesignerItem key={designer.email} {...designer} />
                            ))}
                        </ErrorBoundary>
                    </Suspense>
                )}
            </div>
        </div>
    );
};

export default Home;