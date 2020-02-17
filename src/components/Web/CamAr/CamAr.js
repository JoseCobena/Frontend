import React from "react";
import { Row, Col,  Card, Button } from "antd";
import "./CamAr.scss";
import { Link } from "react-router-dom";

export default function CamAr() {
  return (
    <div className="main-banner">
      <div className="main-banner__dark" />
      <Row>
        <Col lg={4} />
        <Col lg={16}>
          <h2>
            Escaner QR <br />
          </h2>
          <h3>
           PUCESE
            <br />
           GRUPO 2

          </h3>
        <Link to="/courses">
          <Button>Escaneaer codigo</Button>
        </Link>
        </Col>
        <Col lg={4} />
 
      </Row>
    </div>
  );
}
