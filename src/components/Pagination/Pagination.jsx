import React from 'react';
import styles from './Pagination.module.scss'
import ReactPaginate from 'react-paginate';
import { setCurrentPage } from '../../redux/slices/filterSlice'
import { useSelector, useDispatch } from 'react-redux'

const Pagination = (props) => {
    const currentPage = useSelector((state) => state.filter.currentPage)
    const dispatch = useDispatch()
    const onPageChange = (number) => {
        dispatch(setCurrentPage(number))
    }
    return (
        <ReactPaginate
            className={styles.wrapper}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => onPageChange(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={2}
            previousLabel="<"
            renderOnZeroPageCount={null}
            forcePage={currentPage - 1 }
        />
    )
}

export default Pagination;