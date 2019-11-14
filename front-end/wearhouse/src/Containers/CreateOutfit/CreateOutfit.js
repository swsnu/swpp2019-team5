import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../../store/actions/index";

import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CreateOutfit.scss";
import "./DatePicker.scss";

import Header from "../Header/Header";
import Item from "../../Components/Item/Item";
import EditSatisfaction from "../../Components/EditSatisfaction/EditSatisfaction";
import DatePicker from "react-datepicker";
//should resolve the case where image is not porperly uploaded

class CreateOutfit extends Component {
    state = {
        image: this.props.image,
        satisfactionValue: null,
        date: new Date(), //in sprint 4 make it changable. user can select date
        items: this.props.items ? this.props.items : [], //Made items section be props - everything should be props actually
        isValid: true,
    };

    shouldComponentUpdate() {
        return true;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.items !== this.state.items) {
            this.checkValidation();
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
        this.setState({
            date: date,
        });
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
    onConfirmCreate = () => {
        if (!this.checkValidation()) return;
        //please add validation whether for all items category is selected in sprint 4
        const newOutfit = {
            image: this.state.image,
            satisfactionValue: this.state.satisfactionValue,
            date: this.state.date,
            items: this.state.items,
        };
        this.props.createOutfit(newOutfit);
        this.props.history.push("/outfitDetail/" + this.state.id);
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
                <Header />
                <div id="create-outfit-window">
                    <div className="left-window">
                        <div className="date-picker-container">
                            <span data-tooltip-text="Date select is optional. Outfit saved without date is not interlocked with weather information so it won't be recommended to you">
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
                                selected={this.state.date}
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

                    {/*originally it should be proped image.. this is just for testing due to unimplementation of DB*/}
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
        createOutfit: outfit => dispatch(actionCreators.createOutfit(outfit)),
    };
};
const mapStateToProps = state => {
    // let outfit = outfit
    // return {
    //     image: outfit.image,
    //     items: outfit.items,
    // };
    return {
        selectedOutfit: state.outfit.selectedOutfit, // temporary code
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(CreateOutfit));
