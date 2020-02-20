import React, { useState, useEffect } from "react";
import { Spin, notification } from "antd";
import { Helmet } from "react-helmet";
import moment from "moment";
import { getPostApi } from "../../../../api/clase";
import "moment/locale/es";

import "./ClaseInfo.scss";

export default function ClaseInfo(props) {
  const { url } = props;
  const [claseInfo, setClaseInfo] = useState(null);

  useEffect(() => {
    getClaseApi(url)
      .then(response => {
        if (response.code !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          setClaseInfo(response.post);
        }
      })
      .catch(() => {
        notification["warning"]({
          message: "Error del servidor."
        });
      });
  }, [url]);

  if (!claseInfo) {
    return (
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
    );
  }

  return (
    <>
      <Helmet>
        <title>{claseInfo.title} | Sistema de gestion de aulas</title>
      </Helmet>
      <div className="post-info">
        <h1 className="post-info__title">{claseInfo.title}</h1>
        <div className="post-info__creation-date">
          {moment(claseInfo.date)
            .local("es")
            .format("LL")}
        </div>

        <div
          className="clase-info__description"
          dangerouslySetInnerHTML={{ __html: claseInfo.description }}
        />
      </div>
    </>
  );
}
