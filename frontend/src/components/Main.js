import React from 'react';
import Card from '../components/Card.js';
import editVector from '../images/profile__editVector.svg';
import addVector from '../images/profile__addVector.svg';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Header from "./Header";

function Main({onEditAvatar, onEditProfile, onAddCard, onCardClick, onCardLike, onCardDelete, cards, userData, onDeleteToken}) {
    const user = React.useContext(CurrentUserContext);
    function onSignOut () {
        onDeleteToken();
    }

//     const [profileName, setProfileName] = React.useState();
//     const [profileDescription, setProfileDescription] = React.useState();
//     const [profileAvatar, setProfileAvatar] = React.useState();
//     const [cards, setCards] = React.useState([]);
//
//     React.useEffect(() => {
//         api.getProfileInfo().then((data) => {
//             setProfileName(data.name);
//             setProfileDescription(data.about);
//             setProfileAvatar(data.avatar)
//         });
//         api.getInitialCards().then((data) => {
//             setCards(
//                 data.map((item) => ({
//                     id: item._id,
//                     link: item.link,
//                     name: item.name,
//                     likes: item.likes
//                 }))
//             )
//         })
//     }, []);
    return (
        <>
            <section className="profile">
                <div className="profile__part">
                    <div className="profile__avatar"
                         onClick={() => {
                             onEditAvatar(true)
                         }}>
                        <button className="profile__editButton" type="button" aria-label="Изменить_аватар"/>
                        <img className="profile__pic" src={user.avatar} alt="аватар"/>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{user.name}</h1>
                        <p className="profile__description">{user.about}</p>
                        <button type="button" className="profile__edit-button" onClick={() => {
                            onEditProfile(true)
                        }}>
                            <img className="profile__editVector"
                                 src={editVector}
                                 alt="кнопка редактирования профиля"/>
                        </button>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={() => {
                    onAddCard(true)
                }}>
                    <img className="profile__addVector" src={addVector}
                         alt="кнопка добавления"/>
                </button>
            </section>

            <section className="elements">
                    {cards.map((card) => (
                        <Card
                            key = {card._id}
                            _id = {card._id}
                            link = {card.link}
                            name = {card.name}
                            likes = {card.likes}
                            owner = {card.owner}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
            </section>
        </>)
}

export default Main;