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