class LightBox {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.createElement('div');
		this.container.id = 'lightbox';
		document.body.appendChild(this.container);

		this.lightBoxImg = document.createElement('img');
		this.container.appendChild(this.lightBoxImg);

		this.addListeners();
	}

	addListeners() {
		const images = document.querySelectorAll('.gallery img');
		images.forEach((img) => {
			img.addEventListener('click', () => this.galleryImgClicked(img));
		});

		this.container.addEventListener('click', () => {
			this.hideLightbox();
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') this.hideLightbox();
		});
	}

	hideLightbox = () => {
		this.container.classList.remove('active');
	};

	galleryImgClicked = (img) => {
		//  console.log(img)
		this.lightBoxImg.src = img.src;
		this.container.classList.add('active');
	};
}

const lightBox = new LightBox();

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
