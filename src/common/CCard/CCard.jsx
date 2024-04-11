import React from 'react';
import "./CCard.css";

const CCard = ({ _id, content, userId, onClick }) => {
    // Generate image URL based on item id
    const imageUrl = `../img/s${id <= 4 ? id : id % 4}.png`;

    return (
        <div className="c-card" onClick={() => onClick(_id)}>
            <img src={imageUrl} alt={`Image for post ${_id}`} />
            <div className="card-content">
                <h3>{content}</h3>
                <p>User ID: {userId}</p>
            </div>
        </div>
    );
};

export default CCard;