import React, { Component } from "react";
import {
    faTags,
    faCloudSun,
    faLaptopCode,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import image from "./fashion-images.svg";
import "./LandingPage.scss";
class LandingPage extends Component {
    render() {
        return (
            <div id="Main">
                <div className="intro-content">
                    <div id="intro-text">
                        Get your wardrobe organized with <br />
                        <span>WearHouse</span>
                    </div>
                    <div id="image-container">
                        <img
                            id="intro-image"
                            src={image}
                            alt="Fashionable People in a list"
                        />
                    </div>
                </div>
                <div className="intro-content" id="content-2">
                    <h1>
                        We aim to provide a comprehensive experience where your
                        wardrobe is transformed into a database
                    </h1>
                    <div id="information-wrapper">
                        <div className="features-info">
                            <div className="features-icon">
                                <FontAwesomeIcon icon={faTags} />
                            </div>
                            <h4>3-level classification</h4>
                            Users can assign and edit categories as specifically
                            or as broadly as they want. <br />
                            {/* Users are able to use the following classification
                            levels to organize their wardrobe.
                            <ul>
                                <li>Outfits</li>
                                <li>Items</li>
                                <li>Tags</li>
                            </ul> */}
                        </div>
                        <div className="features-info">
                            <div className="features-icon">
                                <FontAwesomeIcon icon={faLaptopCode} />
                            </div>
                            <h4>Auto-tagging</h4>
                            Automatic characterization provided through a
                            Machine Learning based Image Recognition Algorithm
                        </div>
                        <div className="features-info">
                            <div className="features-icon">
                                <FontAwesomeIcon icon={faCloudSun} />
                            </div>
                            <h4>Outfit Recommendation</h4>
                            Weather and satisfaction-based outfit classificaton
                            and recommendation to free you from the burden of
                            choosing for the weather.
                        </div>
                    </div>
                </div>
                <div className="intro-content" id="content-3">
                    <h1>Demo video</h1>
                    <iframe
                        // width="560"
                        // height="315"
                        src="https://www.youtube.com/embed/4IT6CQgjgUo"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="demo-video"
                    ></iframe>
                </div>
                <footer>
                    <div id="footericon"></div>
                    <div id="footertext">
                        &copy; SWPP Team WearHouse, 2019
                        {/* <br />
                        <br />
                        Image Recognition API credit:{" "}
                        <a
                            href="https://algorithmia.com/algorithms/algorithmiahq/DeepFashion"
                            target="blank"
                        >
                            DeepFashion
                        </a>
                        <br />
                        Weather API credit:{" "}
                        <a href="https://darksky.net/" target="blank">
                            DarkSky
                        </a> */}
                    </div>
                </footer>
            </div>
        );
    }
}

export default LandingPage;
