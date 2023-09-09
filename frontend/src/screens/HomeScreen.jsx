//import { useState,useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../componets/Product";
import Loader from "../componets/Loader";
import Message from "../componets/Message";
import { useGetProductsQuery } from "../slices/productsApiSlice";
//import axios from "axios"


const HomeScreen = () => {
 // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get("http://localhost:5000/api/products");
  //     setProducts(data);
  //   };

  //   fetchProducts();
  // }, []);
 const {data: products, isLoading, error} = useGetProductsQuery()
  return (
    <>
     {isLoading ? (
      <Loader/>
     ) : error ? (<Message variant="danger">{error?.data?.message || error.error}</Message>) : (<>
     <h1>Latest Shoes</h1>
     <Row>
       {products.map((product) => (
         <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product} />
         </Col>
       ))}
     </Row>
     </>) }

      
    </>
  );
};
export default HomeScreen;
