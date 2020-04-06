const indentity = document.querySelector('#identity');
const backdrop = document.querySelector('.backdrop');
const drawer = document.querySelector('#drawer-toggle');
const closeBtn = document.querySelector('#close-btn');
const gitBtn = document.querySelector('#git-btn');
const iconDrawer = document.querySelector('#icon-drawer');

const handleClickDrawer = (x) => {
	const openDrawer = (a, b, c) => {
		a.style.width = '320px';
		b.style.width = '100%';
		c.className = 'flaticon-cancel';
	};

	const closeDrawer = (a, b, c) => {
		a.style.width = '';
		b.style.width = '';
		c.className = 'flaticon-menu';
	};

	const handleDrawer = (a, b, c) => {
		if (a.style.width == '') {
			openDrawer(a, b, c);
		} else {
			closeDrawer(a, b, c);
		}
	};

	x.addEventListener('click', () => {
		handleDrawer(identity, backdrop, iconDrawer);
	});
};

handleClickDrawer(drawer);
handleClickDrawer(gitBtn);
handleClickDrawer(backdrop);
handleClickDrawer(closeBtn);

const eduDesc = document.querySelector('.edu-desc');
const panels = document.querySelectorAll('.panel');
const panelHeads = document.querySelectorAll('.panel-head');
const panelBodys = document.querySelectorAll('.panel-body');
const showPanelBtns = document.querySelectorAll('#show-panel-btn');

const eduPanels = eduDesc.children;

const handleClickPanel = (targets) => {
	const school = {
		vhs: {
			head: targets[0].children[0],
			body: targets[0].children[1],
			btn: targets[0].children[0].children[1],
		},
		jhs: {
			head: targets[1].children[0],
			body: targets[1].children[1],
			btn: targets[1].children[0].children[1],
		},
		es: {
			head: targets[2].children[0],
			body: targets[2].children[1],
			btn: targets[2].children[0].children[1],
		},
	};

	const handleOpenPanel = (head, body, btn) => {
		if (btn.innerHTML == '+') {
			head.style.backgroundColor = '#2D98F0';
			head.style.color = '#fff';
			body.style.display = 'flex';
			btn.innerHTML = '-';
		} else {
			head.style.backgroundColor = '#F2F3F7';
			head.style.color = '#000';
			body.style.display = '';
			btn.innerHTML = '+';
		}
	};

	const handleClosePanel = (head, body, btn) => {
		head.style.backgroundColor = '#F2F3F7';
		head.style.color = '#000';
		body.style.display = '';
		btn.innerHTML = '+';
	};

	const handlePerfomOpen = (target) => {
		handleOpenPanel(target.head, target.body, target.btn);
	};

	const handlePerfomClose = (target) => {
		handleClosePanel(target.head, target.body, target.btn);
	};

	const endOfHandlePanel = (a, b, c) => {
		handlePerfomOpen(a);
		handlePerfomClose(b);
		handlePerfomClose(c);
	};

	for (let target of targets) {
		target.addEventListener('click', () => {
			const { vhs, jhs, es } = school;

			switch (target.id) {
				case 'vhs':
					endOfHandlePanel(vhs, jhs, es);
					break;
				case 'jhs':
					endOfHandlePanel(jhs, es, vhs);
					break;
				case 'es':
					endOfHandlePanel(es, vhs, jhs);
					break;
				default:
					handlePerfomClose(vhs);
					handlePerfomClose(jhs);
					handlePerfomClose(es);
			}
		});
	}
};

handleClickPanel(eduPanels);

const navs = document.querySelectorAll('#nav');
const pages = document.querySelectorAll('article');

const activeLink = (target) => {
	const active = document.querySelector('.active');

	if (active !== null) {
		active.classList.remove('active');
	}

	return target.classList.add('active');
};

// link still active when browser refreshed
const urlVisited = (a, b) => {
	switch (a) {
		case '#home':
			b.hash === '#home' ? b.classList.add('active') : null;
			break;
		case '#skills':
			b.hash === '#skills' ? b.classList.add('active') : null;
			break;
		case '#education':
			b.hash === '#education' ? b.classList.add('active') : null;
			break;
		default:
			null;
	}
};

for (let nav of navs) {
	if (location.hash !== null) {
		urlVisited(location.hash, nav);
	}

	nav.addEventListener('click', (event) => {
		const { target } = event;

		activeLink(target);
	});
}

// link active when scroll
window.addEventListener('scroll', () => {
	let index = pages.length;

	while (--index && window.scrollY + 50 < pages[index].offsetTop) {}

	navs.forEach((link) => link.classList.remove('active'));
	navs[index].classList.add('active');
});
