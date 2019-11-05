import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

import Header from "../Header/Header";
import Item from "../../Components/Item/Item";

import SampleImage from "../../../src/sample/OOTD_sample.jpg";
class OutfitDetail extends Component {
    state = {
        outfit: {
            image: null,
            satisfactionValue: null,
            date: new Date(), //in sprint 4 make it changable. user can select date
            items: [
                { category: "UpperBody", tags: ["black", "T-shirt", "2019"] },
                { category: "Shoes", tags: ["black", "opentoe"] },
                { category: "LowerBody", tags: ["jeans"] },
                { category: "Accessories", tags: ["black", "golden-buckle"] },
            ],
        },
    };
    shouldComponentUpdate() {
        return true;
    }
    componentDidMount() {
        //this.props.getOutfit(this.props.match.params.id);
        //this.setState({ outfit: this.props.outfit });
    }
    render() {
        let items = this.state.outfit.items.map((item, index) => {
            return <Item item={item} key={index} editMode={false} />;
        });
        console.log(this.props);
        return (
            <div className="OutfitDetail">
                <Header />
                <div id="detail-outfit-window">
                    <img src={SampleImage} />
                </div>
                <div id="info-windw">
                    <div id="items-info-window">{items}</div>
                </div>
                <button onClick={this.onConfirmCreate} id="confirm-create-item">
                    Confirm Create
                </button>
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
)(OutfitDetail);
