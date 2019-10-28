import React, { Component } from "react";
import { connect } from "react-redux";
import Logout from "../Logout/Logout";
import Outfit from "../../Components/Outfit/Outfit";
import * as actionCreators from "../../store/actions/index";
//outfit-image : image
//edit - item : EditItem button- mode controller
//add - item : button - add new item
//confirm-create-button : load data to database

class CreateOutfit extends Component {
    render() {
        return <div className="CreateOutfit"></div>;
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(CreateOutfit);
