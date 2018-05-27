import React, {Component} from 'react';
import {connect} from 'react-redux';

class MealDetail extends Component {
    render() {
        if (!this.props.activeMeal) {
            return <div className="card bg-light text-dark">
                <div className="card-body">
                    <p>Select a meal to view details.</p>
                </div>
            </div>
        }
        return (
            <div className="card bg-light text-dark">
                <h2 className="card-header">{this.props.activeMeal.label}</h2>
                <div className="card-body">
                    <p>Quantity: {this.props.activeMeal.current_quantity}/{this.props.activeMeal.total_quantity}</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeMeal: state.activeMeal,
    }
}
export default connect(mapStateToProps, null)(MealDetail);