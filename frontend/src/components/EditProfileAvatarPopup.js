import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfileAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {

    const avatarRef = React.useRef('');

    function handleChangeAvatar () {
        return avatarRef.current.value;
    }

    function handleSubmit (e) {
        e.preventDefault();
        onUpdateAvatar ({
            avatar: avatarRef.current.value
        });
        avatarRef.current.value = ""
    }

    return (
        <PopupWithForm
            name='edit-avatar'
            title='Обновить аватар'
            isOpen = {isOpen}
            onClose = {onClose}
            onSubmit = {handleSubmit}
            buttonText='Сохранить'>
            <input id="url-input-avatar" ref={avatarRef} onChange={handleChangeAvatar} className="popup__input" type="url" name="avatar" placeholder="Ссылка на аватар" required />
            <span className="url-input-avatar-error popup__input-error popup-avatar-editing__input-error"/>
        </PopupWithForm>
    );
}

export default EditProfileAvatarPopup;