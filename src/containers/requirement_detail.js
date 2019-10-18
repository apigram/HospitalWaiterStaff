import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveRequirement} from "../actions";
import {bindActionCreators} from "redux";

class RequirementDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            type: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activeRequirement.type !== prevState.type && this.props.activeRequirement.url !== prevState.url) {
            this.setState({url: this.props.activeRequirement.url, type: this.props.activeRequirement.type})
        }
    }

    renderOptions() {
        return this.props.requirementTypes.map((type) => {
            return <option key={type.url} value={type.url}>{type.label}</option>
        });
    }

    handleChange(event) {
        this.setState({type: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        let reqData = {
            type: this.state.type
        };
        this.props.saveRequirement(this.props.activeRequirement.url, reqData);
    }

    render() {
        if (!this.props.activeRequirement) {
            return <div className="card text-white bg-info">
                <div className="card-body">
                    <p>Select a requirement to view details.</p>
                </div>
            </div>
        }
        return (
            <div className="card text-white bg-info">
                <h2 className="card-header">{this.props.activeRequirement.label}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="type">Type:</label>
                            <select name="type" className="form-control" value={this.state.type}
                                    onChange={this.handleChange}>
                                {this.renderOptions()}
                            </select>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary" type="submit">Save</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeRequirement: state.activeRequirement,
        requirementTypes: state.requirementTypes
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({saveRequirement}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RequirementDetail);