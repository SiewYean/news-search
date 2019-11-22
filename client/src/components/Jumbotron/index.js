import React from "react";

function Jumbotron(title, ref) {
    return <div className="jumbotron">
        <div className="container">
            <h1 className="display-4">{title.children}</h1>
        </div>
    </div>
};

export default Jumbotron;