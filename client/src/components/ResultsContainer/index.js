import React from "react";


function Container({fluid, children}) {
    return <div className={`container${fluid ? "-fluid" : ""} row`}>{children}</div>;
}

export default Container;