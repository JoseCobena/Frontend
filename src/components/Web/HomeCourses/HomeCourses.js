import React from "react";
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";
import reactJsHooks from "../../../assets/img/jpg/react-js-hooks.jpg";
import reactNative from "../../../assets/img/jpg/react-native.jpg";
import javaScript from "../../../assets/img/jpg/javascript-es6.jpg";
import wordPress from "../../../assets/img/jpg/wordpress.jpg";

import "./HomeCourses.scss";

export default function HomeCourses() {
  return (
    <Row className="home-courses">
      <Col lg={24} className="home-courses__title">
        <h2>Visítanos en nuestros Blogs</h2>
      </Col>
      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-courses">
          <Col md={6}>
            <CardCourse
              image={reactJsHooks}
              title="REQUEJO"
              subtitle="GHOST CMS"
              link="https://belkixrequejo.me/"
            />
          </Col>
          <Col md={6}>
            <CardCourse
              image={reactNative}
              title="COBENA"
              subtitle="GHOST CMS"
              link="https://pocho2001.com/"
            />
          </Col>
          <Col md={6}>
            <CardCourse
              image={javaScript}
              title="GUERRA"
              subtitle="GHOST CMS"
              link="https://fernandoguerra.me/"
            />
          </Col>
          <Col md={6}>
            <CardCourse
              image={wordPress}
              title="REVELO"
              subtitle="GHOST CMS"
              link="https://maferevelo.tk/"
            />
          </Col>
        </Row>
        
      </Col>
      <Col lg={4} />
      <Col lg={24} className="home-courses__more">
        <Link to="/admin">
          <Button>Ingresar</Button>
        </Link>
      </Col>
    </Row>
  );
}

function CardCourse(props) {
  const { image, title, subtitle, link } = props;
  const { Meta } = Card;

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Card
        className="home-courses__card"
        cover={<img src={image} alt={title} />}
        actions={[<Button>INGRESAR</Button>]}
      >
        <Meta title={title} description={subtitle} />
      </Card>
    </a>
  );
}
