import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../../store/actions/index";

import { faCalendarAlt, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../CreateOutfit/DatePicker.scss";
import "./EditOutfit.scss";
import { iconText } from "../Recommendation/Recommendation";

import Item from "../../Components/Item/Item";
import EditSatisfaction from "../../Components/EditSatisfaction/EditSatisfaction";
import DatePicker from "react-datepicker";
import PopUp from "../../Components/PopUp/PopUp";

class EditOutfit extends Component {
    state = {
        outfit: {
            image: null,
            satisfactionValue: null,
            date: "", //in sprin
            items: [],
            weather: {},
        },
        original_outfit: this.props.outfit,
        isValid: true,
        popUp: null,
    };

    onCancelEdit = () => {
        this.setState({
            popUp: (
                <PopUp
                    onClosePopUp={this.handlePopUpClose}
                    onProceedCancel={this.handleCancel}
                    message="You will lose your data.  Are you sure?"
                />
            ),
        });
    };

    handleCancel = () => {
        this.props.history.push("/browse");
    };
    handlePopUpClose = () => {
        this.setState({ popUp: null });
    };
    componentDidMount() {
        this.props.getOutfit(this.props.match.params.id);
        let date = this.props.outfit.date;
        if (date !== null) {
            let date_arr = date.split("-");
            date_arr[2] = date_arr[2].substring(0, 2);
            date_arr[1] = (parseInt(date_arr[1]) - 1).toString();
            date = new Date(date_arr[0], date_arr[1], date_arr[2], 12);
        }
        let outfit = { ...this.props.outfit, date: date };
        this.setState({ outfit: outfit });
        console.log(outfit);
    }
    shouldComponentUpdate() {
        return true;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.outfit.items !== this.state.outfit.items) {
            this.checkValidation();
        }
        if (prevProps.weather !== this.props.weather) {
            this.setState({
                outfit: { ...this.state.outfit, weather: this.props.weather },
            });
        }
    }
    handleSatisfactionEdit(num) {
        this.setState({
            outfit: { ...this.state.outfit, satisfactionValue: num },
        });
    }
    onInitializeOutfit = () => {
        this.setState({
            outfit: this.props.outfit,
        });
    };
    onDeleteItem(item) {
        let items = this.state.outfit.items;
        items = items.filter(itm => itm !== item);
        this.setState({ outfit: { ...this.state.outfit, items: items } });
    }
    addItemHandler = () => {
        const newItem = { category: "default", tags: [] };
        let items = this.state.outfit.items.concat(newItem);
        this.setState({ outfit: { ...this.state.outfit, items: items } });
    };
    handleDateChange = date => {
        this.setState({
            outfit: { ...this.state.outfit, date: date },
        });
        if (date !== null)
            this.props.getSpecificDayWeather(Date.parse(date) / 1000);
        /*if (date !== null) {
            this.props.getSpecificDayWeather(Date.parse(date) / 1000);
        } else {
            this.setState({ outfit: { ...this.state.outfit, weather: null } });
        }*/
    };
    checkValidation = () => {
        const items = this.state.outfit.items;
        for (var i = 0; i < items.length; i++) {
            if (items[i].category === "default" || items[i].tags.length === 0) {
                this.setState({ isValid: false });
                return false;
            }
        }
        this.setState({ isValid: true });
        return true;
    };

    onApplyEditItem(item, edit_item) {
        let items = this.state.outfit.items;
        items = items.map(itm => {
            return itm === item ? edit_item : itm;
        });
        this.setState({ outfit: { ...this.state.outfit, items: items } });
    }

    onConfirmEdit = () => {
        console.log(this.props.weather);
        const edittedOutfit = {
            id: this.state.outfit.id,
            image: this.state.outfit.image,
            satisfactionValue: this.state.outfit.satisfactionValue,
            date: this.state.outfit.date,
            items: this.state.outfit.items,
            weather:
                this.state.outfit.date === null
                    ? { tempAvg: null, icon: "" }
                    : this.props.weather
                    ? {
                          tempAvg:
                              (this.props.weather.temperatureHigh +
                                  this.props.weather.temperatureLow) /
                              2,
                          icon: this.props.weather.icon,
                      }
                    : {
                          tempAvg: this.state.outfit.weather.tempAvg,
                          icon: this.state.outfit.weather.icon,
                      },
        };

        console.log(edittedOutfit);
        this.props.confirmEdit(edittedOutfit);
    };
    render() {
        let items = this.state.outfit.items.map((item, index) => {
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
            <div className="EditOutfit">
                {this.state.popUp}
                <div id="edit-outfit-window">
                    <div className="left-window">
                        <div className="date-picker-container">
                            <span data-tooltip-text="Date select is optional">
                                <div>
                                    <FontAwesomeIcon
                                        id="calendar-icon"
                                        icon={faCalendarAlt}
                                    />
                                </div>
                            </span>

                            <DatePicker
                                id="date-picker"
                                isClearable
                                placeholderText="Date isn't selected  :)"
                                selected={this.state.outfit.date}
                                onChange={this.handleDateChange}
                                dateFormat="yyyy/MM/dd"
                                maxDate={new Date()}
                            />
                            {/*}<div id="weather-icon">
                                {this.state.outfit.date !== null
                                    ? iconText[this.state.outfit.weather.icon]
                                    : null}{" "}
                                {this.state.outfit.date !== null &&
                                this.props.weather
                                    ? this.props.weather.temperatureHigh +
                                      "/" +
                                      this.props.weather.temperatureLow
                                    : null}
                            </div>{*/}
                        </div>
                        <div id="image-window">
                            <EditSatisfaction
                                id="edit-satisfaction"
                                satisfactionValue={
                                    this.props.outfit.satisfactionValue
                                }
                                change={num => this.handleSatisfactionEdit(num)}
                            />
                            <img src={this.props.outfit.image} alt="outfit" />
                        </div>
                    </div>

                    <div id="info-window">
                        <div id="initialize-outfit-button-container">
                            <button
                                data-tooltip-text="initialize outfit to original state"
                                onClick={this.onInitializeOutfit}
                                className="small-button"
                                id="initialize-button"
                            >
                                <FontAwesomeIcon
                                    id="initialize-icon"
                                    icon={faUndo}
                                />
                            </button>
                        </div>
                        <div id="items-info-window">{items}</div>
                        <div className="not-info">
                            <div id="add-confirm-button-container">
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
                                        Please select category and add at least
                                        one tag for each Item!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div id="button-container">
                        <button
                            onClick={this.onConfirmEdit}
                            id="confirm-edit-outfit"
                        >
                            Confirm Edit
                        </button>
                        <button
                            onClick={this.onCancelEdit}
                            id="cancel-edit-outfit"
                        >
                            Cancel Edit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSpecificDayWeather: date =>
            dispatch(actionCreators.getSpecificDayWeather(date)),
        confirmEdit: outfit => {
            dispatch(actionCreators.editOutfit(outfit));
        },
        getOutfit: id => dispatch(actionCreators.getSpecificOutfit(id)),
    };
};
const mapStateToProps = state => {
    return {
        outfit: state.outfit.selectedOutfit,
        weather: state.weather.selectedDayWeather,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(EditOutfit));
