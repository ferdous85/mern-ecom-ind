import './App.css'
import Header from './component/layout/Header/Header'
import Footer from './component/layout/Footer/Footer'
import { BrowserRouter as Router } from 'react-router-dom'
import WebFont from "webfontloader";
import { useEffect } from 'react';


function App() {
  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto", 'Dorid Sans', "Chilanka"]
      }
    })
  },[])
  return (
    <Router>
    <Header />
    <Footer />
    </Router>
  );
}

export default App;
