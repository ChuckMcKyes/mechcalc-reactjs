import React, { useState } from "react";
import pump_head_png from "./pump_head.png"
import "./component.css";


function PumpHead() {
    const [speed, setSpeed] = useState(1800);
    const [impellerDiameter, setImpellerDiameter] = useState(6.0);
    const [head, setHead] = useState(0.0);
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
        var localHead = Math.pow(impellerDiameter, 2) *
                        Math.pow( ( speed / 1800 ), 2);
        setHead(localHead.toFixed(2));
    }

    return (
    <div className="pagegrid">
        <div>
            <h2>Centrifugal Pump Head</h2>
            <table>
                <tbody>
                    <tr>
                        <td className="label">Speed</td>
                        <td><input value={speed} className="input"
                            onInput={(event) => handleChange(event, setSpeed)} /></td>
                        <td>rpm</td>
                    </tr>
                    <tr>
                        <td className="label">Impeller Diameter</td>
                        <td><input value={impellerDiameter} className="input"
                            onInput={(event) => handleChange(event, setImpellerDiameter)} /></td>
                        <td>inches</td>
                    </tr>
                    <tr>
                        <td className="label">Head</td>
                        <td><input value={head} className="output" readOnly/></td>
                        <td>feet</td>
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
            <img src={pump_head_png} alt="head formula" />
        </div>
    </div>
    );
}

export default PumpHead;
