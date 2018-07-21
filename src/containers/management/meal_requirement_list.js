import React, {Component} from 'react';
import {
    deleteMealRequirement,
    fetchMealRequirements,
    addMealRequirement
} from '../../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class MealRequirementList extends Component {
    constructor(props) {
        super(props);
        this.state = {requirement_id: '', scale: ''};
        this.props.fetchMealRequirements(this.props.activeMeal.requirements);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activeMeal.uri !== prevProps.activeMeal.uri) {
            this.props.fetchMealRequirements(this.props.activeMeal.requirements);
        }
    }

    renderOptions() {
        return this.props.requirements.map((req) => {
            return (
                <option key={req.uri} value={req.id}>{req.label}</option>
            );
        })
    }

    handleChange(event) {
        switch (event.target.name) {
            case 'requirement_id':
                this.setState({requirement_id: event.target.value});
                break;
            case 'scale':
                this.setState({scale: event.target.value});
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addMealRequirement(this.props.activeMeal.requirements, this.state);
    }


    renderList() {
        return this.props.activeMealRequirements.map((req) => {
            let scaleStr = '';
            if (req.scale !== null || req.scale === '') {
                scaleStr = ' (' + req.scale.slice(0, 1).toUpperCase() + req.scale.slice(1, req.scale.length).toLowerCase() + ')';
            }
            return (
                <li key={req.uri} className="list-group-item">
                    <div className="row">
                        <div className="col-sm-9 text-left">
                            {req.label}{scaleStr}
                        </div>
                        <div className="col-sm-3">
                            <button type="button" className="btn btn-danger" onClick={() => {
                                this.props.deleteMealRequirement(req.meal_requirement)
                            }}>Delete
                            </button>
                        </div>
                    </div>
                </li>
            )
        })
    }

    render() {
        return (
            <div className="card bg-light text-dark">
                <h4 className="card-header">Dietary Warnings</h4>
                <ul className="list-group list-group-flush">
                    {this.renderList()}
                </ul>
                <div className="card-footer">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <select name="requirement_id" className="form-control col-sm-4" onChange={this.handleChange}
                                    value={this.state.requirement_id}>
                                {this.renderOptions()}
                            </select>
                            <select name="scale" className="form-control col-sm-4" onChange={this.handleChange}
                                    value={this.state.scale}>
                                <option value="">N/A</option>
                                <option value="WHOLE">Whole</option>
                                <option value="TRACE">Trace</option>
                            </select>
                            <button type="submit" className="btn btn-primary col-sm-4">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        requirements: state.requirements,
        activeMeal: state.activeMeal,
        activeMealRequirements: state.activeMealRequirements
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({deleteMealRequirement, fetchMealRequirements, addMealRequirement}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MealRequirementList);