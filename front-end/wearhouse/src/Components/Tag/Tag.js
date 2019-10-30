import React, { Component } from "react";
import "./Tag.scss";
//props : tag_name  ex) "Black"

class Tag extends Component {
    componentDidMount() {
        this.setState({
            tag_name: this.props.tag,
            editMode: this.props.editMode,
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
        if (this.state.editMode)
            //in case where not edit mode then props should be false.
            label = (
                <div className="tag-in-outfit">
                    #{this.state.tag_name}
                    <div onClick={this.props.delete}> X</div>
                    <div onClick={this.props.edit}></div>
                </div>
            );
        return <div className="Tag">{label}</div>;
    }
}
export default Tag;
