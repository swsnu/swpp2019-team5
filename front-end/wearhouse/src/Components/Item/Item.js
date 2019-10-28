import React, { Component } from "react";
//props : item, applyEdit(edit_item), delete
class Item extends Component {
    state = { category: this.props.item.category, tags: this.props.item.tags };
    handleChange(event) {
        this.setState({ category: event.target.value });
        this.props.applyEdit({
            category: this.state.category,
            tags: this.state.item.tags,
        });
    }
    render() {
        return (
            <div className="Item">
                <select
                    value={this.state.category}
                    onChange={this.handleChange}
                >
                    <option value="outer">Outer</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="dress">Dress</option>
                    <option value="shoes">Shoes</option>
                    <option value="bag">Bag</option>
                    <option value="accessories">Accessories</option>
                </select>
            </div>
        );
    }
}
export default Item;
