import React from "react";
import { Row, Col, Card, Icon } from "antd";

import "./HowMyCoursesWork.scss";

export default function HowMyCoursesWork() {
  return (
    <Row className="how-my-courses-work">
      <Col lg={24} className="how-my-courses-work__title">
       </Col>
        </Row>
   );
}

function CardInfo(props) {
  const { icon, title, description } = props;
  const { Meta } = Card;

  return (
    <Card className="how-my-courses-work__card">
      <Icon type={icon} />
      <Meta title={title} description={description} />
    </Card>
  );
}
