import React, { Component } from "react";

import Header from "../Header/Header";

import image from "./fashion-images.svg";
import "./LandingPage.scss";
class LandingPage extends Component {
    onLogin = () => {
        this.props.history.push("/login");
    };

    onClickSignUp = () => {
        this.props.history.push("/signup");
    };

    render() {
        return (
            <div id="Main">
                <Header />
                <div className="intro-content">
                    <div id="intro-text">
                        Get your wardrobe organized with <span>WearHouse</span>
                    </div>
                    <div id="button-container">
                        <button
                            id="login-button"
                            onClick={() => this.onLogin()}
                        >
                            Log In
                        </button>
                        <button
                            id="signup-button"
                            onClick={() => this.onClickSignUp()}
                        >
                            Sign Up
                        </button>
                    </div>
                    <img
                        id="intro-image"
                        src={image}
                        alt="Fashionable People in a list"
                    />
                </div>
                <div className="intro-content" id="content-2"></div>
                <div className="intro-content" id="content-3"></div>
                <footer></footer>
            </div>
        );
    }
}
export default LandingPage;
