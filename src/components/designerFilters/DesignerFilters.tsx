import {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import Select from "@/components/UI/select/Select.tsx";
import {selectDesigners, useAppDispatch, useTypedSelector} from "@/shared/store";
import {SelectTypes} from "@/shared/types/types.ts";
import {setFilter} from "@/shared/store/reducers/designersSlice.ts";

import {designersFilterOptions} from "./model/helper";
import styles from "./styles.module.scss";

const DesignerFilters = () => {
    const {filter} = useTypedSelector(selectDesigners);
    const {t} = useTranslation()
    const dispatch = useAppDispatch()

    const filterOptions = designersFilterOptions(t)
    const [selected, setSelected] = useState<SelectTypes>(filterOptions[0])

    const handleFilter = ({value, label}: SelectTypes) => {
        const filterValue = value === "all" ? null : value;
        setSelected({value, label})
        dispatch(setFilter({key: "page", value: 1}));
        dispatch(setFilter({key: "status", value: filterValue}));
    }

    useEffect(() => {
        const currentFilter = filterOptions
            .find(option =>
                option.value === filter.status) || filterOptions[0];
        setSelected(currentFilter);
    }, [filter.status, t]);

    return (
        <div className={styles.filters}>
            <Select
                selected={selected}
                setSelected={handleFilter}
                options={filterOptions}
                className={styles.filters__select}
            />
            {/*<Select*/}
            {/*    selected={selected}*/}
            {/*    setSelected={handleFilter}*/}
            {/*    options={filterOptions}*/}
            {/*/>*/}
        </div>
    );
};

export default DesignerFilters;