document.addEventListener('DOMContentLoaded', function () {
	const topNav = document.getElementById('top-nav');

	window.addEventListener('scroll', (e) => {
		if (document.documentElement.scrollTop > 0) {
			btnScrollToTop.style.opacity = 1;
		} else {
			btnScrollToTop.style.opacity = 0;
		}
	});
});
