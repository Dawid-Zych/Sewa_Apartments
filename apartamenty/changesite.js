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
console.log(menuTabs);
const showInfo = (id, id2) => {
	menuSection.forEach((section) => (section.style.display = 'none'));
	menuSlides.forEach((slides) => (slides.style.display = 'none'));
	menuTabs.forEach((tab) => tab.classList.remove('active-tab'));

	document.getElementById(id).style.display = 'grid';
	document.getElementById(id2).style.display = 'block';

	const currentActiveTab = document.querySelector(`[data-id=${id2}]`);
	console.log(currentActiveTab);
	currentActiveTab.classList.add('active-tab');
};
