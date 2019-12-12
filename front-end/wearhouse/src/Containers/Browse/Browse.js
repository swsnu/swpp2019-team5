import React from "react";
import { connect } from "react-redux";
import {
    faSearch,
    faChevronDown,
    faChevronUp,
    faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TempSlider, marks } from "./sliderStyles";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";

import Outfit from "../../Components/Outfit/Outfit";
import AddOutfit from "../../Components/AddOutfit/AddOutfit";
import Recommendation from "../Recommendation/Recommendation";
import Tag from "../../Components/Tag/Tag";

import * as actionCreators from "../../store/actions/index";
import "./Browse.scss";

class Browse extends React.Component {
    state = {
        mode: "browse",
        search_query: "",

        searchOptionsVisible: false,
        searchOptions: {
            searchMode: "Outfit",
            searchArray: [],
            tempMax: 50,
            tempMin: -30,
            satisfaction: "0",
        },
    };

    componentDidMount() {
        this.props.getAllOutfits();
    }
    onClickCalendar = () => {
        this.props.history.push("/calendar");
    };
    onClickOutfit = outfit => {
        this.props.history.push("/outfitDetail/" + outfit.id);
    };

    onSearchInput = e => {
        // deprecated?
        this.setState({ search_query: e.target.value });
        if (this.state.searchOptions.searchArray.length >= 1) {
            this.setState({ mode: "search" }); //check whether search query exists
        } else {
            //init searchOptions when searchmode is turned off
            this.setState({
                mode: "browse",
                searchOptions: {
                    searchMode: "Outfit",
                    searchArray: [],
                    tempMax: 50,
                    tempMin: -30,
                    satisfaction: "0",
                },
            });
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
        this.setState({
            searchOptions: { ...this.state.searchOptions, searchMode: value },
        });
        this.showSearchOptions();
    };

    onTempChange = (event, value) => {
        this.setState({
            searchOptions: {
                ...this.state.searchOptions,
                tempMax: value[1],
                tempMin: value[0],
            },
        });
    };

    handleRadioChange = event => {
        this.setState({
            searchOptions: {
                ...this.state.searchOptions,
                satisfaction: event.target.value, // Saved as string, need to use parseInt() to function as search filter
            },
        });
    };

    addTag = e => {
        let tags = this.state.searchOptions.searchArray;
        if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 9) {
            if (
                tags.indexOf(this.state.search_query) === -1 &&
                this.state.search_query.trim() !== ""
            ) {
                tags.push(this.state.search_query);
                this.setState({
                    searchOptions: {
                        ...this.state.searchOptions,
                        searchArray: tags,
                    },
                });
                this.setState({ mode: "search" });
            }
            e.target.value = "";
            this.setState({ search_query: "" });
        } else if (this.state.search_query === "" && e.keyCode === 8) {
            tags.pop();
            this.setState({
                searchOptions: {
                    ...this.state.searchOptions,
                    searchArray: tags,
                },
            });
            if (tags.length === 0) {
                this.setState({ mode: "browse" });
            }
        }
    };

    isMatchSearchArray = (array1, array2) => {
        return array2.every(function(value) {
            return array1.indexOf(value) >= 0;
        });
    };

    isMatchSearchFilters = outfit => {
        if (this.state.searchOptions.satisfaction === "0") {
            if (
                outfit.weather.tempAvg <= this.state.searchOptions.tempMax &&
                outfit.weather.tempAvg >= this.state.searchOptions.tempMin
            ) {
                return true;
            } else {
                return false;
            }
        } else if (
            this.state.searchOptions.satisfaction ===
            outfit.satisfactionValue + ""
        ) {
            if (
                outfit.weather.tempAvg <= this.state.searchOptions.tempMax &&
                outfit.weather.tempAvg >= this.state.searchOptions.tempMin
            ) {
                return true;
            } else {
                return false;
            }
        }
        //return true;
    };

