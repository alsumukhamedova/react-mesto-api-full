import React from 'react';

function PopupWithForm({name, title, isOpen, children, onClose, buttonText, onSubmit}) {

    return (
        <section className={`popup popup_type_${name}` + ' ' + (isOpen ? 'popup_opened' : '')}>
            <div className="popup__container">
                <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}/>
                <h3 className="popup__title">{title}</h3>
                <form className="popup__form" name={name} noValidate onSubmit= {onSubmit}>
                    {children}
                    <button className="popup__button" type="submit">{buttonText}</button>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;