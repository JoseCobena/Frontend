import React from "react";
import { ReactComponent as GithubIcon } from "../../../assets/img/svg/github.svg";


import "./SocialLinks.scss";

export default function SocialLinks() {
  return (
    <div className="social-links">
      <a
        href="https://github.com/belkixrequejo/react-master"
        className="github"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon />
      </a>
   <a
        href="https://github.com/Fernando10g97"
        className="github"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon />
      </a>
  <a
        href="https://github.com/JoseCobena"
        className="github"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon />
      </a>
  <a
        href="https://github.com/luciana4"
        className="github"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon />
      </a>
 </div>
  );
}
