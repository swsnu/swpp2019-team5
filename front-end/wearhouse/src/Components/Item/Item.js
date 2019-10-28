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
    componentDidMount() {
        this.setState({
            category: this.props.item.category,
            tags: this.props.item.tags,
        });
    }
    handleCategoryChange(event) {
        this.setState({ category: event.target.value });
        this.props.applyEdit({
            category: this.state.category,
            tags: this.state.tags,
        });
    }

    //Delete Tag
    onDeleteTag(tag) {
        let tags = this.state.tags;
        tags = tags.filter(tg => tg !== tag);
        this.setState({ tags: tags });
    }

    //add Tag
    addTag(e) {
        if (e.keyCode == 13) {
            let tags = this.state.tags;
            tags = tags.concat(e.value);
            this.setState({ tags: tags });
        }
    }

    //convert the todo ("Add tag" or "Confirm")
    changeMode = () => {
        if (this.state.todo === "Add tag") this.setState({ todo: "Confirm" });
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
                    onChange={e => this.handleCategoryChange(e)}
                >
                    <option value="Outer">Outer</option>
                    <option value="Top">Top</option>
                    <option value="Bottom">Bottom</option>
                    <option value="Dress">Dress</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Bag">Bag</option>
                    <option value="Accessories">Accessories</option>
                </select>
                <div className="tag-area"> {tags} </div>
                <button onClick={this.changeMode}>{this.state.todo}</button>
            </div>
        );
    }
}
export default Item;
