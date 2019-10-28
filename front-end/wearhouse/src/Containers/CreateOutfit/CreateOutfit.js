import React, { Component } from "react";
import { connect } from "react-redux";
import Logout from "../Logout/Logout";
import Outfit from "../../Components/Outfit/Outfit";
import Item from "../../Components/Item/Item";
import * as actionCreators from "../../store/actions/index";
//outfit-image : image ()
//edit - item : EditItem button- mode controller ()
//add - item : button - add new item ()
//delete - item : button - delete existing item ()
//confirm-create-button : load data to database ()
//if this.props.image is "" alert "please upload image first", then redirect to browse(temporal)'
// category drop down select one - upper body, lower body, full body,
class CreateOutfit extends Component {
    state = {
        image: null,
        satisfactionValue: null,
        date: Date()
            .toISOString()
            .substr(0, 10)
            .replace("T", " "),
        items: [{ category: "", tags: [] }],
    };

    componentDidMount() {
        this.setState({ image: this.props.image, items: this.props.items });
    }

    onDeleteItem(item) {
        items = this.state.items;
        items = items.filter(itm => itm !== item);
    }

    onApplyEditItem(item, edit_item) {
        items = this.state.items;
        items = items.map(itm => {
            return itm === item ? edit_item : itm;
        });
    }
    render() {
        const items = this.props.items.map(item => {
            return (
                <Item
                    item={item}
                    applyEdit={(item, edit_item) =>
                        this.onApplyEditItem(item, edit_item)
                    }
                    delete={() => this.onDeleteItem(item)}
                />
            );
        });
        return <div className="CreateOutfit"></div>;
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
