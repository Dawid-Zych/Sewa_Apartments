class Slider {
	constructor(elemSelector) {
		this.currentSlide = 0; //aktualny slide
		this.sliderSelector = elemSelector; //selektor elementu który zamienimy na slider
		this.elem = null; //tutaj pobierzemy element który zamienimy na slider
		this.slider = null; //tutaj wygenerujemy slider
		this.slides = null; //tutaj pobierzemy slajdy
		this.prev = null; //przycisk prev
		this.next = null; //przycisk next
		this.dots = []; //przyciski kropek

		this.generateSlider();
		this.changeSlide(this.currentSlide);
		this.handleMouseEnter();
	}

	generateSlider() {
		//pobieramy element który zamienimy na slider
		this.slider = document.querySelector(this.sliderSelector);
		this.slider.classList.add('slider');

		//tworzymy kontener dla slajdów
		const slidesCnt = document.createElement('div');
		slidesCnt.classList.add('slider-slides-cnt');

		//pobieramy element slajdów
		this.slides = this.slider.children;

		//to jest żywa kolekcja, więc przy przeniesieniu każdego slajdu
		//jej długość maleje
		while (this.slides.length) {
			this.slides[0].classList.add('slider-slide');
			//jeżeli element dodajemy do innego elementu
			//to tak jakbyśmy go usuwali z tej kolekcji
			//bo jeden element nie może być równocześnie w dwóch miejscach naraz
			slidesCnt.append(this.slides[0]);
		}

		//musimy na nowo pobrać slajdy, bo powyższa kolekcja jest już pusta
		this.slides = slidesCnt.querySelectorAll('.slider-slide');

		//wygenerowaliśmy kontener ze slajdami, wstawiamy go więc do slidera
		this.slider.append(slidesCnt);

		this.createPrevNext();
		this.createPagination();
	}

	createPrevNext() {
		//generujemy przycisk "Poprzedni slajd"
		this.prev = document.createElement('button');
		this.prev.type = 'button';
		this.prev.innerText = 'Poprzedni slide';
		this.prev.classList.add('slider-button');
		this.prev.classList.add('slider-button-prev');
		this.prev.addEventListener('click', () => this.slidePrev());

		//generujemy przycisk "Następny slajd"
		this.next = document.createElement('button');
		this.next.type = 'button';
		this.next.innerText = 'Następny slide';
		this.next.classList.add('slider-button');
		this.next.classList.add('slider-button-next');
		this.next.addEventListener('click', () => this.slideNext());

		//wrzucamy je do wspólnego diva
		//który dam nam ciut większe możliwości stylowania
		const nav = document.createElement('div');
		nav.classList.add('slider-nav');
		nav.appendChild(this.prev);
		nav.appendChild(this.next);

		//diva z przyciskami wrzucamy do slajdu
		this.slider.appendChild(nav);
	}

	createPagination() {
		const ulDots = document.createElement('ul');
		ulDots.classList.add('slider-pagination');

		//tworzymy pętlę w ilości liczby slajdów
		for (let i = 0; i < this.slides.length; i++) {
			//każdorazowo tworzymy LI wraz z buttonem
			//każdy button po kliknięciu zmieni slajd
			//za pomocą metody changeSlide()

			const li = document.createElement('li');
			li.classList.add('slider-pagination-element');

			const btn = document.createElement('button');
			btn.classList.add('slider-pagination-button');
			btn.type = 'button';
			btn.innerText = i + 1;
			btn.setAttribute('aria-label', `Ustaw slajd ${i + 1}`);

			btn.addEventListener('click', () => this.changeSlide(i));

			li.appendChild(btn);

			ulDots.appendChild(li);

			//wygenerowany przycisk wrzucamy do wspólnej tablicy
			//dzięki temu potem łatwiej będzie nam się do tych kropek odwoływać
			this.dots.push(li);
		}

		this.slider.appendChild(ulDots);
	}

	changeSlide(index) {
		//robimy pętlę po slajdach usuwając klasę active
		this.slides.forEach((slide) => {
			slide.classList.remove('slider-slide-active');
			slide.setAttribute('aria-hidden', true);
		});

		//dodajemy ją tylko wybranemu
		this.slides[index].classList.add('slider-slide-active');
		this.slides[index].setAttribute('aria-hidden', false);

		//podobny manewr robimy dla kropek
		this.dots.forEach((dot) => {
			dot.classList.remove('slider-pagination-element-active');
		});
		this.dots[index].classList.add('slider-pagination-element-active');

		//aktualny slide przestawiamy na wybrany
		this.currentSlide = index;
	}

	slidePrev() {
		this.currentSlide--;
		if (this.currentSlide < 0) {
			this.currentSlide = this.slides.length - 1;
		}
		this.changeSlide(this.currentSlide);
	}

	slideNext() {
		this.currentSlide++;
		if (this.currentSlide > this.slides.length - 1) {
			this.currentSlide = 0;
		}
		this.changeSlide(this.currentSlide);
	}

	handleMouseEnter() {
		this.slider.addEventListener('mouseenter', () => {
			clearTimeout(this.time);
		});

		this.slider.addEventListener('mouseout', () => {
			clearTimeout(this.time);
			this.time = setTimeout(() => this.slideNext(), 6000);
		});
	}
}

const slide1 = new Slider('#slider1');
const slide2 = new Slider('#slider2');
const slide3 = new Slider('#slider3');
const slide4 = new Slider('#slider4');
const slide5 = new Slider('#slider5');

//################################# NAV BAR

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

// section ###############################################################
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

// End section ################################################

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
