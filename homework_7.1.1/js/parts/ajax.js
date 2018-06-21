function ajax() {
	// AJAX

	let form = document.getElementsByClassName('main-form')[0],
			input = form.getElementsByTagName('input'),
			contactForm = document.getElementById('form'),
			contactFormInput = contactForm.getElementsByTagName('input'),
			statusMessage = document.createElement('div'); // создаем div, куда помещаем сообщение

	statusMessage.classList.add('status');// присваиваем название класса

	function ajax(form, input) {
		let message = new Object();
		message.loading = 'Загрузка...';
		message.success = 'Спасибо! Скоро мы с вами свяжемся';
		message.error = 'Что-то пошло не так...';
		
		let request = new XMLHttpRequest();
		request.open("POST", 'server.php');

		request.setRequestHeader("Content-Type", "application/x-ww-form-urlencoded");// кодировка для правильной передачи данных

		let formData = new FormData(form);// собираем все данные из полей ввода формы

		request.send(formData); // отправляем данные на сервер

		request.onreadystatechange = function() {          // отслеживаем статус готовности запроса
			if (request.readyState < 4) {
				statusMessage.innerHTML = message.loading;
			} else if (request.readyState === 4) {
				if (request.status == 200 && request.status < 300) {
					statusMessage.innerHTML = message.success;
					// здесь можно добавить контент на страницу
				} else {
					statusMessage.innerHTML = message.error;
				}
			}
		} 

		for (let i = 0; i < input.length; i++) {
			input[i].value = ''; // очищаем поля ввода
		}
	}

	form.addEventListener('submit', function(event) {
		event.preventDefault();
		form.appendChild(statusMessage);

		ajax(form, input);
	});

	contactForm.addEventListener('submit', function(event) {
		event.preventDefault();
		contactForm.appendChild(statusMessage);

		ajax(contactForm, contactFormInput);
	});
}

module.exports = ajax;