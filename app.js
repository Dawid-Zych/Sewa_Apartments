// When the user scrolls the page, execute myFunction
window.onscroll = function () {
	stickyHeader();
};

// Get the header
const header = document.getElementById('header');
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
		logoPct.style.width = '230px';
	}
}

// SLIDER NA Flexie

const selectAll = (selector) => document.querySelectorAll(selector);
const select = (selector) => document.querySelector(selector);
const mod = (n, m) => ((n % m) + m) % m;

//
selectAll('.slider-wrapper').forEach(() => {

	const slide = select('.slider');

	// electAll('.item') -- NOdelista slidów
	// sprawdzamy ile mamy slajdów
	const totalSlides = selectAll('.item').length;

	//nasz licznik
	let c = 0;

	const anim = () => (slide.style.transform = `translateX(-${c * 100}%)`);
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
