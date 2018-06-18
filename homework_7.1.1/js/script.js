window.addEventListener('DOMContentLoaded', function() {
	
	// Timer

	let deadline = '2018-03-20'; // дата, на которой заканчивается таймер

	// Расчитываем сколько времени осталось до дедлайна

	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()), // разница между дедлайном и сегодняшней датой в ms
				seconds = addZero(Math.floor((t / 1000) % 60)),
				minutes = addZero(Math.floor((t / 1000 / 60) % 60)),
				hours = addZero(Math.floor((t / (1000 * 60 * 60))));

		if (t <= 0) {
			seconds = addZero(0);
			minutes = addZero(0);
			hours = addZero(0);	
		} 

		return {
			'total': t,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	
	}

	function addZero (num) {
		if (num >= 0 && num < 10) {
			return '0' + num
		} else {
			return num
		}
	}

	// Запускаем часы
	function setClock(id, endtime) {
		let timer = document.getElementById(id),
				hours = timer.querySelector('.hours'),
				minutes = timer.querySelector('.minutes'),
				seconds = timer.querySelector('.seconds');

		// Обновляем таймер каждую секунду
		function updateClock() {
			let t = getTimeRemaining(endtime);
			hours.innerHTML = t.hours;
			minutes.innerHTML = t.minutes;
			seconds.innerHTML = t.seconds;

			// if (t.total <= 0) {
			// 	clearInterval(timeInterval);
			// }
		}

		updateClock();

		let timeInterval = setInterval(updateClock, 1000);
	}

	setClock('timer', deadline);

	// Tabs

	let tab = document.getElementsByClassName('info-header-tab'),
			tabContent = document.getElementsByClassName('info-tabcontent'),
			info = document.getElementsByClassName('info-header')[0];

	// Прячем табы с контентом		
	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

	// Оставляем первый таб
	hideTabContent(1);	

	// Показываем таб
	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			hideTabContent(0);
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	// При клике по названию таба открываем соответствующий контент
	info.addEventListener('click', function(event) {
		let target = event.target;
		if (target.className == 'info-header-tab') {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					showTabContent(i);
					break;
				}
			}
		}
	})

	// Modal

	let more = document.querySelector('.more'),
			overlay = document.querySelector('.overlay'),
			close = document.querySelector('.popup-close'),
			description_btn = document.querySelectorAll('.description-btn');
			console.log(description_btn);

	more.addEventListener('click', function() {
		this.classList.add('more-splash');
		overlay.style.display = 'block';
		document.body.style.overflow = 'hidden';
	});

	close.addEventListener('click', function() {
		overlay.style.display = 'none';
		more.classList.remove('more-splash');
		document.body.style.overflow = '';
	});

	for (i = 0; i < description_btn.length; i++) {
		description_btn[i].addEventListener('click', function() {
			this.classList.add('more-splash');
			overlay.style.display = 'block';
			document.body.style.overflow = 'hidden';
		});
	}

	// Form 
	let message = new Object();
	message.loading = 'Загрузка...';
	message.success = 'Спасибо! Скоро мы с вами свяжемся';
	message.error = 'Что-то пошло не так...';

	let form = document.getElementsByClassName('main-form')[0],
			input = form.getElementsByTagName('input'),
			statusMessage = document.createElement('div');

	statusMessage.classList.add('status');// присваиваем название класса

	form.addEventListener('submit', function(event) {
		event.preventDefault();
		form.appendChild(statusMessage);

		// AJAX
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
	});

	// Contact form 
	
	let contactForm = document.getElementById('form'),
			contactFormInput = contactForm.getElementsByTagName('input');
			
	statusMessage.classList.add('status');// присваиваем название класса

	contactForm.addEventListener('submit', function(event) {
		event.preventDefault();
		contactForm.appendChild(statusMessage);

		// AJAX
		let request = new XMLHttpRequest();
		request.open("POST", 'server.php');

		request.setRequestHeader("Content-Type", "application/x-ww-form-urlencoded");// кодировка для правильной передачи данных

		let formData = new FormData(contactForm);// собираем все данные из полей ввода формы

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

		for (let i = 0; i < contactFormInput.length; i++) {
			contactFormInput[i].value = ''; // очищаем поля ввода
		}
	});
});

	





