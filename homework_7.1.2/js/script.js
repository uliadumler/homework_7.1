let date = new Date(),
		time = addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds());
		
document.write(time);

function addZero(num) {
	if (num >= 0 && num < 10) {
		return '0' + num; 
	} else {
		return num;
	}
}