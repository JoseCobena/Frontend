import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Rate, notification } from "antd";
import { getClaseDataUdemyApi } from "../../../../api/Clase";

import "./ClaseList.scss";

export default function ClaseList(props) {
  const { clase } = props;

  return (
    <div className="clase-list">
      <Row>
        {clase.map(clase => (
          <Col key={clase._id} md={8} className="clase-list__clase">
            <clase course={clase} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

function Clase(props) {
  const { clase } = props;
  const [claseInfo, setClaseInfo] = useState({});
  const [urlClase, setUrlClase] = useState("");
  const { Meta } = Card;

  useEffect(() => {
    getClaseDataUdemyApi(clase.idCourse)
      .then(response => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          setClaseInfo(response.data);
          mountUrl(response.data.url);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor, inténtelo más tarde."
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clase]);

  const mountUrl = url => {
    if (!clase.link) {
      const baseUrl = `https://www.udemy.com${url}`;
      const finalUrl =
        baseUrl + (clase.coupon ? `?couponCode=${clase.coupon}` : "");
      setUrlClase(finalUrl);
    } else {
      setUrlClase(clase.link);
    }
  };

  return (
    <a href={urlClase} target="_blank" rel="noopener noreferrer">
      <Card
        cover={<img src={claseInfo.image_480x270} alt={claseInfo.title} />}
      >
        <Meta title={claseInfo.title} description={claseInfo.headline} />
        <Button>Entrar en la clase</Button>
        <div className="clase-list__clase-footer">
          <span>{clase.price ? `${clase.price} €` : claseInfo.price}</span>
          <div>
            <Rate disabled defaultValue={5} />
          </div>
        </div>
      </Card>
    </a>
  );
}
