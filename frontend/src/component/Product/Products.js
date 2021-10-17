import React, { useEffect } from 'react'
import './Products.css'
import { clearErrors, getProduct } from '../../actions/productAction'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import Pagination from 'react-js-pagination'

const Products = ({match}) => {
    const dispatch= useDispatch()
    const {loading, error, products, productsCount} = useSelector((state)=> state.products)
    const keyword = match.params.keyword
    useEffect(() => {
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword))
    }, [dispatch, error, keyword])

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
                </>
            ) }
        </>
    )
}

export default Products
