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

}); 




