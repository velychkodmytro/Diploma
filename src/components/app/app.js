import React, {Component} from 'react';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../header';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {STEP_GRID} from '../constant';

import Diploma from '../Diploma/diploma';

import {noTransform} from '../transformation-functions';

class App extends Component {
    state = {
        showGrid: false,
        sizeCell: STEP_GRID,
        messageError: '',
    };

    handleShowGridChange = () => {
        const {showGrid} = this.state;
        this.setState({
            showGrid: !showGrid,
        });
    };

    handleMessageChange = (message) => {
        this.setState({messageError: message});
    };

    render() {
        return (
            <Router>
                <div className="container" style={{maxWidth: 1900}}>
                    <Header
                        showGrid={this.state.showGrid}
                        onShowGrid={this.handleShowGridChange}
                        messageError={this.state.messageError}
                    />

                    <div className="row">
                        <Switch>
                            <Route path="/diplom/simple">
                                <Diploma
                                    showGrid={this.state.showGrid}
                                    onMessageErrorChange={
                                        this.handleMessageChange
                                    }
                                    transformFunction={noTransform}
                                />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
