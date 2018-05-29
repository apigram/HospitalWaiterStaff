import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveMeal} from "../actions";
import {bindActionCreators} from "redux";

class MealDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uri: '',
            total_quantity: '',
            current_quantity: '',
            time_of_day: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activeMeal.uri !== prevState.uri) {
            this.setState({uri: this.props.activeMeal.uri});
            if (this.props.activeMeal.total_quantity !== prevState.total_quantity && this.state.total_quantity === '') {
                this.setState({total_quantity: this.props.activeMeal.total_quantity})
            }
            if (this.props.activeMeal.current_quantity !== prevState.current_quantity && this.state.current_quantity === '') {
                this.setState({current_quantity: this.props.activeMeal.current_quantity})
            }
            if (this.props.activeMeal.time_of_day !== prevState.time_of_day && this.state.time_of_day === '') {
                this.setState({time_of_day: this.props.activeMeal.time_of_day})
            }
        }
    }

    renderOptions() {
        return this.props.mealTimes.map((time) => {
            return (
                <option key={time.value} value={time.value}>{time.key}</option>
            )
        })
    }

    handleChange(event) {
        switch (event.target.name) {
            case 'total_quantity':
                this.setState({total_quantity: event.target.value});
                break;
            case 'current_quantity':
                this.setState({current_quantity: event.target.value});
                break;
            case 'time_of_day':
                this.setState({time_of_day: event.target.value});
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let mealData = {
            total_quantity: this.state.total_quantity,
            current_quantity: this.state.current_quantity,
            time_of_day: this.state.time_of_day
        };
        this.props.saveMeal(this.props.activeMeal.uri, mealData);
    }

    render() {
        if (this.props.activeMeal && this.state) {
            return (
                <div className="card text-white bg-info">
                    <h2 className="card-header">{this.props.activeMeal.label}</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="total_quantity">Total Quantity:</label>
                                <input name="total_quantity" type="text" className="form-control"
                                       value={this.state.total_quantity} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="current_quantity">Current Quantity:</label>
                                <input name="current_quantity" type="text" className="form-control"
                                       value={this.state.current_quantity} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="time_of_day">Time of Day:</label>
                                <select name="time_of_day" className="form-control" value={this.state.time_of_day}
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
            )
        }
        return (
            <div className="card text-white bg-info">
                <div className="card-body">
                    <p>Select a meal to view details.</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeMeal: state.activeMeal,
        mealTimes: state.mealTimes
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({saveMeal}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MealDetail);