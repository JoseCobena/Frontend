import React from "react";
import LogoWhite from "../../../../assets/img/png/pucese.jpeg";
import SocialLink from "../../SocialLinks";

import "./MyInfo.scss";

export default function MyInfo() {
  return (
    <div className="my-info">
      <img src={LogoWhite} alt="Fernando Guerra" />
      <h4>
        Graficacion y animacion, es una materia de la ingenieria en sistema que permiter conocer tecnologias para el desarrollo web.
      </h4>
      <SocialLink />
    </div>
  );
}
