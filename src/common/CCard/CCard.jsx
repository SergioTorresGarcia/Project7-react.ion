import React from 'react';
import "./CCard.css";

const CCard = ({ className, content, follow, username, likesCount, emitFunction, emitfunction2, onClick }) => {

    return (
        <div className={className}>
            <div className="card-content">
                <div className='quote' onClick={onClick} >
                    {/* <img src={imageUrl} alt={`Image for post ${_id}`} /> */}
                    <span>❝</span> {content && content.length > 100 ? content.slice(0, 100) + "..." : content} <span>❝</span>
                    {/* <p>{userId.slice(-3)}</p> */}
                </div>
                <div className='down-line'>
                    <span className='corner-follow plus' onClick={emitfunction2}>{follow}</span>
                    <span className="middle-author">{username}</span>
                    <span className='corner-likes ' onClick={emitFunction}>{likesCount}</span>
                </div>
            </div>
        </div >
    );
};

export default CCard;
