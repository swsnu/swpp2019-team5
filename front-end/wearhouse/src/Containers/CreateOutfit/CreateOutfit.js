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
        date: "2019.10.27",
        items: [],
    };

    componentDidMount() {
        this.setState({ image: this.props.image, items: this.props.items });
    }

    onDeleteItem(item) {
        let items = this.state.items;
        console.log(items);
        items = items.filter(itm => itm !== item);
        console.log(items);
        this.setState({ items: items });
    }

    onApplyEditItem(item, edit_item) {
        let items = this.state.items;
        items = items.map(itm => {
            return itm === item ? edit_item : itm;
        });
        this.setState({ items: items });
    }
    render() {
        let items = this.state.items.map(item => {
            return (
                <Item
                    item={item}
                    key={this.state.items.indexOf(item)}
                    applyEdit={edit_item =>
                        this.onApplyEditItem(item, edit_item)
                    }
                    delete={() => this.onDeleteItem(item)}
                />
            );
        });
        return <div className="CreateOutfit">{items}</div>;
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