    render() {
        let container = null;

        const outfits = this.props.outfits.reverse().map(outfit => {
            return (
                <Outfit
                    key={outfit.id}
                    image={outfit.image}
                    satisfactionValue={outfit.satisfactionValue}
                    date={outfit.date}
                    clicked={() => this.onClickOutfit(outfit)}
                />
            );
        });

        let searchQuery = this.state.searchOptions.searchArray.map(
            (tag, index) => {
                return <Tag className="tag" tag={tag} key={index} />;
            },
        );

        const searchedResultbyOutfit = this.props.outfits.map(outfit => {
            let tagList = [];
            outfit.items.forEach(item => {
                tagList.push(...item.tags);
            });
            if (
                this.isMatchSearchArray(
                    tagList,
                    this.state.searchOptions.searchArray,
                ) &&
                this.isMatchSearchFilters(outfit)
            ) {
                return (
                    <Outfit
                        key={outfit.id}
                        image={outfit.imageUrl}
                        satisfactionValue={outfit.satisfactionValue}
                        date={outfit.date}
                        clicked={() => this.onClickOutfit(outfit)}
                    />
                );
            } else {
                return null;
            }
        });

        const searchedResultbyItem = this.props.outfits.map(outfit => {
            let searched = false;
            outfit.items.forEach(item => {
                if (
                    this.isMatchSearchArray(
                        item.tags,
                        this.state.searchOptions.searchArray,
                    ) &&
                    this.isMatchSearchFilters(outfit)
                ) {
                    searched = true;
                }
            });
            if (searched) {
                return (
                    <Outfit
                        key={outfit.id}
                        image={outfit.imageUrl}
                        satisfactionValue={outfit.satisfactionValue}
                        date={outfit.date}
                        clicked={() => this.onClickOutfit(outfit)}
                    />
                );
            } else {
                return null;
            }
        });
        switch (this.state.mode) {
            case "browse":
                container = (
                    <div id="browse-outfit-list">
                        <Recommendation />
                        <div id="outfit-list">{outfits}</div>
                    </div>
                );
                break;
            case "search":
                container = (
                    <div id="search-outfit-list">
                        <div id="search-filters">
                            <div id="slider-container">
                                <div className="filter-label">
                                    Temperature Range:
                                </div>
                                <TempSlider
                                    id="slider"
                                    valueLabelDisplay="auto"
                                    orientation="vertical"
                                    max={50}
                                    min={-30}
                                    defaultValue={[-30, 50]}
                                    marks={marks}
                                    onChangeCommitted={this.onTempChange}
                                    valueLabelFormat={x => {
                                        return x + "°C";
                                    }}
                                />
                            </div>
                            <div id="satisfaction-container">
                                <div className="filter-label">
                                    Satisfaction:
                                </div>
                                <RadioGroup
                                    className="radio-group"
                                    aria-label="satisfcation"
                                    name="Satisfaction"
                                    defaultValue="0"
                                    value={
                                        this.state.searchOptions.satisfaction
                                    }
                                    onChange={this.handleRadioChange}
                                >
                                    <FormControlLabel
                                        value="0"
                                        control={<Radio disableRipple />}
                                        label="All Values"
                                    />
                                    <FormControlLabel
                                        value="1"
                                        control={<Radio disableRipple />}
                                        label="1"
                                    />
                                    <FormControlLabel
                                        value="2"
                                        control={<Radio disableRipple />}
                                        label="2"
                                    />
                                    <FormControlLabel
                                        value="3"
                                        control={<Radio disableRipple />}
                                        label="3"
                                    />
                                    <FormControlLabel
                                        value="4"
                                        control={<Radio disableRipple />}
                                        label="4"
                                    />
                                    <FormControlLabel
                                        value="5"
                                        control={<Radio disableRipple />}
                                        label="5"
                                    />
                                </RadioGroup>
                            </div>
                        </div>
                        <div id="outfit-list">
                            {this.state.searchOptions.searchMode === "Outfit"
                                ? searchedResultbyOutfit
                                : searchedResultbyItem}
                        </div>
                    </div>
                );
                break;
            default:
                break;
        }
        return (
            <div id="browse">
                <button id="calendar-button" onClick={this.onClickCalendar}>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                </button>
                <div id="search-container">
                    <div id="select-searchmode">
                        <div id="selected-option">
                            <div id="selected-text">
                                {this.state.searchOptions.searchMode}
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
                    <div id="search-input">
                        <div id="search-input-queries">{searchQuery}</div>
                        <input
                            id="search-input-text"
                            value={this.state.search_query}
                            onKeyDown={e => this.addTag(e)}
                            onChange={e => this.onSearchInput(e)}
                            placeholder="Search by tag..."
                        />
                    </div>
                    <button id="search-button">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                {container}
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
        getAllOutfits: () => dispatch(actionCreators.getOutfits()),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Browse);
