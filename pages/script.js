(function () {
	function init() {
		const api = new Api({
			baseUrl: 'http://95.216.175.5/cohort7',
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

/**
 *
 *  /**
  * Здравствуйте. Очень хорошая работа, даже доп задания сделали, что не может радовать
  * --------------------------------------------------------------------
  * Весь функционал работает корректно
  * Код чистый и хорошо читается
  * Вы используете логические группировки операций
  * У вас нет дублирование кода
  *  Вы не используете небезопасный innerHtml
  *  Вы используете делегирование
  * --------------------------------------------------------------------

   * можно лучше: избегайте сложных условий и большой вложенности в условии. Чем сложнее условие, чем больше
   * вложенности в условии, тем сложнее анализировать код, сложнее искать ошибки и поддерживать такой код
   * самый простой вариант это убирать условия или блок в условии в отдельную функцию
  *
  *
 *
* Класс Api это отдельный класс который ничего не знает о других классах и методах
* Вы можете только получать данные из этого класса и использовать эти данные.
* Представьте, что я дам Вам другой класс(допустим DataBase) к внутренностям которого вы не будете иметь доступ и даже прочитать этот файл не сможете
* скажу что у него есть несколько методов  getInitialCards deleteCard addCard, editUserInfo, setUserInfo и так далее
* Который только возвращает данные, а вы можите получить только обращась к этим методам.
* Соответственно в классе нельзя реализовать такие методы как querySelector или обратиться к другому классу, а только обратитьсяк методам.
* Отдельная обязанность. Таким же способом Вы обращаетесь к серверу. Вы не знаете, что на сервере, даже язык программирования, но вы знаете методы
* к которым обращаетесь и способ обращения. Это и есть обязанность отдельного класса.
*/
