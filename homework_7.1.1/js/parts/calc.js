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