import React from 'react'
import { CgMouse } from 'react-icons/cg'
import Product from '../Product/Product'
import './Home.css'
import MetaData from '../layout/MedaData'


const product = {
    name: "Blue Tshirt",
    images:[{url:"https://www.tecnomint.com/images/brand/1.jpg"}],
    price:"$ 120",
    _id:"user01"
}

const Home = () => {
    return (
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
                  <Product product={product} />
                  <Product product={product} />
                  <Product product={product} />
                  <Product product={product} />
                  <Product product={product} />
                  <Product product={product} />
                  <Product product={product} />
                  <Product product={product} />
              </div>
        </>
    )
}

export default Home
