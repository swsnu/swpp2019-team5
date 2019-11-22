import React, { Component } from "react";
import Tag from "../Tag/Tag";
import Option from "../Option/Option";
import "./Item.scss";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { itemStyles, itemOptions } from "./SelectStyle";
import Select from "react-select";
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
        item_list: this.props.item_list,
        option_list: [
            {
                id: 1,
                category: "UpperBody",
                tags: ["T-shirt", "2019"],
            },
            {
                id: 2,
                category: "UpperBody",
                tags: ["fall", "stripe", "blue"],
            },
            {
                id: 3,
                category: "UpperBody",
                tags: ["coat", "wool", "pink"],
            },
            {
                id: 4,
                category: "UpperBody",
                tags: ["mom", "hand-made", "check-shirt"],
            },
        ],
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
    handleAutoComplete = e => {
        let option_list = this.state.tags.concat(e.target.value);
        console.log(option_list);
        //아마도 actionCreator에서 get all items로 whoe list를 가져와야할듯
        //filter whole item lists that mathes to input ..
        //and then set to the option_list
        //contains 함수 써서 ~~ ^_^
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
                    edit={edit_tag => this.onEditTag(tag, edit_tag)}
                />
            );
        });
        let edit_mode_options = null;
        let tag_input = null;

        if (this.props.editMode) {
            tag_input = (
                <input
                    ref={input => {
                        this.input_bar = input;
                    }}
                    className="tag-input"
                    type="text"
                    placeholder="Enter tag.."
                    onChange={e => this.handleAutoComplete(e)}
                    onKeyDown={e => this.addTag(e)}
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
                        <div className="tag-area">
                            {tags}
                            {tag_input}
                        </div>

                        <div id="options">
                            {this.state.show ? auto_complete : null}
                        </div>
                    </div>
                    {edit_mode_options}
                </div>
            </div>
        );
    }
}
export default Item;
