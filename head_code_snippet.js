// Get contents of JSON file from url with redirect rules
let url = 'https://prodigies.com/uscreen_redirect_rules.json?v=' + Date.now();
// Get the current url
let currentUrl = window.location.href;
let redirectRules = {};
// Get the redirect rules from the url
let getRedirectRules = () => {
	axios.get(url).then(response => {
		// Set the redirectRules to the response data
		redirectRules = response.data;
		// Loop through the redirectRules and redirect to the redirect_to URL if the current URL matches the redirect_from url
		for (let i = 0; i < redirectRules.length; i++) {
			// Get the redirect_from url
			let redirect_from = redirectRules[i].redirect_from;
			// Get the redirect_to url
			let redirect_to = redirectRules[i].redirect_to;
			// If the current url matches the redirect_from url, then redirect to the redirect_to url
			if (currentUrl === redirect_from) {
				// Redirect to the redirect_to url
				window.location.href = redirect_to;
			}
		}
	});
};
// Run the getRedirectRules function
getRedirectRules();


// If the api payment_details field is empty and the url is exactly play.prodigies.com/dashboard

let getUserInfo2 = () => {
	axios.get(`/api/sessions`).then(response => {
		let data = response.data
		if (data.logged) {
			axios.get(`/api/users/me`).then(response => {
				let data = response.data;
				// let metadata_billing = data.field_1;
				let email = data.email;
				if (email) {
					// Replace any link hrefs with https://play.prodigies.com/dashboard
					let links = document.querySelectorAll('a');
					
					for (let i = 0; i < links.length; i++) {
						// Get the href
						let href = links[i].href;
						if (href === 'https://play.prodigies.com/account/purchases' || href === 'https://play.prodigies.com/account/purchases/') {
							let user_id = data.id;
							let timestamp = Date.now();
							// links[i].href = 'https://prodigies.com/route-account.php' + '?uid=' + timestamp + '000' + user_id;
							links[i].href = 'https://prodigies.com/route-account.php';
						}

						if (href === 'https://prodigies.com/route-sheet-music.php') {
							// Replace the href with https://prodigies.com/route-account.php
							let user_id = data.id;
							let timestamp = Date.now();
							// links[i].href = 'https://prodigies.com/route-sheet-music.php' + '?uid=' + timestamp + '000' + user_id;
							links[i].href = 'https://prodigies.com/route-sheet-music.php';
						}
						
				}
			}
		});
	}
});
}
getUserInfo2();

// Get referrer
let referrer = document.referrer;
let detectCustomerInfo = () => {
	if (location.href.includes('/customer_info')) {
		let wrapper = document.querySelector('.card .description')
		if (wrapper) {
			if (!wrapper.classList.value.includes('touched')) {
				let mobileMarkup = `
				<mobile-customer-infor-footer" src="https://s3.amazonaws.com/unode1/assets/11794/ifP8NKIqQjqQ1TqWj8sN_mobile_customer_info.svg">
				`;
				let markup = `
				<div class="customer-info-footer">
				<h2 class="customer-info-footer--title">My youngest son developed perfect pitch before he was age 4 by using Mr. Rob's lessons! He is 5 now, and loves to point what notes his Dad is playing on the guitar.</h2>
				<img src="https://s3.amazonaws.com/unode1/assets/11794/x23b3OeQnCsWEKnj9uQe_customer_info_footer.svg">
				</div>
				`
				wrapper.insertAdjacentHTML('beforeEnd', mobileMarkup)
				wrapper.insertAdjacentHTML('afterEnd', markup)
				wrapper.classList.add('touched')
			}
		}
	}
	setTimeout(() => detectCustomerInfo(), 500) 
}
let detectCompleteOrder = () => {
	if (location.href.includes('/complete_order')) {
		let wrapper = document.querySelector('.card .description')
		if (wrapper) {
			if (!wrapper.classList.value.includes('touched')) {
				let mobileMarkup = `
				<img class="mobile-customer-infor-footer" src="https://s3.amazonaws.com/unode1/assets/11794/ifP8NKIqQjqQ1TqWj8sN_mobile_customer_info.svg">
				`;
				let markup = `
				<div class="customer-info-footer">
				<h2 class="customer-info-footer--title">My youngest son developed perfect pitch before he was age 4 by using Mr. Rob's lessons! He is 5 now, and loves to point what notes his Dad is playing on the guitar.</h2>
				<img src="https://s3.amazonaws.com/unode1/assets/11794/x23b3OeQnCsWEKnj9uQe_customer_info_footer.svg">
				</div>
				`
				wrapper.insertAdjacentHTML('beforeEnd', mobileMarkup)
				wrapper.insertAdjacentHTML('afterEnd', markup)
				wrapper.classList.add('touched')
			}
		}
	}
	setTimeout(() => detectCompleteOrder(), 500) 
}

detectCompleteOrder()
detectCustomerInfo()


