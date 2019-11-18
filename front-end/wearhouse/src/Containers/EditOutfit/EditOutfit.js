import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../../store/actions/index";

import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../CreateOutfit/DatePicker.scss";
import "./EditOutfit.scss";

import Header from "../Header/Header";
import Item from "../../Components/Item/Item";
import EditSatisfaction from "../../Components/EditSatisfaction/EditSatisfaction";
import DatePicker from "react-datepicker";

// 1. 대략적인 design 짜기
// 2. Action creator 만들기
// 3. Edit all, edit one 짜기
// 4. state = {}
// 5. Detail 에서 누르고 나면 여기로 넘어간다.
// 6.

class EditOutfit extends Component {
    state = {
        outfit: {
            image: null,
            satisfactionValue: null,
            date: "", //in sprin
            items: [],
            weather: {},
        },
    };

    componentDidMount() {
        // this.props.getOutfit(this.props.match.params.id); before push erase //..
        this.setState({ outfit: this.props.outfit });
    }
    render() {
        let items = this.state.outfit.items.map((item, index) => {
            return <Item item={item} key={index} editMode={true} />;
        });
        return (
            <div className="EditOutfit">
                <Header />
                <div id="edit-outfit-window">
                    <div className="left-window">
                        <div className="date-picker-container">
                            <span data-tooltip-text="Date select is optional. Outfit saved without date is not interlocked with weather information so it will not be recommended to you">
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
                        </div>
                        <div id="image-window">
                            <EditSatisfaction id="edit-satisfaction" />
                            <img src={this.state.image} alt="outfit" />
                        </div>
                    </div>

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
                                        Please select category and add at least
                                        one tag for each Item!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={this.onConfirmCreate}
                        id="confirm-create-item"
                    >
                        Confirm Create
                    </button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOutfit: id => dispatch(actionCreators.getSpecificOutfit(id)),
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
)(withRouter(EditOutfit));
