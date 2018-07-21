import React, {Component} from 'react';
import '../App.css';
import ManagementTab from '../components/management_tab'
import AnalyticsTab from '../components/analytics_tab'
import LoginForm from '../containers/login_form';
import {TabContent, Nav, Navbar, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchRequirementTypes, fetchMealTimes} from "../actions";

class App extends Component {
    constructor(props) {
        super(props);

        this.props.fetchRequirementTypes();
        this.props.fetchMealTimes();

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        if (this.props.activeUser !== null) {
            return (
                <div className="App">
                    <Navbar color="dark" dark expand="md">
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="#">Import from PAS</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Reconcile MHR</NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                    <h1>HospitalWaiter</h1>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}>
                                Management
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}>
                                Analytics
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <ManagementTab/>
                        <AnalyticsTab/>
                    </TabContent>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <h1>Hospital Waiter</h1>
                    <LoginForm/>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        activeUser: state.activeUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchRequirementTypes, fetchMealTimes}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
