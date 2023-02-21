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

const menuSection = document.querySelectorAll('.tab-content');
const menuSlides = document.querySelectorAll('.elements-list');
const menuTabs = document.querySelectorAll('li>a');

const showInfo = (id, id2) => {
	menuSection.forEach((section) => (section.style.display = 'none'));
	menuSlides.forEach((slides) => (slides.style.display = 'none'));
	menuTabs.forEach((tab) => tab.classList.remove('active-tab'));

	document.getElementById(id).style.display = 'grid';
	document.getElementById(id2).style.display = 'block';

	const currentActiveTab = document.querySelector(`[data-id=${id2}]`);
	currentActiveTab.classList.add('active-tab');
};

window.onload = function () {
	const currentPage = document.URL;

	if (currentPage.includes('apartamenty/#tabs-1')) {
		showInfo('slider1', 'first-tab');
	} else if (currentPage.includes('apartamenty/#tabs-2')) {
		showInfo('slider2', 'second-tab');
	} else if (currentPage.includes('apartamenty/#tabs-3')) {
		showInfo('slider3', 'third-tab');
	} else if (currentPage.includes('apartamenty/#tabs-4')) {
		showInfo('slider4', 'fourth-tab');
	} else if (currentPage.includes('apartamenty/#tabs-5')) {
		showInfo('slider5', 'fifth-tab');
	}
};

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
