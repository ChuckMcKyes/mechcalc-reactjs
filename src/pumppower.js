import React, { useState } from "react";
import pump_power_png from "./pump_power.png"
import "./component.css";


function PumpPower() {
    const [flow, setFlow] = useState(100.0);
    const [head, setHead] = useState(200.0);
    const [specificGravity, setSpecificGravity] = useState(1.0);
    const [efficiency, setEfficiency] = useState(0.8);
    const [power, setPower] = useState(0.0);
    const [metricPower, setMetricPower] = useState(0.0);
    const [message, setMessage] = useState("");

    function validateInput(testString){
        // check if there are any characters
        // other than a digit or decimal point
        const maxLength = 11;
        var RegExPattern = /[^0-9.]/g;

        // check if the string is too long
        if (testString.length > maxLength){
            return false;
        }

        if (RegExPattern.test(testString)){
            return false;
        }
        // count the number of decimal points
        else {
            RegExPattern = /\./g;
            var result = testString.match(RegExPattern);
            // check for any decimal points. return true
            // only for zero or one decimal points.
            if (!result){
                return true;
            }
            else if (result.length === 1){
                return true;
            }
            else{
                return false;
            }
        }
    }

    // I pass the event from onInput of the fields, and also
    // the set method so I don't have to duplicate handleChange
    // for each field.
    function handleChange(event, setMethod) {
        if (!validateInput(event.target.value)){
            setMessage("Please enter a number, maximum length 11.");
        }
        else {
            setMessage("");
            setMethod(event.target.value);
        }
    }

    function calculatePower(){
        setMessage("");
        var localPower = flow * head * specificGravity
                        / 3960 / efficiency;
        var localMetricPower = localPower * 0.746;
        setPower(localPower.toFixed(2));
        setMetricPower(localMetricPower.toFixed(2));
    }

    return (
    <div className="pagegrid">
        <div>
            <h2>Pump Hydraulic Power</h2>
            <table>
                <tbody>
                    <tr>
                        <td className="label">Flow</td>
                        <td><input value={flow} className="input"
                            onInput={(event) => handleChange(event, setFlow)} /></td>
                        <td>USgpm</td>
                    </tr>
                    <tr>
                        <td className="label">Head</td>
                        <td><input value={head} className="input"
                            onInput={(event) => handleChange(event, setHead)} /></td>
                        <td>feet</td>
                    </tr>
                    <tr>
                        <td className="label">Specific Gravity</td>
                        <td><input value={specificGravity} className="input"
                            onInput={(event) => handleChange(event, setSpecificGravity)} /></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="label">Pump Efficiency</td>
                        <td><input value={efficiency} className="input"
                            onInput={(event) => handleChange(event, setEfficiency)} /></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="label">Hydraulic Power</td>
                        <td><input value={power}  className="output" readOnly/></td>
                        <td>hp</td>
                    </tr>
                    <tr>
                        <td className="label"></td>
                        <td><input value={metricPower} className="output" readOnly /></td>
                        <td>kW</td>
                    </tr>
                    <tr>
                         <td></td>
                         <td><input type="button" value="Calculate" onClick={calculatePower} /></td>
                    </tr>
                </tbody>
            </table>
            <p>{message}</p>
        </div>
        <div className="notes">
            <img src={pump_power_png} alt="power formula" />
        </div>
    </div>
    );
}

export default PumpPower;
