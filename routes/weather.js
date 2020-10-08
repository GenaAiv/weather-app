const express = require('express');
const key = '881cc1b6210cf691387d7f9d91cd80d8';
const fetch = require('node-fetch');
let router = express.Router();

let options = {};

const getLocationByCity = async (city) => {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
	try {
		await fetch(url)
			.then((res) => res.json())
			.then((data) => {
				return (options = {
					name: data.name,
					temp: Math.round(data.main.temp),
					tempMin: Math.round(data.main.temp_min),
					tempMax: Math.round(data.main.temp_max),
					description: data.weather[0].description,
					date: new Date(data.dt * 1000).toLocaleDateString('en-US'),
					icon: data.weather[0].icon,
				});
			});
	} catch (error) {
		return (options = {
			name: 'Invalid City',
		});
	}
};

const getLocationByLat = async (lat, lon) => {
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
	try {
		await fetch(url)
			.then((res) => res.json())
			.then((data) => {
				return (options = {
					name: data.name,
					temp: Math.round(data.main.temp),
					tempMin: Math.round(data.main.temp_min),
					tempMax: Math.round(data.main.temp_max),
					description: data.weather[0].description,
					date: new Date(data.dt * 1000).toLocaleDateString('en-US'),
					icon: data.weather[0].icon,
				});
			});
	} catch (error) {
		return (options = {
			name: 'Invalid City',
		});
	}
};

router.route('/').get(async (req, res) => {
	const lat = req.query.latitude;
	const lon = req.query.longitude;
	await getLocationByLat(lat, lon);

	await res.render('index', options);
});

router.route('/').post(async (req, res) => {
	const city = req.body.city;

	await getLocationByCity(city);
	await res.render('index', options);
});

module.exports = router;
