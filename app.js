// When the user scrolls the page, execute myFunction
window.onscroll = function () {
	stickyHeader();
};

// Get the header
const header = document.querySelector('.header');
const logoPct = document.querySelector('.logoPct');

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

// SLIDER NA Flexie

//
const selectAll = (selector) => document.querySelectorAll(selector);
const select = (selector) => document.querySelector(selector);
const mod = (n, m) => ((n % m) + m) % m;

//
selectAll('.slider-wrapper').forEach(() => {
	const slideBox = select('.slider');

	// selectAll('.item') -- NOdelista slidów
	// sprawdzamy ile mamy slajdów
	const items = selectAll('.item');

	const totalSlides = selectAll('.item').length;
	console.log(totalSlides);

	//nasz licznik
	let c = 0;

	//animacja na rodzicu slidow
	const anim = () => (slideBox.style.transform = `translateX(-${c * 100}%)`);

	// funkcja na przycisku
	const prev = () => ((c = mod(c - 1, totalSlides)), anim());
	const next = () => ((c = mod(c + 1, totalSlides)), anim());

	// listener na nasze przyciski
	select('.left').addEventListener('click', prev);
	select('.right').addEventListener('click', next);

	// czysci interwał gdy myszka na strzałce

	document.querySelector('.buttons-arrow').addEventListener('click', () => {
		clearInterval(interval);
	});

	// interwał na autoslide
	const interval = setInterval(next, 4000);
});

const hamburger = document.querySelector('.fa-bars');

const showNav = () => {
	const icon = document.querySelector('.seperate');
	if (icon.style.display === 'none') {
		icon.style.display = 'block';
	} else {
		icon.style.display = 'none';
	}
};
hamburger.addEventListener('click', showNav);
