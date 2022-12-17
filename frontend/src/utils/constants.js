export const content = document.querySelector('.content');
export const cardsContainer = content.querySelector('.elements');
export const profile = document.querySelector('.profile');

export const addButton = profile.querySelector('.profile__add-button');
export const editButton = profile.querySelector('.profile__edit-button');

export const popupProfile = document.querySelector('#edit')
export const popupPlace = document.querySelector('#place')
export const popupImage = document.querySelector('.popup-image');
export const popupDeleting = document.querySelector('.popup-deleting');

export const popupProfileClose = popupProfile.querySelector('.popup__close')
export const popupPlaceClose = popupPlace.querySelector('.popup__close')
export const popupImageClose = popupImage.querySelector('.popup__close')

export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector ('.profile__pic');
export const profileEditingPopup = document.querySelector('.popup-avatar-editing');
export const popupImageImage = document.querySelector('.popup-image__image');
export const popupImageText = document.querySelector('.popup-image__text');
export const profileForm = popupProfile.querySelector('.popup__form');
export const avatarEditingForm = document.querySelector('.popup-avatar-editing__form');
export const inputTypeUserInfo = document.querySelector('.popup__input_type_userInfo');
export const inputTypeDescription = document.querySelector('.popup__input_type_editFormDescription');

export const editForm = document.forms.editForm;
export const nameInput = editForm.elements.userInfo;
export const descriptionInput = editForm.elements.editFormDescription;


export const placeForm = document.forms.elementInfo;
export const name = placeForm.elements.place;
export const link = placeForm.elements.link;

export const userInform = {
    nameValueSelector: '.profile__name',
    jobValueSelector: '.profile__description',
    avatarSelector: '.profile__pic'
}

export const config = {
    formElement: '.form',
    inputElement: '.popup__input',
    buttonElement: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};
