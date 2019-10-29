import React, { Component } from "react";
//props tag name

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
        let label = (
            <label className="tag-in-outfit">{this.state.tag_name}</label>
        );
        if (this.state.editMode)
            //in case where not edit mode then props should be false.
            label = (
                <label className="tag-in-outfit">
                    #{this.state.tag_name}
                    <label onClick={this.props.delete}>X</label>
                </label>
            );
        return <div className="Tag">{label}</div>;
    }
}
export default Tag;
