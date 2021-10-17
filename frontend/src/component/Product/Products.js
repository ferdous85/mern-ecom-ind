import React, { useEffect, useState } from 'react'
import './Products.css'
import { clearErrors, getProduct } from '../../actions/productAction'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import Pagination from 'react-js-pagination'
import {useAlert} from 'react-alert'
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const Products = ({match}) => {
    const dispatch= useDispatch()
    const alert = useAlert()
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 10000]);

    const {loading, error, products, productsCount, resultPerPage} = useSelector((state)=> state.products)
    const keyword = match.params.keyword
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };

      const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
      };

    useEffect(() => {
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword, currentPage, price))
    }, [dispatch, error, keyword,currentPage,price, alert])

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

                <div className="filterBox">
                    <Typography>Price</Typography>
                    <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={10000}
                    />

                    {/* <Typography>Categories</Typography>
                    <ul className="categoryBox">
                    {categories.map((category) => (
                        <li
                        className="category-link"
                        key={category}
                        onClick={() => setCategory(category)}
                        >
                        {category}
                        </li>
                    ))}
                    </ul>

                    <fieldset>
                    <Typography component="legend">Ratings Above</Typography>
                    <Slider
                        value={ratings}
                        onChange={(e, newRating) => {
                        setRatings(newRating);
                        }}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                        min={0}
                        max={5}
                    />
                    </fieldset> */}
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
