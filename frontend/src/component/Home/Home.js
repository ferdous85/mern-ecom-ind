import React, { useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import Product from '../Product/Product'
import './Home.css'
import MetaData from '../layout/MedaData'
import { getProduct } from '../../actions/productAction'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../layout/Loader/Loader'
import {useAlert} from 'react-alert'



const Home = () => {
    const dispatch= useDispatch()
    const alert = useAlert()
const {loading, error, products, productsCount} = useSelector((state)=> state.products)

    useEffect(() => {
        if(error) {
            return alert.error(error)
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
                    <Product product={product} />
                ))}
               
            </div>
            </>
        ) }
        </>
    )
}

export default Home
