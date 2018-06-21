function calc () {
	// Calc 

	let persons = document.getElementsByClassName('counter-block-input')[0],
			restDays = document.getElementsByClassName('counter-block-input')[1],
			place = document.getElementById('select'),
			totalValue = document.getElementById('total'),
			personsSum = 0,
			daysSum = 0,
			total = 0;

	totalValue.innerHTML = 0;

	persons.addEventListener('change', function(){
		personsSum = +this.value;
		total = daysSum * personsSum * 2000;
		if (persons.value == '' || restDays.value == '') {
			totalValue.innerHTML = 0;
		} else {
			//totalValue.innerHTML = total;
			setValue(totalValue, total, 100, 100);
		}
	});

	restDays.addEventListener('change', function(){
		daysSum = +this.value;
		total = daysSum * personsSum * 2000;
		if (persons.value == '' || restDays.value == '') {
			totalValue.innerHTML = 0;
		} else {
			//totalValue.innerHTML = total;
			setValue(totalValue, total, 100, 100);
		}
	});

	//persons.onkeypress = e => !(e.key === '.' || e.key === '+' || e.key === 'e');
	//restDays.onkeypress = e => !(e.key === '.' || e.key === '+' || e.key === 'e');

	persons.onkeypress = function(e) {  
		if (e.key === '.' || e.key === '+' || e.key === 'e') {
			return false;
		}
	}

	restDays.onkeypress = function(e) {  
		if (e.key === '.' || e.key === '+' || e.key === 'e') {
			return false;
		}
	}

	place.addEventListener('change', function() {
		if (restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		} else {
			let a = total;
			let b = a * this.options[this.selectedIndex].value;
			setValue(totalValue, b, 100, 50);
		}
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