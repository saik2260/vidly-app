import React, { Component } from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'

const PageNav = ({ pageSize, itemsCount, onPageNav, currentPage }) => {
    const pageCount = Math.ceil(itemsCount / pageSize)
    const pages = _.range(1, pageCount + 1)

    if (pages.length === 1) return null

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map(page =>
                    <li key={page} className={currentPage === page ? "page-item active" : "page-item"}>
                        <a className="page-link" onClick={() => onPageNav(page)}>{page}</a>
                    </li>)}
            </ul>
        </nav>
    )
}

PageNav.propTypes = {
    pageSize: PropTypes.number.isRequired,
    itemsCount: PropTypes.number.isRequired,
    onPageNav: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
}

export default PageNav;