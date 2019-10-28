import React, { Component } from "react";
import { connect } from "react-redux";
import Logout from "../Logout/Logout";
import Outfit from "../../Components/Outfit/Outfit";
import * as actionCreators from "../../store/actions/index";
//outfit-image : image ()
//edit - item : EditItem button- mode controller ()
//add - item : button - add new item ()
//confirm-create-button : load data to database ()

class CreateOutfit extends Component {
    componentDidMount() {}
    state = {
        author_id: null,
        image: null,
        satisfactionValue: null,
        date: outfit.date,
        items: [{ category: "", tags: [] }],
    };
    render() {
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
