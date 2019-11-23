import React from "react";
import { connect } from "react-redux";
import {
    faSearch,
    faChevronDown,
    faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Outfit from "../../Components/Outfit/Outfit";
import AddOutfit from "../../Components/AddOutfit/AddOutfit";
import Recommendation from "../Recommendation/Recommendation";

import * as actionCreators from "../../store/actions/index";
import "./Browse.scss";

//search-input : input (o)
//search-button : button (o)
//calendar-mode : button (o)
//outfit-preview : outfit (?)
//함수 : isSearchMode(o), onClickOutfit(o), onSearchInput(o) , onClickCalendar(o)

class Browse extends React.Component {
    state = {
        mode: "browse",
        search_query: "",
        searchMode: "Outfit",
        searchOptionsVisible: false,
    };

    componentDidMount() {
        this.props.getAllOufits();
    }
    onClickCalendar = () => {
        this.props.history.push("/calendar");
    };
    onClickOutfit = outfit => {
        this.props.selectOutfit(outfit);
        this.props.history.push("/outfitDetail/" + outfit.id);
    };
    onSearchInput = e => {
        this.setState({ search_query: e.target.value });
        if (e.target.value.length >= 1) {
            this.setState({ mode: "search" }); //check whether search query exists
        } else {
            this.setState({ mode: "browse" });
        }
    };

    showSearchOptions = () => {
        if (this.state.searchOptionsVisible) {
            this.setState({
                searchOptionsVisible: false,
            });
        } else {
            this.setState({
                searchOptionsVisible: true,
            });
        }
    };

    onSelectSearchOption = value => {
        this.setState({ searchMode: value });
        this.showSearchOptions();
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
                container = (
                    <div id="outfit-list">
                        <Recommendation />
                        {outfits}
                    </div>
                );
                break;
            case "search":
                container = <div id="outfit-list"></div>;
                /*show the search result : container = ~~~ */
                break;
            default:
                break;
        }
        return (
            <div id="browse">
                <div id="search-container">
                    <div id="select-searchmode">
                        <div id="selected-option">
                            <div id="selected-text">
                                {this.state.searchMode}
                            </div>
                            <div
                                id="selectButton"
                                onClick={() => this.showSearchOptions()}
                            >
                                {!this.state.searchOptionsVisible ? (
                                    <FontAwesomeIcon icon={faChevronDown} />
                                ) : (
                                    <FontAwesomeIcon icon={faChevronUp} />
                                )}
                            </div>
                        </div>
                        <div
                            id="dropdown-selection"
                            className={this.state.searchOptionsVisible.toString()}
                        >
                            <div
                                className="option"
                                onClick={() =>
                                    this.onSelectSearchOption("Outfit")
                                }
                            >
                                Outfit
                            </div>
                            <div
                                className="option"
                                onClick={() =>
                                    this.onSelectSearchOption("Item")
                                }
                            >
                                Item
                            </div>
                        </div>
                    </div>
                    <input
                        id="search-input"
                        value={this.state.search_query}
                        onChange={e => this.onSearchInput(e)}
                        placeholder="Search by tag..."
                    />{" "}
                    <button id="search-button">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <button id="calendar-button" onClick={this.onClickCalendar}>
                    view calendar
                </button>
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
