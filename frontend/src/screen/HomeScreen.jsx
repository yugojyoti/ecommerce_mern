import React from "react";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { Jumbotron } from "react-bootstrap";

const HomeScreen = () => {
  // const [products, setProducts] = useState([]);
  // const fetchProducts = async () => {
  //   const { data } = await axios.get(
  //     `${process.env.REACT_APP_BACKEND}/products`
  //   );
  //   setProducts(data);
  // };
  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">
          {" "}
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <div class="jumbotron bg-dark text-center text-light">
            <h1 class="display-4">Summer Sale</h1>
            <p class="lead">BigBoxKart big summer sale is back</p>

            <p>
              Buy 3 and get 20% free now . Sale End Tomorrow . Hurry up. Buy now
            </p>
          </div>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
