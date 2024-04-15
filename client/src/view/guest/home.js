import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style/flexboxgrid.min.css";
import './style/index.css';
import { Helmet } from "react-helmet";

// Sections
import TopNavbar from "./components/Nav/TopNavbar";
import Header from "./components/Sections/Header";
// import Services from "./components/Sections/Services";
import Products from "./components/Sections/Products";
// import Blog from "./components/Sections/Blog";
// import Pricing from "./components/Sections/Pricing";
// import Contact from "./components/Sections/Contact";
// import Footer from "./components/Sections/Footer"

export default function Landing() {
  const getNavOne = React.useMemo(() => {
    return (
      <TopNavbar />
    );
  }, []);
  return (
    <>
	<Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
      </Helmet>
      {getNavOne}
      <Header />
      {/* <Services /> */}
      <Products />
      {/* <Blog /> */}
      {/* <Pricing /> */}
      {/* <Contact /> */}
      {/* <Footer /> */}
    </>
  );
}


