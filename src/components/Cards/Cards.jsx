import React from "react";
import { Card } from "react-bootstrap";
import "./Cards.scss";

import * as services from "../../services/services";

const Cards = (props) => {
  const { id, name, summary, image } = props.items.show;
  return (
    <Card className="m-4 cardWrapper" key={id}>
      {image ? <Card.Img variant="top" src={image.medium} /> : ""}

      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{services.stripHtml(summary)}</Card.Text>
      </Card.Body>
    </Card>
  );
};
export default Cards;
