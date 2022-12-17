import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

    const user = React.useContext(CurrentUserContext);
    const isOwn = props.owner._id === user._id;
    const cardDeleteButtonVisible = (`${isOwn ? 'element__delete-card_visible' : 'element__delete-card'}`)
    const isLiked = props.likes.some(i => i._id === user._id);
    const cardLikeButtonClassName = (`${isLiked ? 'element__like_active' : 'element__like'}`);


    function handleCardClick() {
        props.onCardClick(props);
    }

    function handleLikeClick() {
        props.onCardLike(props);
    }

    function handleCardDelete() {
        props.onCardDelete(props);
    }

    return (
        <div className="element">
            <img className="element__image" src={props.link} alt={props.name} onClick={() => {
                handleCardClick()
            }}/>
            <button type="button" className={cardDeleteButtonVisible} onClick={handleCardDelete}/>
            <div className="element__group">
                <p className="element__name">{props.name}</p>
                <div className="element_liking">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
                    <p className="element_likeCounter">{props.likes.length}</p>
                </div>
            </div>
        </div>

    )
}

export default Card;