// If page url contains ?api_data=true, then run the getUserInfo function
if (window.location.search.includes('api_data=true')) {
	
	let getUserInfo = () => {
		axios.get(`/api/sessions`).then(response => {
			let data = response.data
			if (data.logged) {
				axios.get(`/api/users/me`).then(response => {
					let data = response.data
					// json stringify data
					let dataString = JSON.stringify(data)
					// Get the email from the data
					let email = data.email
					// Get the first name from the data
					let firstName = data.firstName
					// Get the last name from the data
					let lastName = data.lastName
					console.log('email: ' + email);
					console.log(dataString);
					
				})
			}
		})
	}
	
	getUserInfo()
	
}

if (window.location.search.includes('p7=dash')) {
	// Find a link with the url 'https://play.prodigies.com/programs/542936?categoryId=85054'
	let link = document.querySelector('a[href="https://play.prodigies.com/programs/542936?categoryId=85054"]')
	let redirectToP7SM = () => {
		axios.get(`/api/sessions`).then(response => {
			let data = response.data
			if (data.logged) {
				axios.get(`/api/users/me`).then(response => {
					let data = response.data
					// json stringify data
					let dataString = JSON.stringify(data)
					// Get the email from the data
					let user_id = data.id
					let timestamp = Date.now()
					let url = 'https://prodigies.com?uid=' + timestamp + '000' + user_id;
					// Redirect to the url
					//   window.location = url;
					console.log(url);
					// Find div with class 'custom-header-wrap'
					let header_nav = document.querySelector('.custom-header-wrap')
					// let footer_nav = document.querySelector('.footer--copyright');
					// Create a link
					let a = document.createElement('a');
					// Set the href of the link to the url
					a.href = url;
					// Set the text of the link to 'Go to Prodigies'
					a.innerHTML = 'P7'
					// Add a clases top_menu--link py-2 d-none d-md-inline-block to the link
					a.classList.add('top_menu--link', 'py-2', 'd-none', 'd-md-inline-block');
					// Append the link to the header_nav
					header_nav.appendChild(a)
					// footer_nav.appendChild(a);
				})
			}
		})
	}
	
	redirectToP7SM();
}

document.addEventListener('DOMContentLoaded', function () {
	axios.get(`/api/sessions`).then(response => {
		let data = response.data
		if (data.logged) {
			axios.get(`/api/users/me`).then(response => {
				let data = response.data
				// json stringify data
				let dataString = JSON.stringify(data)
				// Get the email from the data
				let user_id = data.id
				let timestamp = Date.now()
				let user_uid = timestamp + '000' + user_id;
				let links = document.querySelectorAll('a');
				for (let i = 0; i < links.length; i++) {
					var link = links[i];
					if (link.href.startsWith('https://prodigies.com')) {
					// See if the link has a query string
					if (link.href.includes('?')) {
						// If it does, then add &uid= to the query string
						link.href = link.href + '&uid=' + user_uid;
					} else {
						// If it doesn't, then add ?uid= to the query string
						link.href = link.href + '?uid=' + user_uid;
					}
				}
			}
			})
		}
	})
})

// If the url is exactly play.prodigies.com
if (window.location.href === 'https://play.prodigies.com' || window.location.href === 'https://play.prodigies.com/') {
let getUserInfo = () => {
	axios.get(`/api/sessions`).then(response => {
		let data = response.data
		if (data.logged) {
			axios.get(`/api/users/me`).then(response => {
				let data = response.data
				// json stringify data
				let dataString = JSON.stringify(data)
				// Get the email from the data
				let email = data.email
				
				// If we have the email, then they are logged in
				if (email) {
					loggedIn = true;
				} else {
					loggedIn = false;
				}
				
				// If they are logged in, then show the logged in version of the homepage
				if (loggedIn) {
					// Redirect to /catalog
					window.location.href = 'https://prodigies.com';
				} else {
					// Redirect to prodigies.com
					window.location.href = 'https://prodigies.com';
				}
			});
		} else {
			// Redirect to prodigies.com
			window.location.href = 'https://prodigies.com';
		}
	});
	window.location.href = 'https://prodigies.com';
};

window.location.href = 'https://prodigies.com';
}

// If the url is exactly play.prodigies.com/catalog
if (window.location.href === 'https://play.prodigies.com/catalog' || window.location.href === 'https://play.prodigies.com/catalog/') {
// If refferrer is https://play.prodigies.com/sign_in
if (referrer === 'https://play.prodigies.com/sign_in') {
// Redirect to /catalog
console.log('redirecting to dashboard');
axios.get(`/api/sessions`).then(response => {
	let data = response.data
	if (data.logged) {
		axios.get(`/api/users/me`).then(response => {
			let data = response.data
			// json stringify data
			let dataString = JSON.stringify(data)
			// Get the email from the data
			let user_id = data.id;
			let timestamp = Date.now();
			
			window.location.href = 'https://prodigies.com?uid=' + timestamp + '000' + user_id;
		});
	}
}
);
}
}
