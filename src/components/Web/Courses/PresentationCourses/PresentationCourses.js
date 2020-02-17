import React from "react";

import ReactDOM, { render } from 'react-dom';
// <-- import { AFrameRenderer, Marker } from 'react-web-ar';-->

import AcademyLogo from "../../../../assets/img/png/academy-logo.png";

import "./PresentationCourses.scss";

export default function PresentationCourses() {
   return (
    <div className="presentation-courses">
      <img src={AcademyLogo} alt="Jose Cobena" />
      <p>
        Los 4 integrantes de este grupo somos estudiantes de la Pucese, estamos cursando el sexto nivel de Ingenieria en Sistemas de la materia de Graficacion y Animacion
      </p>
      <p>¡¡¡Gracias por visitar nuestra página!!!</p>
    </div>

  );
}
