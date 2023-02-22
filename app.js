// When the user scrolls the page, execute myFunction
window.onscroll = function () {
	stickyHeader();
};

// Get the header
const header = document.querySelector('.header');
const logoPct = document.querySelector('.logo-picture');

// Get the offset position of the navbar
const sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position.
//Remove "sticky" when you leave the scroll position
function stickyHeader() {
	if (window.pageYOffset > sticky) {
		header.classList.add('sticky');
		logoPct.style.width = '130px';
	} else {
		header.classList.remove('sticky');
		logoPct.style.width = '200px';
	}
}

// nav responsywne na btn
const hambBtn = document.querySelector('.fa-bars');
const icon = document.querySelector('.hamburger-menu');
const showNav = () => {
	if (icon.style.display === 'none') {
		icon.style.display = 'block';
	} else {
		icon.style.display = 'none';
	}
};
hambBtn.addEventListener('click', showNav);

// reservation online yieldplanet
const reservation = document.querySelector('.reservation');
const modal = document.querySelector('.modal');

reservation.addEventListener('click', () => {
	modal.classList.add('active');
	document.body.classList.add('modal-backdrop');
});

const listenerDocument = (e) => {
	if (e.key === 'Escape' || e.target.className === 'modal active') {
		modal.classList.remove('active');
		document.body.classList.remove('modal-backdrop');
	}
};
modal.addEventListener('click', listenerDocument);
document.addEventListener('keydown', listenerDocument);
// close reservation field

const closeModal = document.querySelector('.close');

closeModal.addEventListener('click', () => {
	modal.classList.remove('active');
	document.body.classList.remove('modal-backdrop');
});

// SLIDER NA Flexie
const selectAll = (selector) => document.querySelectorAll(selector);
const select = (selector) => document.querySelector(selector);
const mod = (n, m) => ((n % m) + m) % m;

selectAll('.section3').forEach(() => {
	const slideBox = select('.slider');

	// selectAll('.item') -- NOdelista slidów
	// sprawdzamy liczbę naszych slajdów
	const totalSlides = selectAll('.item').length;
	const totalDots = selectAll('.fa-circle');

	//nasz licznik
	let c = 0;

	//animacja na rodzicu slidow
	const anim = () => (slideBox.style.transform = `translateX(-${c * 100}%)`);

	// funkcja na przycisku
	const prev = () => {
		c = mod(c - 1, totalSlides);

		switch (c) {
			case 0:
				totalDots[1].classList.remove('active2');
				totalDots[0].classList.add('active2');
				break;
			case 1:
				totalDots[2].classList.remove('active2');
				totalDots[1].classList.add('active2');
				break;
			case 2:
				totalDots[3].classList.remove('active2');
				totalDots[2].classList.add('active2');
				break;
			case 3:
				totalDots[4].classList.remove('active2');
				totalDots[3].classList.add('active2');
				break;
			case 4:
				totalDots[0].classList.remove('active2');
				totalDots[4].classList.add('active2');
				break;
		}
		anim();
	};

	const next = () => {
		c = mod(c + 1, totalSlides);

		switch (c) {
			case 0:
				totalDots[4].classList.remove('active2');
				totalDots[0].classList.add('active2');
				break;
			case 1:
				totalDots[0].classList.remove('active2');
				totalDots[1].classList.add('active2');
				break;
			case 2:
				totalDots[1].classList.remove('active2');
				totalDots[2].classList.add('active2');
				break;
			case 3:
				totalDots[2].classList.remove('active2');
				totalDots[3].classList.add('active2');
				break;
			case 4:
				totalDots[3].classList.remove('active2');
				totalDots[4].classList.add('active2');
				break;
		}

		anim();
	};

	// listener na nasze przyciski
	select('.left').addEventListener('click', prev);
	select('.right').addEventListener('click', next);

	// czysci interwał gdy myszka na strzałce
	document.querySelector('.buttons-arrow').addEventListener('click', () => {
		clearInterval(interval);
	});

	// interwał na autoslide
	const interval = setInterval(next, 6000);
});

// form validation and send msg
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const message = document.querySelector('#message');
const error = document.querySelectorAll('.error-text');
const submitBtn = document.querySelector('.submitBtn');
const form = document.querySelector('form');

// literujemy po naszej tablicy inputow i sprawdzamy czy ich wartosc jest
//wpisana, jesli nie to wywolujemy f. error a jak jest to f clearerror
const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value === '') {
			showError(el);
		} else {
			clearError(el);
		}
	});
};

// lapiemy rodzenstwo inputa by wyswietlic blad lub usunac
const showError = (input) => {
	// argument input przechowuje nasze inputy co nie przeszly testu,
	const errorMsg = input.previousElementSibling;
	errorMsg.classList.add('error');
	input.classList.add('error');
};

const clearError = (input) => {
	const errorMsg = input.previousElementSibling;
	errorMsg.classList.remove('error');
	input.classList.remove('error');
};

const checkUserName = (input) => {
	var regName = /^[a-z ,.'-]+( [a-z ,.'-]+)+$/i;
	if (!regName.test(input.value)) {
		showError(input);
	} else {
		clearError(input);
	}
};

const checkMail = (email) => {
	const regMail =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (regMail.test(email.value)) {
		clearError(email);
	} else {
		showError(email);
	}
};

const checkPhone = (input) => {
	var regPhone = /^[0-9+]{8,13}$/;
	if (regPhone.test(input.value)) {
		clearError(input);
	} else {
		showError(input);
	}
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.check');
	let errorCount = 0;
	allInputs.forEach((el) => {
		if (el.classList.contains('error')) {
			errorCount++;
		}
	});

	if (errorCount === 0) {
		form.submit();
	}
};

//nadajemy 2 listenery na nasze przyciski, i ustawiamy
//preventDefault zeby nie przeladowywal strony
submitBtn.addEventListener('click', (e) => {
	e.preventDefault();
	// umiescilismy nasze inputy w tablicy by bylo prosciej
	checkForm([username, email, phone, message]);
	checkUserName(username);
	checkMail(email);
	checkPhone(phone);
	checkErrors();
});
