import React, { Component } from "react";
import Tag from "../Tag/Tag";
import "./Item.scss";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { itemStyles, itemOptions } from "./SelectStyle";
import Select from "react-select";
//props : item, applyEdit(edit_item), delete
// further task #1 check whether input tag is existing in database (maybe Sprint4)

class Item extends Component {
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
        category: "default",
        tags: this.props.item.tags,
        todo: "editEnabled", //the mode where user enters after clicing button
    };

    componentDidMount() {
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
            tags.push(e.target.value);
            this.setState({ tags: tags });
            e.target.value = "";

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

    render() {
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
                    className="tag-input"
                    type="text"
                    placeholder="Enter tag.."
                    //onChange = further task #1
                    onKeyDown={e => this.addTag(e)}
                ></input>
            );
        }
        if (this.props.editMode) {
            edit_mode_options = (
                <div
                    className="item-deleter"
                    onClick={this.handleItemDelete.bind(this)}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            );
        }
        return (
            <div className="Item">
                <div className="info-container">
                    <div className="position-controller">
                        <Select
                            isDisabled={!this.props.editMode}
                            className="Select"
                            defaultValue={itemOptions.find(
                                c => c.value === this.props.item.category,
                            )}
                            label="Category"
                            options={itemOptions}
                            styles={itemStyles}
                            onChange={e => this.handleCategoryChange(e)}
                        />
                    </div>

                    <div className="tag-container">
                        <div className="tag-area">{tags}</div>
                        {tag_input}
                    </div>
                    {edit_mode_options}
                </div>
            </div>
        );
    }
}
export default Item;
