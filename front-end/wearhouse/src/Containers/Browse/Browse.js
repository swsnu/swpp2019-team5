import React from "react";
import { connect } from "react-redux";
import Logout from "../Logout/Logout";
import Outfit from "../../Components/Outfit/Outfit";
import AddOutfit from "../../Components/AddOutfit/AddOutfit";
import * as actionCreators from "../../store/actions/index";
import "./Browse.scss";
//search-input : input
//search-button : button
//calendar-mode : button (o)
//outfit-preview : outfit (o)
//함수 : isSearchMode(o), onClickOutfit(o), onSearchInput(), onClickCalendar()
class Browse extends React.Component {
    onClickCalendar = () => {
        this.props.history.push("/calendar");
    };

    onSearchInput = () => {
        this.setState({ mode: "search" });
    };

    state = {
        mode: "browse"
    };

    render() {
        let container = null;

        const outfits = this.props.outfits.map(outfit => {
            return (
                <Outfit
                    key={outfit.id}
                    image={outfit.imageUrl}
                    satisfactionValue={outfit.satisfactionValue}
                    clicked={() => this.onClickOutfit(outfit)}
                />
            );
        });

        switch (this.state.tab) {
            case "browse":
                container = <div id="outfit-list">{outfits}</div>;
                break;
            case "search":
                /*show the search result : container = ~~~ */
                break;
            default:
                break;
        }
        return (
            <div id="browse">
                <Logout />
                <button id="calendar-button" onClick={this.onClickCalendar}>
                    view calendar
                </button>
                {container}
                <input id="search-input" />
                <AddOutfit />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        outfits: state.outfit.outfits,
        selectedOutfit: state.outfit.selectedOutfit
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getAllOufits: () => dispatch(actionCreators.getOutfits()),
        selectOutfit: outfit =>
            dispatch(actionCreators.getSpecificOutfit(outfit.id))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Browse);
