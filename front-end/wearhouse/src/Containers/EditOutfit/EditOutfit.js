import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../../store/actions/index";

import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import "./DatePicker.scss";

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
    render() {
        return <div className="EditOutfit"></div>;
    }
}
export default EditOutfit;
