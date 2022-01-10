(function () {
	// let changeScrollNumber = 0;
	// const header = document.querySelector('header').scrollHeight;
	// const firstScreen = document.querySelector('.first-screen').scrollHeight;
	// const firstScroll = header + firstScreen;

	// if (document.documentElement.clientWidth > 1023) {
	// 	if (window.pageYOffset >= firstScroll) {
	// 		document.querySelector('body').classList.remove('hiden');
	// 		changeScrollNumber = 1;
	// 	} else if (window.pageYOffset > 0) {
	// 		document.querySelector('body').classList.remove('hiden');
	// 		changeScrollNumber = 1;
	// 	} else {
	// 		document.querySelector('body').classList.add('hiden');
	// 	}
	// }	

	// document.querySelectorAll('.arrow-scroll').forEach(link => {

	// 	link.addEventListener('click', function (e) {


	// 		let href = this.getAttribute('href');

	// 		const scrollTarget = document.querySelector(href);

	// 		const topOffset = document.querySelector('.scroll-header').scrollHeight;
	// 		const elementPosition = scrollTarget.getBoundingClientRect().top;
	// 		const offsetPosition = elementPosition - topOffset;

	// 		window.scrollBy({
	// 			top: firstScroll - 210,
	// 			behavior: 'smooth'
	// 		});
	// 		document.querySelector('body').classList.remove('hiden');
	// 		changeScrollNumber = 1;
	// 		e.preventDefault();
	// 	});
	// });

	// if (document.documentElement.clientWidth > 1023) {
	// 	window.addEventListener("wheel", event => {
	// 		if (window.pageYOffset <= firstScroll && changeScrollNumber === 0) {
	// 			window.scrollBy({
	// 				top: firstScroll - 210,
	// 				behavior: 'smooth'
	// 			});
	// 			changeScrollNumber = 1;
	// 		} else if (changeScrollNumber === 1) {
	// 			document.querySelector('body').classList.remove('hiden');
	// 		};
	// 	});
	// }

	
})();

// Модалки

(function () {
  window.addEventListener("click", function (event) {

    if (event.target.dataset.clickModal) {

      event.preventDefault();

      const btnName = event.target.dataset.clickModal;

      document.querySelector("#" + btnName).classList.add("modal--open");
      document.querySelector("html").classList.add("hiden");
    };

    if (event.target.classList.contains("modal__overlay")) {
      event.target.closest(".modal").classList.remove("modal--open");
      document.querySelector("html").classList.remove("hiden");
			if (event.target.closest(".modal").querySelector('input')) {
				event.target.closest(".modal").querySelectorAll('input').forEach(function(i) {
					i.value = '';
				})
			}
    } else if (event.target.classList.contains("close")) {
      event.target.closest(".modal").classList.remove("modal--open");
      document.querySelector("html").classList.remove("hiden");
			if (event.target.closest(".modal").querySelector('input')) {
				event.target.closest(".modal").querySelectorAll('input').forEach(function(i) {
					i.value = '';
				})
			}
    };
  });
})();

// Модалки -- конец

// Поле поиска

window.addEventListener('click', function (event) {
	if (event.target.classList.contains('search-icon')) {
		if (event.target.closest('.wrap-search').querySelector('.search-field').classList.contains('search-field--open')) {
			if (event.target.closest('.wrap-search').nextElementSibling) {
				event.target.closest('.wrap-search').nextElementSibling.classList.remove('hide-elem');
			}
			if (event.target.closest('.page-header__wrapper')) {
				event.target.closest('.page-header__wrapper').querySelector('.logo__flex').classList.remove('hide-text');
			}
			event.target.closest('.wrap-search').querySelector('.search-field').classList.remove('search-field--open');			
			event.target.classList.remove('search-icon--open')
		} else {
			if (event.target.closest('.wrap-search').nextElementSibling) {
				event.target.closest('.wrap-search').nextElementSibling.classList.add('hide-elem');
			}
			if (event.target.closest('.page-header__wrapper')) {
				event.target.closest('.page-header__wrapper').querySelector('.logo__flex').classList.add('hide-text');
			}
			event.target.closest('.wrap-search').querySelector('.search-field').classList.add('search-field--open');
			event.target.classList.add('search-icon--open')
		}
	}
});

// Поле поиска -- конец

// Мобильное меню

(function () {
  const btnBurger = document.querySelector(".burger"),
    mobileMenu = document.querySelector("[data-mobile-menu]");

  btnBurger.addEventListener("click", openMobileMenu);

  function openMobileMenu(event) {
    if (mobileMenu.classList.contains("mob-menu--open")) {
      mobileMenu.classList.remove("mob-menu--open");
			btnBurger.classList.remove("burger--open")
      document.querySelector("html").classList.remove("hiden");
    } else {
      mobileMenu.classList.add("mob-menu--open");
			btnBurger.classList.add("burger--open")
      document.querySelector("html").classList.add("hiden");
    }
  }
})();

// Мобильное меню - конец

// акордионы

class Accordion {
  constructor(selector) {
    this.selector = selector;
  }

  createAccordion(selector) {
    const accordionList = document.querySelectorAll(this.selector);
    for (let element of accordionList) {
      element.addEventListener("click", function () {
        this.classList.toggle("open");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else if (panel.closest(".open-accordion")) {
          // console.log(this);
          let parentAccordion = this.closest("[data-accordion-content]");
          parentAccordion.style.maxHeight = parentAccordion.scrollHeight + panel.scrollHeight + "px";
          panel.style.maxHeight = panel.scrollHeight + "px";
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
        let parentElem = this.parentNode;
        if (this.classList.contains("open")) {
          parentElem.classList.add("open-accordion");
        } else {
          parentElem.classList.remove("open-accordion");
        }
      });
    }
  }
}

const accMobMenu = new Accordion(".mob-menu-list__up--drop");
const accFooter = new Accordion(".footer-nav__wrap-up--drop");

accMobMenu.createAccordion();
accFooter.createAccordion();

// акордионы  - конец

Inputmask("+7 (999) 999-99-99").mask('[type="tel"]');