import React, { useEffect, useState } from "react";
import { useGetFoodQuery } from "../slices/productApiSlice";
import Product from "../components/Product";
import { Col, Form, Row } from "react-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";

const FoodScreen = () => {
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(2000);
  const [productFilter, setProductFilter] = useState([]);
  const { data: products, isLoading, error } = useGetFoodQuery();

  useEffect(() => {
    if (products) {
      const filterValue = products.filter(
        (product) => product.rating >= rating && product.price <= price
      );
      console.log(filterValue);
      setProductFilter(filterValue);
    }
  }, [products, price, rating]);

  return (
    <>
      <Row>
        <Col md={3}>
          <Row>
            <h3>Filter</h3>
          </Row>
          <Row>
            <Form>
              <Form.Group controlId="rating" className="my-2">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  as="select"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value="">Select</option>
                  <option value="0">0-No Rating</option>
                  <option value="1">1-Poor</option>
                  <option value="2">2-Fair</option>
                  <option value="3">3-Good</option>
                  <option value="4">4-Very Good</option>
                  <option value="5">5-Excellent</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="price" className="my-2">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  as="select"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                >
                  <option value="">Select</option>
                  <option value="20">Less than $20</option>
                  <option value="50">Less than $50</option>
                  <option value="100">Less than $100</option>
                  <option value="250">Less than $250</option>
                  <option value="500">Less than $500</option>
                  <option value="1000">Less than $1000</option>
                  <option value="2000">Less than $2000</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Row>
        </Col>
        <Col md={9}>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <Message variant="danger">
              {" "}
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <>
              <h1>Foods</h1>
              <Row>
                {productFilter.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default FoodScreen;
