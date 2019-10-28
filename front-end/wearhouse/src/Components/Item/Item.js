import React, { Component } from "react";
import Tag from "../Tag/Tag";
//props : item, applyEdit(edit_item), delete
// further task #1 check whether input tag is existing in database (maybe Sprint4)

class Item extends Component {
    state = {
        category: this.props.item.category,
        tags: this.props.item.tags,
        todo: "Add tag", //the mode where user enters after clicing button
    };
    handleCategoryChange(event) {
        this.setState({ category: event.target.value });
        this.props.applyEdit({
            category: this.state.category,
            tags: this.state.item.tags,
        });
    }

    //Delete Tag
    onDeleteTag(tag) {}

    //add Tag
    addTag(e) {
        if (e.keyCode == 13) {
            tags = this.state.tags;
            tags = tags.concat(e.value);
            this.setState({ tags: tags });
        }
    }

    //convert the todo ("Add tag" or "Confirm")
    changeMode = () => {
        if (this.state.todo === "Add tag") this.setState({ todo: Confirm });
        else this.setState({ todo: "Add tag" });
    };
    render() {
        let tags = this.props.item.tags.map(tag => {
            return <Tag tag={tag} delete={() => this.onDeleteTag(tag)} />;
        });
        let tag_input = null;
        if (this.state.todo === "Confirm")
            tag_input = (
                <input
                    type="text"
                    placeholder="Enter tag"
                    //onChange = further task #1
                    onKeyDown={e => this.addTag(e)}
                ></input>
            );
        return (
            <div className="Item">
                <select
                    value={this.state.category}
                    onChange={this.handleCategoryChange}
                >
                    <option value="outer">Outer</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="dress">Dress</option>
                    <option value="shoes">Shoes</option>
                    <option value="bag">Bag</option>
                    <option value="accessories">Accessories</option>
                </select>
                <div className="tag-area"> {tags} </div>
                <button onClick={this.changeMode}>{this.state.todo}</button>
            </div>
        );
    }
}
export default Item;
