import React from "react";
import { ReactComponent as GithubIcon } from "../../../assets/img/svg/github.svg";


import "./SocialLinks.scss";

export default function SocialLinks() {
  return (
    <div className="social-links">
      <a
        href="https://github.com/LuisTorres1992/Proyecto"
        className="github"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon />
      </a>
   <a
        href="https://github.com/TonyLenta"
        className="github"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon />
      </a>
  <a
        href="https://github.com/Sebastian12034"
        className="github"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon />
      </a>
 </div>
  );
}
