import React from "react";
import { TwitterIcon, InstagramIcon, DiscordIcon } from "../../icons";

const Footer = () => {
  return (
    <div className="footer-comp flex items-center">
      <div className="wrap wrapWidth flex items-center justify-center flex-col">
        <div className="top-sec">
          <img src="/images/logo.png" className="logo-img" />
        </div>
        <div className="center-sec">
          <div className="social-icons flex items-center justify-center">
            <div className="icon">
              <a href="/">
                <TwitterIcon />
              </a>
            </div>
            <div className="icon">
              <a href="/">
                <InstagramIcon />
              </a>
            </div>
            <div className="icon">
              <a href="/">
                <DiscordIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="btm-sec flex items-center justify-center">
          <div className="rights-tag">All rights reserved</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
