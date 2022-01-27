import React from "react";
import './Footer.css'
import {FaLinkedin, FaFacebookSquare} from 'react-icons/fa'
const Footer = () => {
  return (
    <div>
      <div class=" pt-5 pb-5 footer">
        <div class="container">
          <div class="row">
            <div class="col-lg-5 col-xs-12 about-company">
              <h2>TravelTime</h2>
              <p class="pr-5 text-white-50">
                Traveltime a website where you can share your travel story. You can other stories so you can know about various travel spots{" "}
              </p>
              <p>
                <a href="facebook.com">
                  <FaFacebookSquare className="fs-3 me-2" />
                </a>
                <a href="facebook.com">
                  <FaLinkedin className="fs-3" />
                </a>
              </p>
            </div>
            <div class="col-lg-3 col-xs-12 links">
              <h4 class="mt-lg-0 mt-sm-3">Links</h4>
              <ul class="m-0 p-0">
                <li>
                  - <a href="/">About us</a>
                </li>
                <li>
                  - <a href="/">Contact</a>
                </li>
                <li>
                  - <a href="/">FAQ</a>
                </li>
                <li>
                  - <a href="/">Privacy Policy</a>
                </li>
                <li>
                  - <a href="/">Terms & conditions</a>
                </li>
                <li>
                  - <a href="/">Donate us</a>
                </li>
              </ul>
            </div>
            <div class="col-lg-4 col-xs-12 location">
              <h4 class="mt-lg-0 mt-sm-4">Location</h4>
              <p>22, molla ali road, Dhaka, Bangladesh</p>
              <p class="mb-0">
                <i class="fa fa-phone mr-3"></i>(541) 754-3010
              </p>
              <p>
                <i class="fa fa-envelope-o mr-3"></i>info@traveltime.com
              </p>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col copyright">
              <p class="">
                <small class="text-white-50">
                  © 2019. All Rights Reserved.
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
