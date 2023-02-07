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

const ELS = (selector, par) => (par || document).querySelectorAll(selector);
const EL = (selector, par) => (par || document).querySelector(selector);
const mod = (n, m) => ((n % m) + m) % m;

ELS('.slider-wrapper').forEach((x) => {
	const EL_slider = EL('.slider', x);
	const ELS_items = ELS('.item', x);
	const sub = +(x.dataset.items ?? 1);
	const tot = Math.ceil(ELS_items.length / sub);
	let c = 0;

	const anim = () => (EL_slider.style.transform = `translateX(-${c * 100}%)`);
	const prev = () => ((c = mod(c - 1, tot)), anim());
	const next = () => {
		(c = mod(c + 1, tot)), anim();
	};

	EL('.left', x).addEventListener('click', prev);
	EL('.right', x).addEventListener('click', next);
	document.querySelector('.buttons-arrow').addEventListener('click', () => {
		clearInterval(interval);
	});
	const interval = setInterval(next, 4000);
});
