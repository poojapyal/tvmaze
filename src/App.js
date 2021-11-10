import React, { createRef, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Col, Row, Form, InputGroup, Button } from "react-bootstrap";

import Cards from "./components/Cards/Cards";

import * as requestService from "./services/services";

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
        setData(response.data);
        setLimit(3);
      })
      .catch(() => {
        setError("Error!");
      });
  };

  function handleOnChange(e) {
    setError("");
    const term = e.target.value;
    setQuery(term);
  }

  function handleSearch() {
    if (query === undefined) {
      setError("Empty search value!");
    } else {
      fetchMoviesList();
    }
  }

  const handleShowMoreResults = () => {
    setLimit(limit + 3);
  };

  useEffect(() => {
    fetchMoviesList();
  }, []);

  const renderMovieList = (value, key) => {
    return (<Col><Cards key={key} items={value} /></Col>);
  };

  return (
    <Container>
      <Form>
        <Row className="justify-content-md-center">
          <Col md="12">
            <p style={{ color: "red", textAlign: "center" }}>
              {" "}
              {error ? error : ""}{" "}
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
        {data.slice(0, limit).map(renderMovieList)}
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          {data.length} results
          {limit < data.length && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="outline-secondary" onClick={handleShowMoreResults}>
              Show me more results
            </Button>
          </div>)
          }
        </Col>
      </Row>
    </Container>
  );
}

export default App;
