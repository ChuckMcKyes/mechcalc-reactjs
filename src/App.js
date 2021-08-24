import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Sidebar from "./sidebar";
import HomePage from "./homepage";
import ShearPinCalc from "./shearpincalc";
import PumpHead from "./pumphead";
import PumpPower from "./pumppower";
import MotorPower from "./motorpower";
import "./App.css";


function App() {
    return (
    <>
        <Helmet>
            <title>Engineering Calculators</title>
            <meta name="description" content="engineering calculators" />
            <meta name="keywords" content="engineering, calculators, pump,
                shearpin, torque, electric motor, power" />
        </Helmet>
        <div className="mastergrid">
            <div className="titlebox">
                <p>Engineering Calculators</p>
            </div>
            <Router>
                <div>
                    <Sidebar />
                </div>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route path="/shearpins">
                            <ShearPinCalc />
                        </Route>
                        <Route path="/pumphead">
                            <PumpHead />
                        </Route>
                        <Route path="/pumppower">
                            <PumpPower />
                        </Route>
                        <Route path="/motorpower">
                            <MotorPower />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    </>
    );
}

export default App;
