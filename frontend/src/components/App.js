import React from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import api from "../utils/Api";
import EditProfileAvatarPopup from './EditProfileAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddCardPopup from './AddCardPopup.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import * as auth from '../auth.js';
import union from '../images/Union.png';
import union_error from '../images/Union-error.png';

function App() {
    const [currentUser, setCurrentUser] = React.useState({});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditProfileAvatarPopupOpen, setIsEditProfileAvatarPopupOpen] = React.useState(false);
    const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');
    const [text, setText] = React.useState('');
    const [image, setImage] = React.useState('');
    const history = useHistory();

    React.useEffect(() => {
        tokenCheck();
    }, [])

    React.useEffect(() => {
        if (loggedIn) {
            api.getProfileInfo().then((userStats) => {
                console.log(userStats)
                setCurrentUser(
                    userStats
                )
            })
                .catch
                ((err) => {
                    console.log(err);
                })
            api.getInitialCards().then((data) => {
                setCards(
                    data.data.map((card) => ({
                        _id: card._id,
                        link: card.link,
                        name: card.name,
                        likes: card.likes,
                        owner: card.owner
                    }))
                )
            })
                .catch((err) => {
                    console.log(err);
                })}
        }, [loggedIn]
    )
        ;

        function handleUpdateProfileInfo(data) {
            api.updateProfileInfo(data)
                .then((userStats) => {
                    setCurrentUser(
                        userStats
                    )
                    closeAllPopup(setIsEditProfileAvatarPopupOpen)
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        function handleUpdateProfileAvatar(data) {
            api.updateProfileAvatar(data)
                .then((userStats) => {
                    setCurrentUser(
                        userStats
                    )
                    closeAllPopup(setIsEditProfilePopupOpen)
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        function closeAllPopup() {
            setIsEditProfileAvatarPopupOpen(false);
            setIsAddCardPopupOpen(false);
            setIsEditProfilePopupOpen(false);
            setSelectedCard({});
            setIsInfoTooltipOpen(false);
        }

        function handleCardLike(card) {
            const isLiked = card.likes.some(i => i._id === currentUser._id);

            if (!isLiked) {
                api.likeCard(card, card._id)
                    .then((newCard) => {
                        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else {
                api.dislikeCard(card, card._id)
                    .then((newCard) => {
                        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }

        function handleCardDelete(card) {
            api.deleteCard(card, card._id)
                .then(() => {
                    const result = cards.filter(item => item._id !== (card._id));
                    setCards(result);
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        function handleAddCardSubmit(data) {
            api.createNewCard(data)
                .then((newCard) => {
                    setCards([newCard, ...cards])
                    closeAllPopup(setIsAddCardPopupOpen)
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        function handleLogin(e) {
            e.preventDefault()
            setLoggedIn(true);
        }

        function tokenCheck() {
            if (localStorage.getItem('token')) {
                const token = localStorage.getItem('token');
                if (token) {
                    auth.getContent(token)
                        .then((res) => {
                            if (res) {
                                const email = res.data.email
                                setLoggedIn(true);
                                setUserEmail(email);
                            }
                            history.push('/')
                        })
                        .catch((err) => console.log(err));
                }
            }
        }

        function deleteToken() {
            localStorage.removeItem('token');
            history.push('/sign-in')
            setLoggedIn(false);
        }

        function onRegister(email, password) {
            auth.register(email, password)
                .then((res) => {
                    if (res) {
                        history.push('./sign-in');
                        setIsInfoTooltipOpen(true);
                        setText('Вы успешно зарегистрировались!')
                        setImage(union)
                    } else {
                        setIsInfoTooltipOpen(true);
                        setText('Что-то пошло не так! Попробуйте ещё раз.')
                        setImage(union_error)
                    }
                })
                .catch((err) => console.log(err));
        }

        function onAuthorize(email, password) {
            auth.authorize(email, password)
                .then((data) => {
                    if (data.token) {
                        setLoggedIn(true);
                        setUserEmail(email);
                        history.push('/')
                    }
                })
                .catch(err => console.log(err));
        }


        return (
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                    <div className="page_content">

                        <Header loggedIn={loggedIn} userData={userEmail} deleteToken={deleteToken}/>
                        <Switch>

                            <Route path="/sign-in">
                                <Login onAuthorize = {onAuthorize}/>
                            </Route>

                            <Route path='/sign-up'>
                                <Register
                                    onButtonClick = {onRegister}/>
                            </Route>

                            <ProtectedRoute path="/"
                                            loggedIn={handleLogin}
                                            onEditAvatar={setIsEditProfileAvatarPopupOpen}
                                            onEditProfile={setIsEditProfilePopupOpen}
                                            onAddCard={setIsAddCardPopupOpen}
                                            onCardClick={setSelectedCard}
                                            cards={cards}
                                            onCardLike={handleCardLike}
                                            onCardDelete={handleCardDelete}
                                            component={Main}
                                            userData={userEmail}
                                            onDeleteToken={deleteToken}>
                            </ProtectedRoute>
                        </Switch>
                        <Footer className="footer"/>
                        <EditProfilePopup
                            isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopup}
                            onUpdateUser={handleUpdateProfileInfo}
                        />
                        <EditProfileAvatarPopup
                            isOpen={isEditProfileAvatarPopupOpen}
                            onClose={closeAllPopup}
                            onUpdateAvatar={handleUpdateProfileAvatar}
                        />
                        <AddCardPopup
                            isOpen={isAddCardPopupOpen}
                            onClose={closeAllPopup}
                            onAddCard={handleAddCardSubmit}
                        />

                        <PopupWithForm
                            name='delete-form'
                            className="popup__button popup-deleting__form-button"
                            title='Вы уверены?'
                            buttonText='Да'>
                        </PopupWithForm>
                        <ImagePopup card={selectedCard} onClose={closeAllPopup}/>
                        <InfoTooltip
                            isOpen={isInfoTooltipOpen}
                            onClose={closeAllPopup}
                            image={image}
                            text={text}>
                        </InfoTooltip>
                    </div>
                </div>
            </CurrentUserContext.Provider>)
    }

    export default App;
