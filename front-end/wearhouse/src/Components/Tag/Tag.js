import React, { Component } from "react";
import "./Tag.scss";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//props : tag(tag_name) ex) "Black", delete (function), edit(function)
class Tag extends Component {
    componentDidMount() {
        this.setState({
            tag_name: this.props.tag,
            editMode: this.props.editMode, //it tells whether [x, pencil image] show up next to tag name
        });
    }
    componentDidUpdate(prevProps) {
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
            //tag_name is not editable
            label = (
                <div className="tag-in-outfit">
                    <div className="tag-text">#{this.state.tag_name + " "}</div>
                    <div className="delete-tag" onClick={this.props.delete}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </div>
                </div>
            );
        }
        return <div className="Tag">{label}</div>;
    }
}
export default Tag;
