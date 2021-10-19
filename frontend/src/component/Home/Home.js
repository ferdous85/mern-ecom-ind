import React, { useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import ProductCard from './ProductCard'
import './Home.css'
import MetaData from '../layout/MetaData'
import { clearErrors, getProduct } from '../../actions/productAction'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../layout/Loader/Loader'
import {useAlert} from 'react-alert'



const Home = () => {
    const dispatch= useDispatch()
    const alert = useAlert()
    const {loading, error, products} = useSelector((state)=> state.products)

    useEffect(() => {
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct())
    }, [dispatch, error, alert])
    return (
        <>
        {loading ? ( <Loader />) :(
            <>
            <MetaData title="Ecommerce" />
        
        <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCT BELOW</h1>
            <a href="#container">
                <button>
                    Scroll <CgMouse />
                </button>
            </a>
            </div>  
            <h2 className="homeHeading">
                Featured Product
            </h2>
            <div className="container" id="container">
                {products && products.map(product =>(
                    <ProductCard product={product} />
                ))}
               
            </div>
            </>
        ) }
        </>
    )
}

export default Home
