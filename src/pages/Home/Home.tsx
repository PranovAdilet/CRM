import {lazy, Suspense, useEffect, useMemo, useState} from "react";
import Tabs from "@/components/UI/tabs/Tabs.tsx";
import CommentItem from "@/components/commentItem/CommentItem.tsx";
import Loading from "@/components/UI/loading/Loading.tsx";
import ErrorBoundary from "@/components/errorBoundary/ErrorBoundary.tsx";

import {useTranslation} from "react-i18next";
import {getComments} from "@/shared/store/actions/comments.ts";
import {getDesigners} from "@/shared/store/actions/designers.ts";
import {selectComments, selectDesigners, useAppDispatch, useTypedSelector} from "@/shared/store";

import {calculateMedian, calculateTaskDuration, InitialAccTypes, typeButtons} from "./model/helper";
import styles from "./styles.module.scss"

const DesignerItem = lazy(() => import('@/components/designerItem/DesignerItem.tsx'));

const Home = () => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation();

    const {comments, status: commentsStatus} = useTypedSelector(selectComments);
    const {designers, status: designersStatus} = useTypedSelector(selectDesigners);

    const buttons = typeButtons(t)
    const [type, setType] = useState(buttons[0].value)

    useEffect(() => {
        dispatch(getComments());
        dispatch(getDesigners({filter: {limit: 128}}));
    }, []);

    useEffect(() => {
        dispatch(getDesigners({filter: {limit: 128, page: 2}}));
    }, []);

    console.log(designers)

    const processedDesigners = useMemo(() => {
        if (!designers) return [];

        const initialAccumulator: InitialAccTypes[] = [];

        return designers.results.reduce((acc, designer) => {
            const completedIssues = designer.issues.filter(issue =>
                issue.date_finished_by_designer);
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
            .sort((a, b) => {
                if (b.completedTasks !== a.completedTasks) {
                    return b.completedTasks - a.completedTasks;
                }

                return a.medianTaskDuration - b.medianTaskDuration
            })
            // .slice(0, 10);

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
                options={buttons}
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