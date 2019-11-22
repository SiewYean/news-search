import React from "react";

function DeleteButton(props) {
    return (
        <button className="btn btn-primary" {...props}>
        Delete Article</button>
    );
}

export default DeleteButton;