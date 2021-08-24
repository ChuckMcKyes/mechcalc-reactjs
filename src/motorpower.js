import React, { useState } from "react";
import power_single_phase_png from "./power_single_phase.png";
import power_three_phase_png from "./power_three_phase.png";
import "./component.css";


function MotorPower() {
    const [phase, setPhase] = useState("1");
    const [current, setCurrent] = useState(10.0);
    const [voltage, setVoltage] = useState(460.0);
    const [efficiency, setEfficiency] = useState(0.8);
    const [powerFactor, setPowerFactor] = useState(0.8);
    const [power, setPower] = useState(0.0);
    const [horsePower, setHorsePower] = useState(0.0);
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

    function handleChangeRadio(event) {
        setPhase(event.target.value);
    }

    function calculatePower(){
        setMessage("");
        var localPower = current * voltage * efficiency
                        * powerFactor / 1000;

        if (phase === "3") {
            localPower *= 1.73;
        }

        var localHorsePower = localPower / 0.746;
        setPower(localPower.toFixed(2));
        setHorsePower(localHorsePower.toFixed(2));
    }

    return (
    <div className="pagegrid">
        <div>
            <h2>Electric Motor Power</h2>
            <div>
                <label className="radio-label">
                    <input type="radio" id="single_phase" name="phase" value="1"
                        onChange={handleChangeRadio} checked={phase === "1"} />
                        Single-phase power
                </label>
                <label className="radio-label">
                    <input type="radio" id="three_phase" name="phase" value="3"
                        onChange={handleChangeRadio} checked={phase === "3"} />
                        Three-phase power
                </label>
            </div>
            <p></p>
            <table>
                <tbody>
                    <tr>
                        <td className="label">Current</td>
                        <td><input value={current} className="input"
                            onInput={(event) => handleChange(event, setCurrent)} /></td>
                        <td>amps</td>
                    </tr>
                    <tr>
                        <td className="label">Voltage</td>
                        <td><input value={voltage} className="input"
                            onInput={(event) => handleChange(event, setVoltage)} /></td>
                        <td>volts</td>
                    </tr>
                    <tr>
                        <td className="label">Efficiency</td>
                        <td><input value={efficiency} className="input"
                            onInput={(event) => handleChange(event, setEfficiency)} /></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="label">Power Factor</td>
                        <td><input value={powerFactor} className="input"
                            onInput={(event) => handleChange(event, setPowerFactor)} /></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="label">Power</td>
                        <td><input value={power}  className="output" readOnly/></td>
                        <td>kW</td>
                    </tr>
                    <tr>
                        <td className="label"></td>
                        <td><input value={horsePower} className="output" readOnly /></td>
                        <td>hp</td>
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
            <p>Single-phase power:</p>
            <img src={power_single_phase_png} alt="power formula" />
            <p>Three-phase power:</p>
            <img src={power_three_phase_png} alt="power formula" />
        </div>
    </div>
    );
}

export default MotorPower;
