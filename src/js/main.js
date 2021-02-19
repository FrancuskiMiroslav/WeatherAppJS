document.addEventListener('DOMContentLoaded', function () {
	window.addEventListener('load', (e) => {
		const preload = document.querySelector('.preload');

		preload.classList.add('preload-finished');
	});

	const btnScrollToTop = document.getElementById('btnScrollToTop');

	if (btnScrollToTop) {
		btnScrollToTop.addEventListener('click', (e) => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			});
		});
	}

	const api = {
		key: '04afd98c4d235fb8ba117d5701f7ecf3',
		baseUrl: 'https://api.openweathermap.org/data/2.5/',
	};

	const searchBox = document.querySelector('.search-box');
	const searchBtn = document.querySelector('.submit-box');
	const form = document.getElementById('myForm');
	const single_cityEl = document.getElementById('single-city');

	async function searchCity(e) {
		e.preventDefault();

		single_cityEl.innerHTML = '';

		const term = searchBox.value;

		if (term.trim()) {
			const response = await fetch(
				`${api.baseUrl}weather?q=${term}&units=metric&APPID=${api.key}`
			);
			const data = await response.json();

			if (data === null) {
				console.log('There are no search results. Try again!');
			} else {
				const {
					name,
					main: { temp, temp_max, temp_min, humidity, feels_like },
					sys: { country },
					weather: [{ description, icon }],
					wind: { speed },
				} = data;

				single_cityEl.innerHTML = `
						<section class="location">
							<div class="city">${name}, ${country}</div>
							<div class="date">Utorak, 11.februar 2020.</div>
						</section>
						<div class="current">
							<div class="temp"> ${Math.round(temp)}
								<span> &#8451; </span>
							</div>

							<div class="weather">
								<ul class="weather__list">
									<li class="weather__list-item">Vetar: ${Math.round(speed)} km/h</li>
									<li class="weather__list-item">Vlažnost: ${Math.round(humidity)}%</li>
									<li class="weather__list-item">Osećaj: ${Math.round(
										feels_like
									)}<span> &#8451; </span></li>
									<li class="weather__list-item"><img src="http://openweathermap.org/img/w/${icon}.png" alt="${description}"><span>${description}</span></li>
								</ul>
								
							</div>

							<div class="hi-low">
								min. ${Math.round(temp_min)} <span>&#8451;</span> / max. ${Math.round(
					temp_max
				)} <span>&#8451;</span>
							</div>
						</div>
						`;

				let now = new Date();
				let date = document.querySelector('.location .date');
				date.innerText = dateBuilder(now);
			}
		} else {
			alert('Please enter a search term');
		}
	}

	function dateBuilder(d) {
		let months = [
			'Januar',
			'Februar',
			'Mart',
			'April',
			'Maj',
			'Jun',
			'Jul',
			'Avgust',
			'Septembar',
			'Oktobar',
			'Novembar',
			'Decembar',
		];
		let days = [
			'Nedelja',
			'Ponedeljak',
			'Utorak',
			'Sreda',
			'Četvrtak',
			'Petak',
			'Subota',
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day}, ${date}. ${month} ${year}.`;
	}

	searchBox.addEventListener('keydown', (e) => {
		if (e.keyCode == 13 && searchBox.value != '') {
			searchCity(searchBox.value);
		}
	});

	form.addEventListener('submit', searchCity);

	searchBox.value = 'Novi Sad';
	searchBtn.click();
});
