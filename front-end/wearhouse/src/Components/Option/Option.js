import React, { Component } from "react";
import Tag from "../Tag/Tag";
import "./Option.scss";
class Option extends Component {
    //props = onClick, option = op(item객체),
    render() {
        let tags = this.props.option.tags.map((tag, index) => {
            return (
                <Tag
                    key={index}
                    className="option_tag"
                    editMode={false}
                    tag={tag}
                />
            );
        });
        return (
            <div className="Option">
                <div
                    id="options-container"
                    onMouseOver={this.props.preventBlur}
                    onMouseLeave={this.props.activateBlur}
                    onClick={this.props.click}
                >
                    {tags}
                </div>
            </div>
        );
    }
}
export default Option;
