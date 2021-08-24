import React, { useState } from "react";
import "./component.css"

function ShearPinCalc() {
    const [diameter, setDiameter] = useState(0.3);
    const [holeDiameter, setHoleDiameter] = useState(0.2);
    const [shearArea, setShearArea] = useState(0);
    const [torque, setTorque] = useState(15600);
    const [torqueRadius, setTorqueRadius] = useState(3.5);
    const [numberOfPins, setNumberOfPins] = useState(2);
    const [strengthRatio, setStrengthRatio] = useState(0.6);
    const [ultTensStrength, setUltTensStrength] = useState(0);
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

    function calculateStress(){
        setMessage("");
        // need an local variable for shear area
        // so the calculation doesn't take two refreshes
        // to complete (two button clicks)
        var localShearArea = 3.14159 / 4 * (Math.pow(diameter, 2) - Math.pow(holeDiameter, 2));
        localShearArea = localShearArea.toFixed(4);
        // prevent calculation if hole diameter is larger than
        // pin diameter (resulting in negative UTS required)
        if (localShearArea < 0.0001){
            setMessage("Pin diameter must be larger than hole diameter.");
            setShearArea (0);
            setUltTensStrength(0);
            return;
        }
        setShearArea (localShearArea);
        var forcePerPin = torque / torqueRadius / numberOfPins;
        var shearStress = forcePerPin / localShearArea;
        var tensileStress = shearStress / strengthRatio;
        tensileStress = Math.round(tensileStress);
        setUltTensStrength(tensileStress);
    }

    return (
    <div className="pagegrid">
        <div>
            <h2>Shear Pin Required Ultimate Tensile Strength</h2>
            <table>
                <tbody>
                    <tr>
                        <td className="label">Pin diameter</td>
                        <td><input value={diameter} className="input"
                            onInput={(event) => handleChange(event, setDiameter)} /></td>
                        <td>inches</td>
                    </tr>
                    <tr>
                        <td className="label">Hole in pin dia.</td>
                        <td><input value={holeDiameter} className="input"
                            onInput={(event) => handleChange(event, setHoleDiameter)} /></td>
                        <td>inches</td>
                    </tr>
                    <tr>
                        <td className="label">Torque</td>
                        <td><input value={torque} className="input"
                            onInput={(event) => handleChange(event, setTorque)} /></td>
                        <td>in•lbf</td>
                    </tr>
                    <tr>
                        <td className="label">Torque radius</td>
                        <td><input value={torqueRadius} className="input"
                            onInput={(event) => handleChange(event, setTorqueRadius)} /></td>
                        <td>inches</td>
                    </tr>
                    <tr>
                        <td className="label">No. of shear pins</td>
                        <td><input value={numberOfPins} className="input"
                            onInput={(event) => handleChange(event, setNumberOfPins)} /></td>
                    </tr>
                    <tr>
                        <td className="label">Shear to UTS ratio</td>
                        <td><input value={strengthRatio} className="input"
                            onInput={(event) => handleChange(event, setStrengthRatio)} /></td>
                    </tr>
                    <tr>
                        <td className="label">Shear area</td>
                        <td><input value={shearArea}  className="output" readOnly/></td>
                        <td>sq. inches</td>
                    </tr>
                    <tr>
                        <td className="label">Required UTS</td>
                        <td><input value={ultTensStrength} className="output" readOnly /></td>
                        <td>psi</td>
                    </tr>
                    <tr>
                         <td></td>
                         <td><input type="button" value="Calculate" onClick={calculateStress} /></td>
                     </tr>
                </tbody>
            </table>
            <p>{message}</p>
        </div>
        <div className="notes">
            Shear pins are designed to break in case rotating equipment jams up.
            By breaking, they prevent excessive torque from damaging equipment.
            This calculation applies to a shear pin design which is in shear only
            (i.e., there is no tension in the pin).
        </div>
    </div>
    );
}

export default ShearPinCalc;
