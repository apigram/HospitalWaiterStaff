import React, {Component} from 'react';
import {fetchRequirements, selectRequirement, addRequirement, deleteRequirement} from '../../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RequirementSearch from './requirement_search_bar'
import Modal from 'react-modal'

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

class RequirementList extends Component {
    constructor(props) {
        super(props);
        this.props.fetchRequirements();
        this.state = {
            modalIsOpen: false,
            requirement_label: '',
            requirement_type: ''
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
        this.props.addRequirement({
            label: this.state.requirement_label,
            type: this.state.requirement_type,
        });
        this.closeModal();
    }

    removeRequirement(requirement_uri) {
        this.props.deleteRequirement(requirement_uri);
    }

    handleChange(event) {
        switch (event.target.name) {
            case 'requirement_label':
                this.setState({requirement_label: event.target.value});
                break;
            case 'requirement_type':
                this.setState({requirement_type: event.target.value});
                break;
            default:
                break;
        }
    }

    renderOptions() {
        return this.props.requirementTypes.map((type) => {
            return (
                <option key={type.value} value={type.value}>{type.key}</option>
            );
        })
    }

    renderList() {
        return this.props.requirements.map((requirement) => {
            let listClass = 'list-group-item list-group-item-action';
            if (this.props.activeRequirement !== null && requirement.uri === this.props.activeRequirement.uri) {
                listClass = listClass + ' active';
            }
            return (
                <li key={requirement.uri} className={listClass} >
                    <div className="row">
                        <div className="col-sm-10" onClick={() => {this.props.selectRequirement(requirement.uri)}}>
                            {requirement.label}
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-danger" onClick={() => {this.removeRequirement(requirement.uri)}}>Delete</button>
                        </div>
                    </div>
                </li>
            );
        })
    }

    render() {
        return (
            <div className="card bg-light text-dark">
                <h2 className="card-header">Requirements</h2>
                <RequirementSearch/>
                <ul className="list-group list-group-flush">
                    {this.renderList()}
                </ul>
                <div className="card-link">
                    <a href="javascript:void(0)" onClick={this.openModal}>Add a new requirement</a>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Add Requirement">
                        <div className="card bg-light text-dark">
                            <div className="card-header">
                                <h2 ref={subtitle => this.subtitle = subtitle}>Add Requirement</h2>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="requirement_label">Label:</label>
                                        <input name="requirement_label" type="text" onChange={this.handleChange}
                                               value={this.state.requirement_label} className="form-control"/>
                                        <label htmlFor="requirement_type">Type:</label>
                                        <select name="requirement_type" onChange={this.handleChange} value={this.state.requirement_type}>
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
        requirements: state.requirements,
        activeRequirement: state.activeRequirement,
        requirementTypes: state.requirementTypes
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchRequirements, selectRequirement, addRequirement, deleteRequirement}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RequirementList);