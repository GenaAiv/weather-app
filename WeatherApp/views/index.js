document.addEventListener('load', () => {
	getLocation();
});

const getLocation = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	}
};

const showPosition = (position) => {
	document.getElementById('getlat').value = position.coords.latitude;
	document.getElementById('getlon').value = position.coords.longitude;
	lat = document.getElementById('getlat').value;
	lon = document.getElementById('getlon').value;

	document.frm1.submit();
	if (window.location.href != 'http://localhost:5000/') window.stop();
};
