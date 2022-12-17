import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup ({isOpen, onClose, onUpdateUser}) {

    const user = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(user.name);
        setDescription(user.about);
    }, [user, isOpen]);

    function handleChangeName (e) {
        setName(e.target.value);
    }

    function handleChangeDescription (e) {
        setDescription(e.target.value);
    }

    function handleSubmit (e) {
        e.preventDefault();
        onUpdateUser ({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='editForm'
            title='Редактировать профиль'
            isOpen = {isOpen}
            onClose = {onClose}
            onSubmit = {handleSubmit}
            buttonText='Сохранить'>
            <input type="text" placeholder="Имя" className="popup__input popup__input_type_userInfo"
                   name="name" required
                   minLength="2" maxLength="40" id="name-input" value={name || ''} onChange={handleChangeName} />
            <span className="popup__input-error name-input-error"/>
            <input type="text" placeholder="О себе"
                   className="popup__input popup__input_type_editFormDescription"
                   name="about" required minLength="2" maxLength="200" id="description-input" value={description || ''}
                   onChange={handleChangeDescription} />
            <span className="popup__input-error description-input-error"/>
        </PopupWithForm>
    );
}

export default EditProfilePopup;