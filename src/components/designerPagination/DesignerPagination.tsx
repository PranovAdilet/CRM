import {ChevronLeft, ChevronRight} from "lucide-react";
import styles from "./styles.module.scss"
import {selectDesigners, useAppDispatch, useTypedSelector} from "@/shared/store";
import {setFilter} from "@/shared/store/reducers/designersSlice.ts";
import PaginationButton from "@/components/paginationButton/PaginationButton.tsx";
import {useCallback} from "react";

const DesignerPagination = () => {
    const {designers, filter} = useTypedSelector(selectDesigners)
    const dispatch = useAppDispatch()

    const handleNextPage = () => {
        if (designers?.next && filter.page){
            dispatch(setFilter({
                key: "page",
                value: filter?.page + 1
            }))
        }
    }
    const handlePrevPage = () => {
        if (designers?.previous && filter.page){
            dispatch(setFilter({
                key: "page",
                value: filter?.page - 1
            }))
        }
    }

    const handlePageClick = (page: number | string) => {
        dispatch(setFilter({
            key: "page",
            value: page
        }));
    };

    const totalPages = Math.ceil((designers?.count || 0) / filter.limit);

    const renderPageNumbers = useCallback(() => {
        let pages = [];
        const maxPagesToShow = 5;
        const currentPage = filter.page;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (!currentPage) return
            pages.push(1);
            if (currentPage > 3) {
                pages.push("...");
            }

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("...");
            }
            pages.push(totalPages);
        }

        return pages.map((page, index) => (
           <PaginationButton
               key={index}
               page={page}
               isActive={page === currentPage}
               onClick={() => handlePageClick(page)}
           />
        ));
    },[totalPages, filter.page]);

    return (
        <>
            {
                !!totalPages &&
                <div className={styles.pagination}>
                    <button
                        className={styles.pagination__btn}
                        onClick={handlePrevPage}
                        disabled={!designers?.previous}
                        aria-label="Previous Page"
                    >
                        <ChevronLeft/>
                    </button>
                    <div className={styles.pagination__list}>{renderPageNumbers()}</div>
                    <button
                        className={styles.pagination__btn}
                        onClick={handleNextPage}
                        disabled={!designers?.next}
                        aria-label="Next Page"
                    >
                        <ChevronRight/>
                    </button>
                </div>
            }
        </>
    );
};

export default DesignerPagination;