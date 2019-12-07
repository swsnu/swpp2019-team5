import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import moment from "moment";

import NavigationButton from "../../Components/NavigationButton/NavigationButton";
import Item from "../../Components/Item/Item";
import AddOutfit from "../../Components/AddOutfit/AddOutfit";
import Satisfaction from "../../Components/Satisfaction/Satisfaction";
import "./OutfitDetail.scss";
import {
    faSun,
    faMoon,
    faUmbrella,
    faSnowflake,
    faCloudShowersHeavy,
    faWind,
    faSmog,
    faCloud,
    faCloudSun,
    faCloudMoon,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

var iconText = {
    "clear-day": <FontAwesomeIcon icon={faSun} />,
    "clear-night": <FontAwesomeIcon icon={faMoon} />,
    rain: <FontAwesomeIcon icon={faUmbrella} />,
    snow: <FontAwesomeIcon icon={faSnowflake} />,
    sleet: <FontAwesomeIcon icon={faCloudShowersHeavy} />,
    wind: <FontAwesomeIcon icon={faWind} />,
    fog: <FontAwesomeIcon icon={faSmog} />,
    cloudy: <FontAwesomeIcon icon={faCloud} />,
    "partly-cloudy-day": <FontAwesomeIcon icon={faCloudSun} />,
    "partly-cloudy-night": <FontAwesomeIcon icon={faCloudMoon} />,
};

class OutfitDetail extends Component {
    state = {
        outfit: {
            image: this.props.outfit.image,
            satisfactionValue: null,
            date: "", //in sprin
            items: [],
            weather: {},
        },
    };
    shouldComponentUpdate() {
        return true;
    }
    componentDidMount() {
        this.props.getOutfit(this.props.match.params.id);
        this.setState({ outfit: this.props.outfit });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.outfit !== this.props.outfit) {
            this.setState({ outfit: this.props.outfit });
        }

        if (prevProps.outfit.image !== this.props.outfit.image) {
            this.setState({ image: this.props.outfit.image });
        }
    }

    onEdit = () => {
        this.props.history.push("/editOutfit/" + this.props.match.params.id);
    };

    onDelete = () => {
        this.props.deleteOutfit(this.props.match.params.id);
        this.props.history.push("/browse");
    };
    render() {
        let items = this.state.outfit.items.map((item, index) => {
            return <Item item={item} key={index} editMode={false} />;
        });
        console.log(this.props.outfit.date, "detail date");
        return (
            <div id="outfit-detail">
                <NavigationButton buttonName="Go Back" />
                <div id="detail-outfit-window">
                    <div id="image-window">
                        <Satisfaction
                            value={this.state.outfit.satisfactionValue}
                        />
                        <img src={this.props.outfit.image} alt="outfit" />

                        <label id="date">
                            {this.state.outfit.date
                                ? moment(this.state.outfit.date).format("LL")
                                : "Date is not selected"}

                            {this.state.outfit.date && (
                                <div id="weather-icon">
                                    {iconText[this.state.outfit.weather.icon]}
                                </div>
                            )}
                        </label>
                    </div>
                    {/*originally it should be proped image.. this is just for testing due to unimplementation of DB*/}

                    <div id="info-window">
                        <div id="items-info-window">{items}</div>
                        <div id="button-group">
                            <button
                                onClick={this.onDelete}
                                id="delete-outfit-button"
                            >
                                Delete
                            </button>
                            <button
                                onClick={this.onEdit}
                                id="edit-outfit-button"
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                    <AddOutfit />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOutfit: id => dispatch(actionCreators.getSpecificOutfit(id)),
        deleteOutfit: id => dispatch(actionCreators.deleteOutfit(id)),
    };
};

const mapStateToProps = state => {
    return {
        outfit: state.outfit.selectedOutfit,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OutfitDetail);
