import "./style.css";
import './images/avatar.jpg';
import './images/like-active.svg';
import './images/like-inactive.svg';
import './images/trash-icon.svg';
import './images/close.svg';
import './images/logo.svg';
import './vendor/fonts/Inter-Regular.woff2';
import './vendor/fonts/Inter-Black.woff2';

import {Card} from './pages/card.js';
import {CardList} from './pages/card_list.js';
import {Popup} from './pages/popup.js';
import {UserInfo} from './pages/user_info.js';
import {FormValidator} from './pages/form_validator.js';
import {Api} from './pages/api.js';

(function () {
	function init() {
		const path = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort7' : 'https://praktikum.tk/cohort7';
		const api = new Api({
			baseUrl: path,
			headers: {
				authorization: '6b30a88a-d944-4136-a010-f6f35c17079f',
				'Content-Type': 'application/json'
			}
		});
		const profileForm = document.forms.profile;
		const cardForm = document.forms.new;
		const cardsContainer = document.querySelector('.places-list');
		const popupAddElement = document.querySelector('.popup_add-card');
		const popupEditElement = document.querySelector('.popup_edit-profile');
		const popupImageElement = document.querySelector('.popup_image');
		const userInfoElement = document.querySelector('.user-info'); //информация о пользователе

		//конструкторы
		const userInfo = new UserInfo(event, userInfoElement, profileForm, api);

		const popupAdd = new Popup(popupAddElement, cardForm);
		const popupEdit = new Popup(popupEditElement, profileForm);
		const popupImage = new Popup(popupImageElement);

		const card = new Card(popupImageElement, popupImage, api);


		const cardList = new CardList(cardsContainer, card, cardForm, api);
		const cardFormValidator = new FormValidator(cardForm, cardList);
		const profileFormValidator = new FormValidator(profileForm, userInfo);
		//обработчики
		popupAdd.setEventListeners(cardFormValidator);
		popupEdit.setEventListeners(profileFormValidator, userInfo);
		popupImage.setEventListeners();

		cardFormValidator.setEventListeners();
		profileFormValidator.setEventListeners();

		cardList.render(cardsContainer);
		userInfo.setUserInfo();
	}
	document.addEventListener("DOMContentLoaded", init);
})();
