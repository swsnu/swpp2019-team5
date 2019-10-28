import React from "react";
import { connect } from "react-redux";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logout from "../Logout/Logout";
import Outfit from "../../Components/Outfit/Outfit";
import AddOutfit from "../../Components/AddOutfit/AddOutfit";
import * as actionCreators from "../../store/actions/index";
import "./Browse.scss";
import { SET_OUTFIT_SATISFACTION } from "../../store/actions/actionTypes";
//search-input : input (o)
//search-button : button (o)
//calendar-mode : button (o)
//outfit-preview : outfit (?)
//함수 : isSearchMode(o), onClickOutfit(o), onSearchInput(o) , onClickCalendar(o)
class Browse extends React.Component {
    componentDidMount() {
        this.props.getAllOufits();
    }
    onClickCalendar = () => {
        this.props.history.push("/calendar");
    };
    onClickOutfit = outfit => {
        this.props.selectOutfit(outfit);
        this.props.history.push("/outfit/" + outfit.id);
    };
    onSearchInput = e => {
        console.log(e.target);
        this.setState({ search_query: e.target.value });
        if (e.target.value.length >= 1) {
            this.setState({ mode: "search" }); //check whether search query exists
        } else {
            this.setState({ mode: "browse" });
        }
    };
    state = {
        mode: "browse",
        search_query: "",
    };

    render() {
        let container = null;

        const outfits = this.props.outfits.map(outfit => {
            return (
                <Outfit
                    key={outfit.id}
                    image={outfit.imageUrl}
                    satisfactionValue={outfit.satisfactionValue}
                    date={outfit.date}
                    clicked={() => this.onClickOutfit(outfit)}
                />
            );
        });

        switch (this.state.mode) {
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
                <div id="search-container">
                    <input
                        id="search-input"
                        value={this.state.search_query}
                        onChange={e => this.onSearchInput(e)}
                        placeholder="Search by tag..."
                    />{" "}
                    <button id="search-button">
                        {/*}<FontAwesomeIcon icon={faSearch} />{*/}
                    </button>
                </div>
                {container}
                {/*To */}
                <AddOutfit />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        outfits: state.outfit.outfits,
        selectedOutfit: state.outfit.selectedOutfit,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getAllOufits: () => dispatch(actionCreators.getOutfits()),
        selectOutfit: outfit =>
            dispatch(actionCreators.getSpecificOutfit(outfit.id)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Browse);
