import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

import Header from "../Header/Header";
import Item from "../../Components/Item/Item";
import AddOutfit from "../../Components/AddOutfit/AddOutfit";
import Satisfaction from "../../Components/Satisfaction/Satisfaction";
import "./OutfitDetail.scss";

class OutfitDetail extends Component {
    state = {
        outfit: {
            image: null,
            satisfactionValue: null,
            date: "", //in sprint 4 make it changable. user can select date
            items: [],
        },
    };
    shouldComponentUpdate() {
        return true;
    }
    componentDidMount() {
        this.props.getOutfit(this.props.match.params.id);
        this.setState({ outfit: this.props.outfit });
    }
    onEdit = () => {
        this.props.history.push("/editOutfit/" + this.props.match.params.id);
    };

    onDelete = () => {
        this.props.deleteOutfit(this.props.match.params.id);
        this.props.history.push("/browse");
    };
    render() {
        let items = this.state.outfit.items.map((item, index) => {
            return <Item item={item} key={index} editMode={false} />;
        });
        return (
            <div id="outfit-detail">
                <Header />
                <div id="detail-outfit-window">
                    <div id="image-window">
                        <Satisfaction
                            value={this.state.outfit.satisfactionValue}
                        />
                        <img src={this.state.image} alt="outfit" />

                        <label id="date">{this.state.outfit.date}</label>
                    </div>
                    {/*originally it should be proped image.. this is just for testing due to unimplementation of DB*/}

                    <div id="info-window">
                        <div id="items-info-window">{items}</div>
                    </div>
                    <div id="button-group">
                        <button
                            onClick={this.onDelete}
                            id="delete-outfit-button"
                        >
                            Delete
                        </button>
                        <button onClick={this.onEdit} id="edit-outfit-button">
                            Edit
                        </button>
                    </div>
                    <AddOutfit />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOutfit: id => dispatch(actionCreators.getSpecificOutfit(id)),
        deleteOutfit: id => dispatch(actionCreators.deleteOutfit(id)),
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
)(OutfitDetail);
