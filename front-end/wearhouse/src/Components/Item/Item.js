import React, { Component } from "react";
import Tag from "../Tag/Tag";
//props : item, applyEdit(edit_item), delete
// further task #1 check whether input tag is existing in database (maybe Sprint4)

class Item extends Component {
    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps)
            this.setState({
                category: this.props.item.category,
                tags: this.props.item.tags,
            });
    }

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
            category: event.target.value,
            tags: this.state.tags,
        });
    }

    //Delete Tag
    onDeleteTag(tag) {
        let tags = this.state.tags;
        tags = tags.filter(tg => tg !== tag);
        this.setState({ tags: tags });
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
        if (e.keyCode === 13) {
            let tags = this.state.tags;
            tags = tags.concat(e.target.value);
            this.setState({ tags: tags });
            e.target.value = "";
        }
    }

    //convert the todo ("Add tag" or "Finished")
    changeMode = () => {
        if (this.state.todo === "Add tag") this.setState({ todo: "Finished" });
        else this.setState({ todo: "Add tag" });
    };
    render() {
        let tags = this.state.tags.map((tag, index) => {
            return (
                <Tag
                    tag={tag}
                    key={index}
                    editMode={true}
                    delete={() => this.onDeleteTag(tag)}
                />
            );
        });
        let tag_input = null;
        if (this.state.todo === "Finished")
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
                    <option value="UpperBody">UpperBody</option>
                    <option value="LowerBody">LowerBody</option>
                    <option value="FullBody">FullBody</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Accessories">Accessories</option>
                </select>
                <div className="tag-area"> {tags} </div>
                <label
                    className="item-deleter"
                    onClick={this.handleItemDelete.bind(this)}
                >
                    X
                </label>
                <button className="mode-controller" onClick={this.changeMode}>
                    {this.state.todo}
                </button>
                {tag_input}
            </div>
        );
    }
}
export default Item;
