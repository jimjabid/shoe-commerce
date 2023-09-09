import { useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import {Row,Col,Image, ListGroup,Card,Button, ListGroupItem, FormControl} from "react-bootstrap"
import { useDispatch } from 'react-redux'
//import { useState,useEffect } from "react";
//import axios from 'axios';
import Rating from '../componets/Rating'
import Loader from '../componets/Loader'
import Message from '../componets/Message'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'
import { addToCart } from '../slices/cartSlice'




function ProductScreen() {
    
    //const [product, setProducts] = useState([]);
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //       const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`);
    //       setProducts(data);
    //     };
    
    //     fetchProducts();
    //   }, [productId]);
  
    const { id : productId} = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
 
    const {data : product , isLoading, error} = useGetProductDetailsQuery(productId);

    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}));
        navigate("/cart")
     }
    
    return (
    <>
    <Link className='btn btn-light my-3' to="/">Go Back</Link>

{isLoading ? (
    <Loader/>
) : error ? (<Message variant="danger">{error?.data?.message || error.error}</Message>) : (<Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={4}>
            <ListGroup variant="flush">
                <ListGroupItem>
                    <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </ListGroupItem>
                <ListGroupItem>
                    Price: ${product.price}
                </ListGroupItem>

            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup>
                    <ListGroupItem>
                        <Row>
                            <Col>
                            Price:
                            </Col>
                            <Col>
                            <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>
                            Description:
                            </Col>
                            <Col>
                            {product.description}
                            </Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>
                            Status:
                            </Col>
                            <Col>
                            <strong>{product.countInStock > 0 ? "in Stock" : "Out Of Stock"}</strong>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    {product.countInStock > 0 && (<ListGroupItem>
                        <Row>
                            <Col>Qty</Col>
                            <Col>
                            
                            <FormControl as ="select"
                                value={qty}
                                onChange={(e) => setQty(Number(e.target.value))}>

                                {[...Array(product.countInStock).keys()].map((x)=> <option key={ x + 1} value ={x + 1} >
                                    {x + 1}
                                </option>)}

                            </FormControl>

                            </Col>
                        </Row>
                    </ListGroupItem>) }
                    <ListGroupItem>
                        <Row>
                           <Button className='btn-block'
                           type='button'
                           disabled={product.countInStock === 0}
                           onClick={addToCartHandler}
                           >
                            Add To Cart

                           </Button>

                        </Row>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>
    </Row>)}
    
    </>
  )
}

export default ProductScreen