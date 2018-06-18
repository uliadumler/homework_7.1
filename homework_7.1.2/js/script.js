function myClock () {
	let date = new Date(),
			time = addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds());
	
	document.getElementById('timer').innerHTML = time
}

myClock();

function addZero(num) {
	if (num >= 0 && num < 10) {
		return '0' + num; 
	} else {
		return num;
	}
}

setInterval(myClock, 1000);



let age = document.getElementById('age');
 
function showUser(surname, name) {
  alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
}

let message = showUser.bind(age);

message('Ivanov', 'Ivan'); 
