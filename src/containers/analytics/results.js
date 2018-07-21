import React, {Component} from 'react';
import {Card, Table, CardBody, CardHeader} from 'reactstrap';
import {connect} from 'react-redux';

class Results extends Component {
    renderTable() {
        return (
            <Table>
                <thead>
                    <tr>
                        {this.renderTableHeader()}
                    </tr>
                </thead>
                <tbody>
                    {this.renderTableCells()}
                </tbody>
            </Table>
        )
    }
    renderTableHeader() {
        return this.props.activeDatapoint.columns.map((column) => {
            return (
                <th>{column}</th>
            );
        });
    }

    renderTableCells() {
        return this.props.results.map((result) => {
            return (
                <tr key={result}>
                    <td>{result}</td>
                </tr>
            );
        });
    }

    renderChart() {
        return (
            <div className="data-chart">
                <p>Add chart here...</p>
            </div>
        );
    }

    render() {
        return (
            <Card color="bg-light text-dark">
                <CardHeader tag="h2">Results</CardHeader>
                <CardBody>
                    {this.props.activeDatapoint && this.props.results ? this.renderTable() : ''}
                </CardBody>
                {this.renderChart()}
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeDatapoint: state.activeDatapoint,
        results: state.results
    };
}

export default connect(mapStateToProps, null)(Results);

