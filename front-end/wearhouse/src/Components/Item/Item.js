import React, { Component } from "react";
//props : item, applyEdit(edit_item), delete
//check whether input tag is existing in database

class Item extends Component {
    state = {
        category: this.props.item.category,
        tags: this.props.item.tags,
        edit_mode: false,
    };
    handleCategoryChange(event) {
        this.setState({ category: event.target.value });
        this.props.applyEdit({
            category: this.state.category,
            tags: this.state.item.tags,
        });
    }

    //conver #black #shirt form to ["black,"shirt"]
    //gurantee that input form is correct
    trimTagInputs(tags) {
        tag_strings = tags.split(" ");
        tags = tag_strings.map(tag => tag.substring(1));
        return tags;
    }

    /*check whether input form is correct
    input parameter ex) "#black #shirt"
    */
    checkInputForm(tags) {}

    handleTagChange(event) {
        validCheck = checkInputForm(event.target.value); //check whether input form is correct
        if (validCheck) {
            tags = this.trimTagInputs(event.target.value);
            this.setState({ tags: tags });
            this.props.applyEdit({
                category: this.state.category,
                tags: this.state.item.tags,
            });
        }
    }
    render() {
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
            </div>
        );
    }
}
export default Item;
