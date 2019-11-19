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
        category: this.props.item.category,
        tags: this.props.item.tags,
        item_list: this.props.item_list,
        option_list: [
            {
                id: 1,
                category: "UpperBody",
                tags: ["red", "sheep-fur", "long"],
            },
            {
                id: 2,
                category: "UpperBody",
                tags: ["red", "sheep-fur", "long"],
            },
            {
                id: 3,
                category: "UpperBody",
                tags: ["red", "sheep-fur", "long"],
            },
            {
                id: 4,
                category: "UpperBody",
                tags: ["red", "sheep-fur", "long"],
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
    handleAutoComplete = () => {
        //get whole item lists that mathes to input ..
        //and then set to the option_list
        //contains 함수 써서 ~~ ^_^
    };

    setItem = op => {
        //auto complete중의 후보로 선택한 애를 tag로 바꿔주기
        //this.setState({ tags: op.tags });
    };

    show = false;
    render() {
        let auto_complete = this.state.option_list.map((op, index) => {
            return (
                <Option key={index} onClick={this.setItem(op)} option={op} />
            );
        });
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
                    className="tag-input"
                    type="text"
                    placeholder="Enter tag.."
                    onChange={this.handleAutoComplete}
                    onKeyDown={e => this.addTag(e)}
                    autoComplete="on"
                    onFocus={() => {
                        this.setState({ show: true });
                    }}
                    onBlur={() => {
                        this.setState({ show: false });
                    }}
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
