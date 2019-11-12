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
import SampleImage from "../../../src/sample/OOTD_sample.jpg";

//outfit-image : image (o)
//log satisfaction
//edit - item : EditItem button- mode controller ====> don't need edit mode rather implemented add tag buttons. (o)
//add - item : button - add new item (o)
//delete - item : button - delete existing item (o))
//confirm-create-button : load data to database (o)
//if this.props.image is "" alert "please upload image first", then redirect to browse(temporal)'
// category drop down select one - upper body, lower body, full body, (o)
class CreateOutfit extends Component {
    state = {
        id: this.props.outfit_id,
        image: this.props.image,
        satisfactionValue: null,
        date: new Date(), //in sprint 4 make it changable. user can select date
        items: this.props.items, //Made items section be props - everything should be props actually
    };

    shouldComponentUpdate() {
        return true;
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
    onConfirmCreate = () => {
        //please add validation whether for all items category is selected in sprint 4
        const newOutfit = {
            image: this.state.image,
            satisfactionValue: this.state.satisfactionValue,
            date: this.state.date,
            items: this.state.items,
        };
        this.props.createOutfit(this.state.id, newOutfit);
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
                            <div>
                                <FontAwesomeIcon
                                    id="calendar-icon"
                                    icon={faCalendarAlt}
                                />
                            </div>
                            <DatePicker
                                id="date-picker"
                                isClearable
                                placeholderText="Date isn't selected"
                                selected={this.state.date}
                                onChange={this.handleDateChange}
                                dateFormat="yyyy/MM/dd"
                                maxDate={new Date()}
                            />
                        </div>
                        <div id="image-window">
                            <EditSatisfaction id="edit-satisfaction" />
                            <img src={SampleImage} alt="outfit" />
                        </div>
                    </div>

                    {/*originally it should be proped image.. this is just for testing due to unimplementation of DB*/}
                    <div id="info-window">
                        <div id="items-info-window">{items}</div>
                        <div id="add-confirm-buttons-container">
                            <button onClick={this.addItemHandler} id="add-item">
                                Add Item
                            </button>
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
        createOutfit: (id, outfit) =>
            dispatch(actionCreators.temporaryCreateOutfit(id, outfit)),
    };
};
const mapStateToProps = state => {
    let outfit = state.outfit.outfits[state.outfit.outfits.length - 1];
    return {
        outfit_id: outfit.id,
        image: outfit.image,
        items: [
            { category: "UpperBody", tags: ["black"] },
            { category: "Shoes", tags: ["black", "open"] },
            { category: "LowerBody", tags: ["jeans", "blue"] },
            { category: "Accessories", tags: ["black", "golden-buckle"] },
            { category: "Accessories", tags: ["bag", "shoulder"] },
        ],
        //just for mid demo
        // it should be -> items: outfit.items,
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(CreateOutfit));
