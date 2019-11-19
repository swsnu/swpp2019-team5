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
        category: this.props.item.category,
        tags: this.props.item.tags,
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
        this.props.applyEdit({
            category: this.state.category,
            tags: tags,
        });
    }

    //Edit Tag
    onEditTag(tag, edit_tag) {
        let tags = this.state.tags;
        tags = tags.map(tg => {
            return tg === tag ? edit_tag : tg;
        });
        this.setState({ tags: tags });
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
        if (e.keyCode === 13) {
            tags = tags.concat(e.target.value);
            this.setState({ tags: tags });
            e.target.value = "";
        }
        this.props.applyEdit({
            category: this.state.category,
            tags: tags,
        });
    }

    render() {
        let option = itemOptions.find(
            c => c.value === this.props.item.category,
        );
        console.log(option.value);
        let tags = this.state.tags.map((tag, index) => {
            return (
                <Tag
                    className="tag"
                    tag={tag}
                    key={index}
                    editMode={this.props.editMode}
                    delete={() => this.onDeleteTag(tag)}
                    edit={edit_tag => this.onEditTag(tag, edit_tag)}
                />
            );
        });
        let edit_mode_options = null;
        let tag_input = null;
        if (this.props.editMode) {
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
                <>
                    <div
                        className="item-deleter"
                        onClick={this.handleItemDelete.bind(this)}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </>
            );
        }
        return (
            <div className="Item">
                <div className="info-container">
                    <div className="position-controller">
                        <Select
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
