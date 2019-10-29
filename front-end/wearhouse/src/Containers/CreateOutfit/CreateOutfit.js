import React, { Component } from "react";
import { connect } from "react-redux";
import Logout from "../Logout/Logout";
import Outfit from "../../Components/Outfit/Outfit";
import Item from "../../Components/Item/Item";
import * as actionCreators from "../../store/actions/index";
import SampleImage from "../../../src/sample/OOTD_sample.jpg";
//outfit-image : image ()
//edit - item : EditItem button- mode controller ====> don't need edit mode rather implemented add tag buttons.
//add - item : button - add new item ()
//delete - item : button - delete existing item (o))
//confirm-create-button : load data to database ()
//if this.props.image is "" alert "please upload image first", then redirect to browse(temporal)'
// category drop down select one - upper body, lower body, full body, (o)
class CreateOutfit extends Component {
    state = {
        image: null,
        satisfactionValue: null,
        date: "2019.10.27",
        items: [],
    };

    componentDidMount() {
        this.setState({ image: this.props.image, items: this.props.items });
    }

    onDeleteItem(item) {
        let items = this.state.items;
        items = items.filter(itm => itm !== item);
        this.setState({ items: items });
    }

    onApplyEditItem(item, edit_item) {
        console.log(item, edit_item);
        let items = this.state.items;
        items = items.map(itm => {
            return itm === item ? edit_item : itm;
        });
        this.setState({ items: items });
    }
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
                />
            );
        });
        return (
            <div className="CreateOutfit">
                <div id="image-window">
                    <img src={SampleImage} />
                </div>
                {/*originally it should be proped image.. this is just for testing due to unimplementation of DB*/}
                <div id="items-info-window">{items}</div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createOutfit: outfit => dispatch(actionCreators.createOutfit(outfit)),
    };
};

export default connect(
    null,
    mapDispatchToProps,
)(CreateOutfit);
