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

// // SLIDER NA Flexie

const select = (selector) => document.querySelector(selector);


const slides = document.querySelectorAll('.item');
slides.forEach((x, indx) => {
	x.style.transform = `translateX(${indx * 100}%)`;
});

let curSlide = 0;
let maxSlide = slides.length - 1;
console.log(maxSlide);

const nextt = select('.right');
const prevv = select('.left');

nextt.addEventListener('click', function () {
	// check if current slide is the last and reset current slide
	if (curSlide === maxSlide) {
		curSlide = 0;
	} else {
		curSlide++;
	}
	console.log(curSlide);
	//   move slide by -100%
	slides.forEach((slide, indx) => {
		console.log(indx);
		slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
	});
});

prevv.addEventListener('click', function () {
	// check if current slide is the first and reset current slide to last
	if (curSlide === 0) {
		curSlide = maxSlide;
	} else {
		curSlide--;
	}

	//   move slide by 100%
	slides.forEach((slide, indx) => {
		slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
	});
});
