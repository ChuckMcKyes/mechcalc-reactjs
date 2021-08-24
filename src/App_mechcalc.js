import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { sidebar } from "./sidebar";
import ShearPinCalc from "./shearpincalc";
import "./index.css";

function Home() {
    return (
        <div>
            <h2>Home Page</h2>
        </div>
    )
}

function App() {
    return (
    <div className="mygrid">
        <Router>
            <div>
                <h3>Engineering Calculators</h3>
                {sidebar}
            </div>
            <div>
                <Switch>
                    <Route exact="exact" path="/">
                        <Home />
                    </Route>
                    <Route path="/shearpin">
                        <ShearPinCalc />
                    </Route>
                </Switch>
            </div>
        </Router>
    </div>
    );
}

export default App;
