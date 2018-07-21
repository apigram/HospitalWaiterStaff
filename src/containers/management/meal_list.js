import React, {Component} from 'react';
import {fetchMeals, selectMeal, addMeal, deleteMeal} from '../../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MealSearch from './meal_search_bar'
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('.container');

class MealList extends Component {
    constructor(props) {
        super(props);
        this.props.fetchMeals();
        this.state = {
            modalIsOpen: false,
            meal_label: '',
            meal_quantity: 0,
            meal_time_of_day: ''
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addMeal({
            label: this.state.meal_label,
            quantity: this.state.meal_quantity,
            time_of_day: this.state.meal_time_of_day
        });
        this.closeModal();
    }

    handleChange(event) {
        switch (event.target.name) {
            case 'meal_label':
                this.setState({meal_label: event.target.value});
                break;
            case 'meal_quantity':
                this.setState({meal_quantity: event.target.value});
                break;
            case 'meal_time_of_day':
                this.setState({meal_time_of_day: event.target.value});
                break;
            default:
                break;
        }
    }

    renderOptions() {
        return this.props.mealTimes.map((type) => {
            return (
                <option key={type.value} value={type.value}>{type.key}</option>
            );
        })
    }

    removeMeal(meal_uri) {
        this.props.deleteMeal(meal_uri);
    }


    renderList() {
        return this.props.meals.map((meal) => {
            let listClass = 'list-group-item list-group-item-action';
            if (this.props.activeMeal !== null && meal.uri === this.props.activeMeal.uri) {
                listClass = listClass + ' active';
            }
            return (
                <li key={meal.uri} className={listClass}>
                    <div className="row">
                        <div className="col-sm-10" onClick={() => {this.props.selectMeal(meal.uri)}}>
                            {meal.label}
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-danger" onClick={() => {this.removeMeal(meal.uri)}}>Delete</button>
                        </div>
                    </div>
                </li>
            )
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
                <div className="card-link">
                    <a href="javascript:void(0)" onClick={this.openModal}>Add a new meal</a>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Add Meal">
                        <div className="card bg-light text-dark">
                            <div className="card-header">
                                <h2 ref={subtitle => this.subtitle = subtitle}>Add Meal</h2>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="meal_label">Label:</label>
                                        <input name="meal_label" type="text" onChange={this.handleChange}
                                               value={this.state.meal_label} className="form-control"/>
                                        <label htmlFor="meal_quantity">Quantity:</label>
                                        <input name="meal_quantity" type="text" onChange={this.handleChange}
                                               value={this.state.meal_quantity} className="form-control"/>
                                        <label htmlFor="meal_time_of_day">Time of Day:</label>
                                        <select name="meal_time_of_day" onChange={this.handleChange} value={this.state.meal_time_of_day}>
                                            {this.renderOptions()}
                                        </select>
                                    </div>
                                    <div className="btn-group">
                                        <button type="submit" className="btn btn-primary">Create</button>
                                        <button type="button" className="btn btn-danger"
                                                onClick={this.closeModal}>Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        meals: state.meals,
        activeMeal: state.activeMeal,
        mealTimes: state.mealTimes
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchMeals, selectMeal, addMeal, deleteMeal}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MealList);