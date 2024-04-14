import React from "react";
import styled from "styled-components";
// Components
import ProductBox from "../Elements/ProductBox";
import ProductMiniDetails from "../Elements/ProductMiniDetails";

import {TextField,Box,IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import ProductService from '../../../../service/product.service';
import API from '../../../../service/api';
import zIndex from "@mui/material/styles/zIndex";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



function chunkArray(arr, chunkSize) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
}

export default function Products() {
  const [rows, setRows] = React.useState([]);
  const [fixRows, setFixRows] = React.useState([]);
  const [miniDetails, setMiniDetails] = React.useState(null);


  const handleSearch = function(e){
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let search = data.get("search");
    console.log(search);

    filterDataBySearch(search);
  }

  React.useEffect(() => {
    //setRows(rowsInit);
    ProductService.getAllProducts().then((res) => {
      if(res.status === 'success'){
        //convert
        console.log(res.data);
        setFixRows(res.data);
        renderRows(res.data);
      }
    });
  },[])

  const renderRows = function(rows) {
    setRows(rows);
  }

  const filterDataBySearch = (search) => {
    let filterRows = [];
    if(search===""){
      filterRows=fixRows;
    }else{
      fixRows.forEach(row => {
        if(row.name.toLowerCase().indexOf(search.toLowerCase())!== -1
      ||row.tableNumber+""===search){
          filterRows.push(row);
        }
      });
    }
    renderRows(filterRows);
  }

  const openMiniDetails = function(product){
    setMiniDetails(product);
  }


  return (
    <Wrapper id="projects">
      {
        miniDetails!==null?
        <ProductMiniDetails  product={miniDetails} handleClose={()=>{setMiniDetails(null)}}/>
        :null
      }
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold" style={{textAlign:'center'}}>Menu</h1>
            <box style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
              <Box style={{margin:'10px 0 0 20px',display:'flex',flexDirection:'row',alignItems:'center'}} component="form" onSubmit={handleSearch}>
                <TextField size="medium" 
                label="Search..."
                variant="outlined"
                      name="search"
                      type="text"/>
                <IconButton type="submit" color="primary" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Box>
            </box>
          </HeaderInfo>
          {
          chunkArray(rows,3).map(rowBlock=>(
            <div className="row textCenter">
              {
                rowBlock.map(row=>(
                  <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                    <ProductBox
                      img={`${API.IMAGE_URL}/${row.img}`}
                      title={row.name}
                      text={row.description}
                      action={() => openMiniDetails(row)}
                    />
                  </div>
                ))
              }
            </div>
            ))
          }
          
          {/* <div className="row textCenter" >
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <ProjectBox
                img={ProjectImg4}
                title="Awesome Project"
                text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
                action={() => alert("clicked")}
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <ProjectBox
                img={ProjectImg5}
                title="Awesome Project"
                text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
                action={() => alert("clicked")}
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <ProjectBox
                img={ProjectImg6}
                title="Awesome Project"
                text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
                action={() => alert("clicked")}
              />
            </div>
          </div> */}



          <div className="row textCenter" style={{height:"300px"}} ></div>
        </div>
      </div>
      {/* <div className="lightBg">
        <div className="container">
          <Advertising className="flexSpaceCenter">
            <AddLeft>
              <AddLeftInner>
                <ImgWrapper className="flexCenter">
                  <img className="radius8" src={AddImage2} alt="add" />
                </ImgWrapper>
              </AddLeftInner>
            </AddLeft>
            <AddRight>
              <h4 className="font15 semiBold">A few words about company</h4>
              <h2 className="font40 extraBold">A Study of Creativity</h2>
              <p className="font12">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
                diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              </p>
              <ButtonsRow className="flexNullCenter" style={{ margin: "30px 0" }}>
                <div style={{ width: "190px" }}>
                  <FullButton title="Get Started" action={() => alert("clicked")} />
                </div>
                <div style={{ width: "190px", marginLeft: "15px" }}>
                  <FullButton title="Contact Us" action={() => alert("clicked")} border />
                </div>
              </ButtonsRow>
            </AddRight>
          </Advertising>
        </div>
      </div> */}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Advertising = styled.div`
  padding: 100px 0;
  margin: 100px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 60px 0 40px 0;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding: 0 0 30px 0;
    margin: 80px 0 0px 0;
  }
`;
const ButtonsRow = styled.div`
  @media (max-width: 860px) {
    justify-content: space-between;
  }
`;
const AddLeft = styled.div`
  position: relative;
  width: 50%;
  p {
    max-width: 475px;
  }
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
    text-align: center;
    h2 {
      line-height: 3rem;
      margin: 15px 0;
    }
    p {
      margin: 0 auto;
    }
  }
`;
const AddRight = styled.div`
  width: 50%;
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
  }
`;
const AddLeftInner = styled.div`
  width: 100%;
  position: absolute;
  top: -300px;
  left: 0;
  @media (max-width: 1190px) {
    top: -250px;
  }
  @media (max-width: 920px) {
    top: -200px;
  }
  @media (max-width: 860px) {
    order: 1;
    position: relative;
    top: -60px;
    left: 0;
  }
`;
const ImgWrapper = styled.div`
  width: 100%;
  padding: 0 15%;
  img {
    width: 100%;
    height: auto;
  }
  @media (max-width: 400px) {
    padding: 0;
  }
`;
