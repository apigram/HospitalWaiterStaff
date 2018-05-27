import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

class MealDetail extends Component {
    render() {
        if (!this.props.activeMeal) {
            return <div className="card text-white bg-info">
                <div className="card-body">
                    <p>Select a meal to view details.</p>
                </div>
            </div>
        }
        return (
            <div className="card text-white bg-info">
                <h2 className="card-header">{this.props.activeMeal.label}</h2>
                <div className="card-body">
                    <p>Quantity: {this.props.activeMeal.current_quantity}/{this.props.activeMeal.total_quantity}</p>
                    <p>Time of Day: {_.findKey(this.props.mealTimes, _.partial(_.isEqual, this.props.activeMeal.time_of_day))}</p>
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
export default connect(mapStateToProps, null)(MealDetail);