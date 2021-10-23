import './App.css'
import Header from './component/layout/Header/Header'
import Footer from './component/layout/Footer/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import WebFont from "webfontloader";
import { useEffect } from 'react';
import Home from './component/Home/Home'
import ProductDetails from './component/Product/ProductDetails'
import Products from './component/Product/Products';
import Search from './component/Product/Search'
import LoginSignup from './component/User/LoginSignup';
import store from './store'
import { loadUser } from './actions/userAction';



function App() {
  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto", 'Dorid Sans', "Chilanka"]
      }
    })
    store.dispatch(loadUser)
  },[])
  return (
    <Router>
    <Header />
    <Route exact path='/' component={Home} />
    <Route exact path='/product/:id' component={ProductDetails} />
    <Route exact path='/products' component={Products} />
    <Route path='/products/:keyword' component={Products} />
    <Route exact path='/search' component={Search} />

    <Route exact path='/login' component={LoginSignup} />
    
    <Footer />
    </Router>
  );
}

export default App;
