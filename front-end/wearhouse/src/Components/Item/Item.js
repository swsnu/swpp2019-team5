import React, { Component } from "react";
import Tag from "../Tag/Tag";
//props : item, applyEdit(edit_item), delete
//check whether input tag is existing in database (maybe Sprint4)

class Item extends Component {
    state = {
        category: this.props.item.category,
        tags: this.props.item.tags,
        todo: "Add tag",
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

    //convert the todo ("Add tag" or "Confirm")
    changeMode = () => {
        if (this.state.todo === "Add tag") this.setState({ todo: Confirm });
        else this.setState({ todo: "Add tag" });
    };
    render() {
        let tags = this.props.item.tags.map(tag => {
            return <Tag tag={tag} delete={() => this.onDeleteTag(tag)} />;
        });
        let tag_input = <input type="text" placeholder="Enter tag"></input>;
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
