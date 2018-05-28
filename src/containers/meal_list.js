import React, {Component} from 'react';
import {fetchMeals, selectMeal} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MealSearch from './meal_search_bar'

class MealList extends Component {
    constructor(props) {
        super(props);
        this.props.fetchMeals();
    }

    renderList() {
        return this.props.meals.map((meal) => {
            return <li key={meal.uri} className="list-group-item list-group-item-action"
                       onClick={() => {this.props.selectMeal(meal.uri)}}>{meal.label}</li>
        })
    }

    render() {
        return (
            <div className="card bg-light text-dark">
                <h2 className="card-header">Meals</h2>
                <MealSearch/>
                <ul className="list-group list-group-flush">
                    {this.renderList()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        meals: state.meals,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchMeals, selectMeal}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MealList);