import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

import Header from "../Header/Header";
import Item from "../../Components/Item/Item";
class OutfitDetail extends Component {
    state = { outfit: [] };
    shouldComponentUpdate() {
        return true;
    }
    componentDidMount() {
        this.props.getOutfit(this.props.match.params.id);
        this.setState({ outfit: this.props.outfit });
    }
    render() {
        let items = this.state.outfit.items.map((item, index) => {
            return <Item item={item} key={index} editMode={false} />;
        });
        console.log(this.props);
        return (
            <div className="OutfitDetail">
                <Header />
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
