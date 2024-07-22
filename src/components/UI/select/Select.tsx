import {ChevronDown} from "lucide-react";
import clsx from "clsx";
import {useOutside} from "@/shared/hooks/useOutside.ts";
import {SelectTypes} from "@/shared/types/types.ts";
import styles from "./styles.module.scss"

interface SelectProps {
    selected: SelectTypes,
    setSelected: (v: SelectTypes) => void
    options: SelectTypes[]
    className?: string
}

const Select = ({setSelected, selected, options, className}: SelectProps) => {
    const {
        ref,
        isShown,
        toggleShow,
        setIsShown} = useOutside(false)

    const handleSelect = (value: SelectTypes) => {
        setSelected(value);
        setIsShown(false)
    };
    return (
        <div ref={ref}>
            <div className={clsx(styles.select, className)}>
                <button
                    type="button"
                    onClick={toggleShow}
                    className={clsx(styles.select__selected, {
                        [styles.select__selected_active]: isShown
                    })}
                >
                    <p className={styles.select__select}>{selected.label}</p>
                    <ChevronDown
                        className={clsx(styles.select__icon, {
                            [styles.select__icon_active]: isShown
                        })}/>
                </button>
                {isShown && (
                    <div className={styles.select__menu}>

                        {options?.map((item: SelectTypes) => (
                            <button
                                onClick={() => handleSelect(item)}
                                type="button"
                                className={clsx(styles.select__item, {
                                    [styles.select__item_active]:
                                    item.value === selected.value,
                                })}
                                key={item.value}>
                                {item.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Select;