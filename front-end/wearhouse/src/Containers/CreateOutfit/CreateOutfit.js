import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../../store/actions/index";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CreateOutfit.scss";
import "./DatePicker.scss";
import { iconText } from "../Recommendation/Recommendation";

import Item from "../../Components/Item/Item";
import EditSatisfaction from "../../Components/EditSatisfaction/EditSatisfaction";
import DatePicker from "react-datepicker";
//should resolve the case where image is not porperly uploaded
class CreateOutfit extends Component {
    state = {
        image: this.props.outfit.image,
        satisfactionValue: null,
        date: new Date(),
        items: [{ category: "default", tags: [] }], //Made items section be props - everything should be props actually
        isValid: true,
        weather: { tempAvg: "", icon: "" },
        onConfirmCreate: false,
    };
    componentDidMount() {
        this.props.setWeather();
        this.checkValidation();
        this.setState({ items: this.props.outfit.items });
    }
    shouldComponentUpdate() {
        return true;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.outfit !== this.props.outfit) {
            this.setState({
                ...this.state,
                image: this.props.outfit.image,
                items:
                    this.props.outfit.items.length >= 1
                        ? this.props.items
                        : [{ category: "default", tags: [] }],
            });
        }
        if (prevState.items !== this.state.items) {
            this.checkValidation();
        }
        if (prevProps.weather !== this.props.weather) {
            this.setState({ weather: this.props.weather });
        }
        if (
            prevProps.selected_day_weather !== this.props.selected_day_weather
        ) {
            this.setState({
                weather: this.props.selected_day_weather,
            });
        }
    }
    onDeleteItem(item) {
        let items = this.state.items;
        items = items.filter(itm => itm !== item);
        this.setState({ items: items });
    }

    onApplyEditItem(item, edit_item) {
        let items = this.state.items;
        items = items.map(itm => {
            return itm === item ? edit_item : itm;
        });
        this.setState({ items: items });
    }

    addItemHandler = () => {
        const newItem = { category: "default", tags: [] };
        let items = this.state.items.concat(newItem);
        this.setState({ items: items });
    };
    handleDateChange = date => {
        this.setState({ date: date });
        if (date !== null) {
            this.props.getSpecificDayWeather(Date.parse(date) / 1000);
        } else {
            this.setState({ weather: null });
        }
    };
    checkValidation = () => {
        const items = this.state.items;
        for (var i = 0; i < items.length; i++) {
            if (items[i].category === "default" || items[i].tags.length === 0) {
                this.setState({ isValid: false });
                return false;
            }
        }
        this.setState({ isValid: true });
        return true;
    };

    handleSatisfactionEdit(num) {
        this.setState({ satisfactionValue: num });
    }
    onConfirmCreate = () => {
        this.setState({ onConfirmCreate: true });
        const newOutfit = {
            image: this.state.image ? this.state.image : "",
            satisfactionValue: this.state.satisfactionValue,
            date: this.state.date,
            items: this.state.items,
            weather:
                this.state.date !== null
                    ? {
                          tempAvg:
                              (this.props.weather.temperatureHigh +
                                  this.props.weather.temperatureLow) /
                              2,
                          icon: this.props.weather.icon,
                      }
                    : { tempAvg: null, icon: "" },
        };
        console.log(newOutfit);
        this.props.createOutfit(newOutfit);
    };

    render() {
        let items = this.state.items.map((item, index) => {
            return (
                <Item
                    item={item}
                    key={index}
                    applyEdit={edit_item =>
                        this.onApplyEditItem(item, edit_item)
                    }
                    delete={() => this.onDeleteItem(item)}
                    editMode={true}
                />
            );
        });

        return (
            <div id="create-outfit">
                <div id="create-outfit-window">
                    <div className="left-window">
                        <div className="date-picker-container">
                            <span data-tooltip-text="Date select is optional. Outfit saved without date is not interlocked with weather information so it will not be recommended to you">
                                <div>
                                    <FontAwesomeIcon
                                        id="calendar-icon"
                                        icon={faCalendarAlt}
                                    />{" "}
                                </div>
                            </span>
                            <DatePicker
                                id="date-picker"
                                isClearable
                                placeholderText="Date isn't selected  :)"
                                selected={this.state.date}
                                onChange={this.handleDateChange}
                                dateFormat="yyyy-MM-dd"
                                maxDate={new Date()}
                            />
                            {/*}<div id="weather-icon">
                                {this.state.weather !== null
                                    ? iconText[this.state.weather.icon]
                                    : null}{" "}
                                {this.state.weather &&
                                this.state.weather.temperatureLow
                                    ? this.state.weather.temperatureHigh +
                                      "/" +
                                      this.state.weather.temperatureLow
                                    : null}
                                </div>{*/}
                        </div>
                        <div id="image-window">
                            <EditSatisfaction
                                id="edit-satisfaction"
                                change={num => this.handleSatisfactionEdit(num)}
                            />
                            <img src={this.state.image} alt="outfit" />
                        </div>
                    </div>

                    <div id="info-window-wrapper">
                        <div id="info-window">
                            <div id="items-info-window">{items}</div>
                            <div className="not-info">
                                <div id="add-confirm-buttons-container">
                                    <button
                                        onClick={this.addItemHandler}
                                        id="add-item"
                                    >
                                        Add Item
                                    </button>
                                </div>
                                <div id="error-container">
                                    {!this.state.isValid && (
                                        <div className="item-error">
                                            Please select category and add at
                                            least one tag for each Item!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={this.onConfirmCreate}
                            id="confirm-create-outfit"
                            disabled={
                                !this.state.isValid ||
                                this.state.onConfirmCreate
                            }
                        >
                            Confirm Create
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setWeather: () => dispatch(actionCreators.getWeather()),
        createOutfit: outfit => dispatch(actionCreators.createOutfit(outfit)),
        getSpecificDayWeather: date =>
            dispatch(actionCreators.getSpecificDayWeather(date)),
    };
};
const mapStateToProps = state => {
    return {
        outfit: state.image.outfitData,
        weather: state.weather.todayWeather,
        selected_day_weather: state.weather.selectedDayWeather,
        newOutfit: state.outfit.selectedOutfit,
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(CreateOutfit));
