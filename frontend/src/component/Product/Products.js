import React, { useEffect, useState } from 'react'
import './Products.css'
import { clearErrors, getProduct } from '../../actions/productAction'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import Pagination from 'react-js-pagination'
import {useAlert} from 'react-alert'

const Products = ({match}) => {
    const dispatch= useDispatch()
    const alert = useAlert()
    const [currentPage, setCurrentPage] = useState(1);
    const {loading, error, products, productsCount, resultPerPage} = useSelector((state)=> state.products)
    const keyword = match.params.keyword
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };

    useEffect(() => {
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword, currentPage))
    }, [dispatch, error, keyword,currentPage, alert])

    return (
        <>
            {loading ? <Loader /> : (
                <>
                <h2 className="productsHeading">
                    Products
                </h2>
                <div className="products">
                {products && products.map(product =>(
                    <ProductCard product={product} />
                ))}
                </div>

                {resultPerPage < productsCount && <div className="paginationBox">
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                />
            </div>}
                </>
            ) }
        </>
    )
}

export default Products
