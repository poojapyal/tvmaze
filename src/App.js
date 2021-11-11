import React, { createRef, useState, useEffect } from "react";
import { Container, Col, Row, Form, InputGroup, Button, CardGroup } from "react-bootstrap";

import "./App.scss";
import Cards from "./components/Cards/Cards";

import * as requestService from "./services/services";

let itemArr = [];

function App() {
  let searchInput = createRef();

  const [query, setQuery] = useState();
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const [limit, setLimit] = useState(3);

  const fetchMoviesList = async () => {
    requestService
      .getMoviesList(query)
      .then((response) => {
        console.log(response.data);
        console.log("query:- "+query);
        itemArr = [];
        setData(response.data);
        setLimit(3);
      })
      .catch(() => {
        setError("Error!");
      });
  };

  function handleOnChange(e) {
    console.log("e.target.value = "+ e.target.value);
    setError("");
    const term = e.target.value;
    (term !== "") ? setQuery(term): setQuery(undefined);
  }

  function handleSearch() {
    //if (query === undefined) {
    //  setError("Empty search value!");
    //} else {
      fetchMoviesList();
    //}
  }

  const handleShowMoreResults = () => {
    setLimit(limit + 3);
  };

  useEffect(() => {
    fetchMoviesList();
  }, []);

  const renderMovieList = (value, key) => {
    (value.show.genres).forEach(function(val){
      if(itemArr.includes(val) === false){
        itemArr.push(val);
      }
    })
    
    return (
      <Col key={`${value.show.id}-${key}`}>
        <Cards items={value} />
      </Col>
    );
  };

  const renderGenresList = () => {
    
    const genresLists = itemArr.map((item, index) => (
      <Button key={`${item}-${index}`} className="genresStyle" variant="outline-secondary" size="sm">
        {item}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x-lg"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
          ></path>
          <path
            fillRule="evenodd"
            d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
          ></path>
        </svg>
      </Button>
    ));

    return (<div className="genresWrapper">{genresLists}</div>)
  };

  return (
    <Container>
      <Form>
        <Row className="justify-content-md-center">
          <Col md="12">
            <p style={{ color: "red", textAlign: "center" }}>
              {error ? error : ""}
            </p>
          </Col>
          <Form.Group as={Col} md="4" controlId="validationFormikUsername">
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </InputGroup.Text>
              <Form.Control
                style={{ backgroundColor: "#e9ecef" }}
                className="searchInput"
                size="lg"
                type="text"
                ref={searchInput}
                placeholder="Search"
                onChange={handleOnChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationFormikUsername">
            <Button variant="dark" onClick={handleSearch} size="lg">
              Search
            </Button>
          </Form.Group>
        </Row>
      </Form>
      <Row>
        <Col md="2"></Col>
        <Col md="8">{renderGenresList()}</Col>
      </Row>
      <Row><CardGroup>{data.slice(0, limit).map(renderMovieList)}</CardGroup></Row>
      <Row className="justify-content-md-center">
        <Col>
          <span class="totalCountStyle">{data.length} results</span>
          {limit < data.length && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                className="showMoreStyle"
                variant="outline-secondary"
                onClick={handleShowMoreResults}
              >
                Show me more results
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
