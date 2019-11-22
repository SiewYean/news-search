import React from "react";

function FormButton(props) {
    return (
        <button {...props} style={{flaot: "right", marginBottom: 10}} className="btn">
        {props.children}
        </button>
    );
}

export default FormButton;