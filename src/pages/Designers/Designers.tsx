import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import Loading from "@/components/UI/loading/Loading.tsx";
import Error from "@/components/UI/error/Error.tsx";
import DesignerThItem from "@/components/designerThItem/DesignerThItem.tsx";
import DesignerTableItem from "@/components/designerTableItem/DesignerTableItem.tsx";
import DesignerFilters from "@/components/designerFilters/DesignerFilters.tsx";
import DesignerPagination from "@/components/designerPagination/DesignerPagination.tsx";
import {selectDesigners, useAppDispatch, useTypedSelector} from "@/shared/store";
import {getDesigners} from "@/shared/store/actions/designers";

import {columns} from "./model/helper";
import styles from "./styles.module.scss"

const Designers = () => {
    const {
        designers,
        sortBy,
        status,
        filter
    } = useTypedSelector(selectDesigners);
    const dispatch = useAppDispatch()
    const {t} = useTranslation()

    useEffect(() => {
        dispatch(getDesigners({sortBy, filter}))
    }, [sortBy, filter]);

    const isLoading = status === "loading"
    const isError = status === "rejected"

    if (isError){
        return <Error/>
    }

    return (
        <div className={styles.designers}>
            <DesignerFilters/>
            <div className={styles.designers__row}>
               {isLoading && <Loading type="full"/>}
               {!isLoading && !designers?.results.length && <Error type="empty"/>}
               {!isLoading && !!designers?.results.length &&
                   <table>
                       <thead>
                       <tr>
                           {
                               columns(t).map(column => (
                                   <DesignerThItem {...column} key={column.label}/>
                               ))
                           }
                       </tr>
                       </thead>
                       <tbody>

                       {
                           designers?.results?.map((designer, idx) => (
                               <DesignerTableItem key={idx} {...designer}/>
                           ))
                       }
                       </tbody>
                   </table>
               }
           </div>
            <DesignerPagination/>
        </div>
    );
};

export default Designers;