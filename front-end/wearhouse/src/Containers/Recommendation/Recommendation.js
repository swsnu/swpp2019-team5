import React from "react";
import { connect } from "react-redux";

import "./Recommendation.scss";

class Recommendation extends React.Component {
    render() {
        return (
            <div id="recommendation">
                <div id="recommendation-text"></div>
                <div id="recommendation-container"></div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        outfits: state.outfit.outfits,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllOufits: () => dispatch(actionCreators.getOutfits()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Recommendation);
