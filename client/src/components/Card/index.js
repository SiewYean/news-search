import React from "react";
import "../ButtonStyle/style.css";
import "./style.css";

function Card({
    placeholder="https://via.placeholder.com/100",
    title,
    authors,
    date,
    description,
    image,
    link
    }) {
        
    date = date.replace("T", " ")
    date = date.replace("Z", "")

    return (
    <div className="card">
        <img className="card-img-top" src={image ? image : placeholder} alt={title} />
        <div className="card-body">
            <h5 className="card-title"><i>{title}</i></h5>
            <h5 className="card-title"><strong>Authors: </strong>{authors ? authors : "No authors found"}</h5>
            <h6 className="card-text"><strong>Date Published: </strong>{date ? date : "No published date found"}</h6>
            <p className="text-justify"><strong>Description: </strong>{description ? description : "No description found"}</p>
            <a href={link} className="btn btn-dark" rel="noopener noreferrer" target="_blank">Read More</a>
        </div>
    </div>
    );
};

export default Card;