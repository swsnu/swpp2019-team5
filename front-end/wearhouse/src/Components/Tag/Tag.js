import React, { Component } from "react";
import "./Tag.scss";
//props : tag(tag_name) ex) "Black", delete (function), edit(function)
class Tag extends Component {
    componentDidMount() {
        this.setState({
            tag_name: this.props.tag,
            editMode: this.props.editMode, //it tells whether [x, pencil image] show up next to tag name
            edieTag: false, //it tells whether tag_name is editable.
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps)
            this.setState({
                tag_name: this.props.tag,
                editMode: this.props.editMode,
            });
    }
    state = { tag_name: "", editMode: null };
    render() {
        let label = <div className="tag-in-outfit">{this.state.tag_name}</div>;
        if (this.state.editMode) {
            //in case where not edit mode then props should be false.
            label = (
                <div className="tag-in-outfit">
                    #{this.state.tag_name + " "}
                    <div className="delete-tag" onClick={this.props.delete}>
                        X
                    </div>
                    <div calssName="edit-tag" onClick={this.props.edit}>
                        +edit+
                    </div>
                </div>
            );
        }
        return <div className="Tag">{label}</div>;
    }
}
export default Tag;
