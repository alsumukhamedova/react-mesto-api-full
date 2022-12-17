import React from 'react';

function ImagePopup ({card, onClose}) {

    return (
        <section className={`popup popup-image' ${card.link ? 'popup-image_opened': '' }`}>
            <div className="popup-image__container">
                <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose} />
                <img className="popup-image__image" alt={card.name} src={card.link}/>
                <h2 className="popup-image__text">{card.name}</h2>
            </div>
        </section>
    );
}

export default ImagePopup;