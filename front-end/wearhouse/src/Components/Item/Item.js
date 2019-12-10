import { connect } from "react-redux";
import React, { Component } from "react";
import Tag from "../Tag/Tag";
import Option from "../Option/Option";
import "./Item.scss";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { itemStyles, itemOptions } from "./SelectStyle";
import Select from "react-select";
import { setTimeout } from "timers";
//props : item, applyEdit(edit_item), delete
// further task #1 check whether input tag is existing in database (maybe Sprint4)

class Item extends Component {
    //props에 whole item list 있어야함
    shouldComponentUpdate() {
        return true;
    }
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps)
            this.setState({
                category: this.props.item.category,
                tags: this.props.item.tags,
            });
    }

    state = {
        show: false,
        preventBlur: false,
        category: this.props.item.category,
        tags: this.props.item.tags,
        todo: "editEnabled",
        item_list: this.props.item_list,
        option_list: this.props.option_list,
    };

    componentDidMount() {
        if (this.state.tags.length >= 3) {
            this.setState({ todo: "editDisabled" });
        }
        this.setState({
            category: this.props.item.category,
            tags: this.props.item.tags,
        });
    }
    handleCategoryChange(event) {
        this.setState({ category: event.value });

        this.props.applyEdit({
            category: event.value,
            tags: this.state.tags,
        });
    }

    //Delete Tag
    onDeleteTag(tag) {
        let tags = this.state.tags;
        tags = tags.filter(tg => tg !== tag);
        this.setState({ tags: tags });
        if (tags.length < 3) {
            this.setState({ todo: "editEnabled" });
        }
        this.props.applyEdit({
            category: this.state.category,
            tags: tags,
        });
    }

    handleItemDelete() {
        this.props.delete();
        this.setState({
            category: this.props.item.category,
            tags: this.props.item.tags,
        });
    }
    //add Tag
    addTag(e) {
        let tags = this.state.tags;
        if (
            (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 9) &&
            e.target.value !== ""
        ) {
            var new_tag = e.target.value.replace(/\s*$/, "");
            if (new_tag.length === 0) {
                e.target.value = null;
                this.setState({ tag_input_text: "" });
                e.target.focus();
                return;
            }
            new_tag = new_tag.toLowerCase();
            if (tags.includes(new_tag)) {
                e.target.value = "Tag should be unique!";
                e.target.disabled = true;
                e.persist();
                setTimeout(() => {
                    e.target.value = null;
                    e.target.disabled = false;
                    e.target.focus();
                }, 700);
                return;
            }
            tags = tags.concat(new_tag);
            this.setState({ tags: tags });
            e.target.value = null;

            if (tags.length >= 3) {
                this.setState({ todo: "editDisabled" });
            }
        } else if (e.target.value === "" && e.keyCode === 8) {
            tags.pop();
            this.setState({ tags: tags });
            if (tags.length < 3) {
                this.setState({ todo: "editEnabled" });
            }
        }
        this.props.applyEdit({
            category: this.state.category,
            tags: tags,
        });
    }
    handleAutoComplete = e => {
        console.log(e.target.value);
        //let option_list = this.state.tags.concat(e.target.value);
        //should implement autocomplete feature (from TaeWon's work)
        //autocomplete candidates should be set in option list
    };

    handleBlur = () => {
        if (!this.state.preventBlur) this.setState({ show: false });
    };

    setItem(op) {
        this.setState({ show: false });
        this.props.applyEdit({
            category: this.state.category,
            tags: op.tags,
        });
        this.setState({ preventBlur: false });
    }

    show = false;

    render() {
        let auto_complete = this.state.option_list.map((op, index) => {
            return (
                <Option
                    key={index}
                    click={() => this.setItem(op)}
                    option={op}
                    activateBlur={() => this.setState({ preventBlur: false })}
                    preventBlur={() => this.setState({ preventBlur: true })}
                />
            );
        });
        auto_complete = <div id="option-group">{auto_complete}</div>;
        let option = itemOptions.find(
            c => c.value === this.props.item.category,
        );
        let tags = this.state.tags.map((tag, index) => {
            return (
                <Tag
                    className="tag"
                    tag={tag}
                    key={index}
                    editMode={this.props.editMode}
                    delete={() => this.onDeleteTag(tag)}
                />
            );
        });
        let edit_mode_options = null;
        let tag_input = null;

        if (this.props.editMode && this.state.todo === "editEnabled") {
            tag_input = (
                <input
                    ref={input => {
                        this.input_bar = input;
                    }}
                    className="tag-input"
                    type="text"
                    placeholder="Enter tag.."
                    onChange={e => this.handleAutoComplete(e)}
                    onKeyUp={e => this.addTag(e)}
                    autoComplete="on"
                    onFocus={() => {
                        this.setState({ show: true });
                    }}
                    onBlur={this.handleBlur}
                />
            );
        }
        if (this.props.editMode) {
            edit_mode_options = (
                <div
                    className="item-deleter"
                    onClick={this.handleItemDelete.bind(this)}
                >
                    <span id="item-delete" data-tooltip-text="Delete Item">
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </div>
            );
        }
        return (
            <div className="Item">
                <div className="info-container">
                    <div className="position-controller">
                        <Select
                            menuIsOpen={this.props.menuIsOpen}
                            isDisabled={!this.props.editMode}
                            className="Select"
                            value={option}
                            selected={option}
                            label="Category"
                            options={itemOptions}
                            styles={itemStyles}
                            onChange={e => this.handleCategoryChange(e)}
                        />
                    </div>

                    <div className="tag-container">
                        <div className="tag-area">
                            {tags}
                            {tag_input}
                        </div>

                        <div id="options">
                            {this.state.show &&
                            this.state.option_list.length >= 1
                                ? auto_complete
                                : null}
                        </div>
                    </div>
                    {edit_mode_options}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        option_list: state.item.option_list,
    };
};
export default connect(
    mapStateToProps,
    null,
)(Item);
