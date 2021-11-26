(function () {
	let changeScrollNumber = 0;
	const header = document.querySelector('header').scrollHeight;
	const firstScreen = document.querySelector('.first-screen').scrollHeight;
	const firstScroll = header + firstScreen;

	if (document.documentElement.clientWidth > 1023) {
		if (window.pageYOffset >= firstScroll) {
			document.querySelector('body').classList.remove('hiden');
			changeScrollNumber = 1;
		} else if (window.pageYOffset > 0) {
			document.querySelector('body').classList.remove('hiden');
			changeScrollNumber = 1;
		} else {
			document.querySelector('body').classList.add('hiden');
		}
	}	

	document.querySelectorAll('.arrow-scroll').forEach(link => {

		link.addEventListener('click', function (e) {


			let href = this.getAttribute('href');

			const scrollTarget = document.querySelector(href);

			const topOffset = document.querySelector('.scroll-header').scrollHeight;
			const elementPosition = scrollTarget.getBoundingClientRect().top;
			const offsetPosition = elementPosition - topOffset;

			window.scrollBy({
				top: firstScroll - 210,
				behavior: 'smooth'
			});
			document.querySelector('body').classList.remove('hiden');
			changeScrollNumber = 1;
			e.preventDefault();
		});
	});

	if (document.documentElement.clientWidth > 1023) {
		window.addEventListener("wheel", event => {
			if (window.pageYOffset <= firstScroll && changeScrollNumber === 0) {
				window.scrollBy({
					top: firstScroll - 210,
					behavior: 'smooth'
				});
				changeScrollNumber = 1;
			} else if (changeScrollNumber === 1) {
				document.querySelector('body').classList.remove('hiden');
			};
		});
	}

	
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
			event.target.closest('.wrap-search').querySelector('.search-field').classList.remove('search-field--open');
			event.target.classList.remove('search-icon--open')
		} else {
			event.target.closest('.wrap-search').querySelector('.search-field').classList.add('search-field--open');
			event.target.classList.add('search-icon--open')
		}
	}
});

// Поле поиска -- конец

Inputmask("+7 (999) 999-99-99").mask('[type="tel"]');