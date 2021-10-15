let changeScrollNumber = 0;
const header = document.querySelector('header').scrollHeight;
const firstScreen = document.querySelector('.first-screen').scrollHeight;
const firstScroll = header + firstScreen;

if (window.pageYOffset > firstScroll) {
	document.querySelector('body').classList.remove('hiden');
	changeScrollNumber = 1;
} else {
	document.querySelector('body').classList.add('hiden');
}

document.querySelectorAll('.arrow-scroll').forEach(link => {

	link.addEventListener('click', function (e) {

		console.log(this.getAttribute('href'))

		let href = this.getAttribute('href');

		const scrollTarget = document.querySelector(href);

		const topOffset = document.querySelector('.scroll-header').scrollHeight;
		const elementPosition = scrollTarget.getBoundingClientRect().top;
		const offsetPosition = elementPosition - topOffset - 50;

		window.scrollBy({
			top: offsetPosition,
			behavior: 'smooth'
		});
		document.querySelector('body').classList.remove('hiden');
		changeScrollNumber = 1;
		e.preventDefault();
	});
});

window.addEventListener("wheel", event => {
	if (window.pageYOffset < firstScroll && changeScrollNumber === 0) {
		window.scrollBy({
			top: firstScroll,
			behavior: 'smooth'
		});
		changeScrollNumber = 1;
	} else if (changeScrollNumber === 1) {
		document.querySelector('body').classList.remove('hiden');
	};
});