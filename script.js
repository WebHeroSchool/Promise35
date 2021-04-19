let body = document.body;
let avatar;
let name;
let description;
let url;
let savedDate;
let profileName;


let getName = new Promise((resolve, reject) => {
	setTimeout(() => {
		let url = window.location.toString();
		let urlArray = url.split('=');
		let name = urlArray[1];	
		resolve(name == 'undefined' ? name : 'Margaritas202');
	}, 2000);
});

let getDate = new Promise((resolve, reject) => {
	setTimeout(() => {
		let date = new Date();
		resolve(date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear());
	}, 2000);
});//переменная nowDate ограничена областью видимости функции getNowDate


let init = (json) => {
	avatar = json.avatar_url;
	name = json.name;
	description = json.bio;
	url = json.url;
}

let addName = () => {
	let userName = document.createElement('h1');
	userName.innerHTML = name;
	body.appendChild(userName);
}

let addDescription = () => {
	let userDescription = document.createElement('h2');
	userDescription.innerHTML = description;
	body.appendChild(userDescription);
}

let addAvatar = () => {
	let userAvatar = document.createElement('img');
	let newString = document.createElement('br');
	userAvatar.src = avatar;
	body.appendChild(userAvatar);
	body.appendChild(newString);
}

let addUrl = () => {
	let userUrl = document.createElement('a');
	let text = document.createTextNode('profile');
	userUrl.appendChild(text);
	userUrl.href = 'https://github.com/' + profileName;
	body.appendChild(userUrl);
}

let addDate = () => {
	let currentDate = document.createElement('h2');
	currentDate.innerHTML = savedDate;
	body.appendChild(currentDate);
}

let hidePreloader = () => {
	let preloader = document.getElementById('preloader');
	preloader.style.display = 'none';
}

Promise.all([getName, getDate])
	.then(([name, date]) => {
		savedDate = date;
		profileName = name;
		return fetch('https://api.github.com/users/' + name);
	})
	.then(res => res.json())
	.then(json => {
		init(json);
		hidePreloader();
		addDate();
		addName();
		addDescription();
		addAvatar();
		addUrl();
	})

    .catch(err => alert(err + 'Элемент не найден'));  