import React from "react";
import { Helmet } from "react-helmet";
import MainBanner from "../components/Web/MainBanner";
import HomeCourses from "../components/Web/HomeCourses";
import HowMyCoursesWork from "../components/Web/HowMyCoursesWork";
import ReviewsCourses from "../components/Web/ReviewsCourses";
import CamAr from "../components/Web/CamAr";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Sistema de gestion de aulas</title>
        <meta
          name="description"
          content="Home | Web sobre programación"
          data-react-helmet="true"
        />
      </Helmet>
      <MainBanner />
      <HomeCourses />
      <CamAr />
      <HowMyCoursesWork />
      <ReviewsCourses />
    </>
  );
}
