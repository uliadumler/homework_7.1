(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
window.addEventListener('DOMContentLoaded', function() {
	
	let tab = require('../parts/tab.js');
	let modal = require('../parts/modal.js');
	let ajax = require('../parts/ajax.js');
	let slider = require('../parts/slider.js');
	let calc = require('../parts/calc.js');
	let timer = require('../parts/timer.js');

	tab();
	modal();
	ajax();
	slider();
	calc();
	timer();
	
});

	






},{"../parts/ajax.js":2,"../parts/calc.js":3,"../parts/modal.js":4,"../parts/slider.js":5,"../parts/tab.js":6,"../parts/timer.js":7}],2:[function(require,module,exports){
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
					setTimeout(function() {
						statusMessage.innerHTML = '';
					}, 2000);
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
},{}],3:[function(require,module,exports){
function calc () {

	// Calc 

	let persons = document.getElementsByClassName('counter-block-input')[0],
			restDays = document.getElementsByClassName('counter-block-input')[1],
			place = document.getElementById('select'),
			totalValue = document.getElementById('total'),
			personsSum = 0,
			daysSum = 0,
			total = 0,
			koef = 1;

	totalValue.innerHTML = 0;

	reloadTotalValue = function() {
		total = daysSum * personsSum * koef * 2000;
		if (persons.value == '' || restDays.value == '') {
			totalValue.innerHTML = 0;
		} else {
			setValue(totalValue, total, 100, 100);
		}
	};

	persons.addEventListener('change', function(){
		personsSum = +this.value;
		reloadTotalValue();
	});

	restDays.addEventListener('change', function(){
		daysSum = +this.value;
		reloadTotalValue();
	});

	//persons.onkeypress = e => !(e.key === '.' || e.key === '+' || e.key === 'e');
	//restDays.onkeypress = e => !(e.key === '.' || e.key === '+' || e.key === 'e');

	persons.onkeypress = function(e) {  
		if (e.key === '.' || e.key === '+' || e.key === 'e' || e.key === '-') {
			return false;
		}
	}

	restDays.onkeypress = function(e) {  
		if (e.key === '.' || e.key === '+' || e.key === 'e' || e.key === '-') {
			return false;
		}
	}

	place.addEventListener('change', function() {
			koef = this.options[this.selectedIndex].value;
			reloadTotalValue();
	});

	// Анимируем счетчик

	let setValue = function(elem, value, step, speed){
	   
	  let interval = setInterval(function() {
      if (elem.innerHTML * 1 + step >= value) {
        elem.innerHTML = value;
        clearInterval(interval);
      } else {
        elem.innerHTML = elem.innerHTML * 1 + step;
      }
  	}, speed);
  }
}

module.exports = calc;
},{}],4:[function(require,module,exports){
function modal() {
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
		
}

module.exports = modal;
},{}],5:[function(require,module,exports){
function slider() {
	// Slider

	let slideIndex = 1, // слайд, который виден
			slides = document.getElementsByClassName('slider-item'),
			prev = document.querySelector('.prev'), // стрелки 
			next = document.querySelector('.next'),
			dotsWrap = document.querySelector('.slider-dots'),
			dots = document.getElementsByClassName('dot');

	showSlides(slideIndex);

	// Показываем слайды
	function showSlides(n) {

		if (n > slides.length) {
			slideIndex = 1; // 1-й слайд
		} 
		if (n < 1) {
			slideIndex = slides.length; // последний слайд
		}

		for (let i = 0; i < slides.length; i++) {
			slides[i].style.display = 'none';
		}

		for (let i = 0; i < dots.length; i++) {
			dots[i].classList.remove('dot-active');
		}		

		slides[slideIndex - 1].style.display = 'block'; // показываем 1-й слайд [0]
		dots[slideIndex - 1].classList.add('dot-active'); // делаем активной 1-ую кнопку
	}

	// Перелистываем какое-то количество слайдов
	function plusSlides (n) {
		showSlides(slideIndex += n);
	}

	// Получаем индекс текущего активного слайда
	function currentSlide(n) {
		showSlides(slideIndex = n);
	}

	prev.addEventListener('click', function(){
		plusSlides(-1); // перелистнуть на слайд назад
		for (let i = 0; i < slides.length; i++) {
			slides[i].classList.remove('fade');
			slides[i].classList.add('fades');
		}
	});

	next.addEventListener('click', function(){
		plusSlides(1);// перелистнуть на слайд вперед
		for (let i = 0; i < slides.length; i++) {
			slides[i].classList.remove('fades');
			slides[i].classList.add('fade');
		}
	});

	dotsWrap.addEventListener('click', function(event) {
		for(let i = 0; i < dots.length + 1; i++) {
			if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
				currentSlide(i);
				for (let i = 0; i < slides.length; i++) {
					slides[i].classList.remove('fades');
					slides[i].classList.remove('fade');
					slides[i].classList.add('bright');
				}
			}
		}
	});
}

module.exports = slider;
},{}],6:[function(require,module,exports){
function tab() {
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
	});
}

module.exports = tab;
},{}],7:[function(require,module,exports){
function timer() {
	// Timer

	let deadline = '2018-07-20'; // дата, на которой заканчивается таймер

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
}

module.exports = timer;
},{}]},{},[1]);
