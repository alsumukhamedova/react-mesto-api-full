import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddCardPopup ({isOpen, onClose, onAddCard}) {

    const [cardName, setCardName] = React.useState('');
    const [url, setUrl] = React.useState('');

    function handleChangeCardName (e) {
        setCardName(e.target.value);
    }

    function handleChangeUrl (e) {
        setUrl(e.target.value);
    }

    function handleSubmit (e) {
        e.preventDefault();
        onAddCard ({
            name: cardName,
            link: url
        })
    }

    return (
        <PopupWithForm
            name='elementInfo'
            id="place"
            title='Новое место'
            isOpen = {isOpen}
            onClose = {onClose}
            onSubmit = {handleSubmit}
            buttonText='Создать'>
            <input type="text" name="name" placeholder="Название"
                   className="popup__input popup__input_type_place" required
                   minLength="2" maxLength="30" id="place-input"
                   value={cardName} onChange={handleChangeCardName} />
            <span className="popup__input-error place-input-error"/>
            <input type="url" name="link" placeholder="Ссылка на картинку"
                   className="popup__input popup__input_type_link"
                   required id="url-input"
                   value={url} onChange={handleChangeUrl} />
            <span className="popup__input-error url-input-error"/>
        </PopupWithForm>
    );
}

export default AddCardPopup;