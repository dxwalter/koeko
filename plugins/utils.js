

export default ({app}, inject) => {

		let initiateCopy = (target, count = 0) => {
			// Select the email link anchor text
			let targetLink = document.querySelector('#'+target);
			let range = document.createRange();
			range.selectNode(targetLink);
			window.getSelection().addRange(range);

			try {
				// Now that we've selected the anchor text, execute the copy command
				let successful = document.execCommand('copy');
				if (count > 1) app.$showToast('Link copied', "success");

				// app.$initiateNotification('success', 'Successful', "Link copied successfully")
			} catch(err) {
				app.$showToast('An error occurred', "error");
			}

			// Remove the selections - NOTE: Should use
			// removeRange(range) when it is supported
			window.getSelection().removeAllRanges();
		}

		inject("initiateCopy", initiateCopy);

		let copyToClipBoard = (target) => {
			app.$initiateCopy(target, 0)
			app.$initiateCopy(target, 1)
			app.$initiateCopy(target, 2)
		}

		inject("copyToClipBoard", copyToClipBoard);

		let clearFormInput = (clearFormInput) => {
				for (const action of clearFormInput) {
						action.addEventListener('click', e => {
								let getTarget = e.target;
								let searchForm = document.getElementById(getTarget.getAttribute('data-target'));
								searchForm.value = ''
						})
				}
		}
		inject('clearFormInput', clearFormInput);

		let numberNotation = (number) => {

				let inputNumber = number.toString();
				let inputLength = inputNumber.length;
				let comma = ",";
				
				if (inputLength < 4) {
						return inputNumber;
				}
		
				if (inputLength == 4) {
						let output = [inputNumber.slice(0, 1), comma, inputNumber.slice(1)].join("");
						return output;
					}
		
					if (inputLength == 5) {
						let output = [inputNumber.slice(0, 2), comma, inputNumber.slice(2)].join("");
						return output;
					}
		
					if (inputLength == 6) {
						let output = [inputNumber.slice(0, 3), comma, inputNumber.slice(3)].join("");
						return output;
					}
		
					if (inputLength == 7) {
						let output = [inputNumber.slice(0, 1), comma, inputNumber.slice(1)].join("");
						let secondOutput = [output.slice(0, 5), comma, output.slice(5)].join(
							""
						);
						return secondOutput;
					}
		
					if (inputLength == 8) {
						let output = [inputNumber.slice(0, 2), comma, inputNumber.slice(2)].join("");
						let secondOutput = [output.slice(0, 6), comma, output.slice(6)].join(
							""
						);
						return secondOutput;
					}
		
					if (inputLength == 9) {
						let output = [inputNumber.slice(0, 3), comma, inputNumber.slice(3)].join("");
						let secondOutput = [output.slice(0, 7), comma, output.slice(7)].join(
							""
						);
						return secondOutput;
					}
		
					if (inputLength == 10) {
						let output = [inputNumber.slice(0, 1), comma, inputNumber.slice(1)].join("");
						let secondOutput = [output.slice(0, 5), comma, output.slice(5)].join("");
						let thirdOutput = [secondOutput.slice(0, 9), comma, secondOutput.slice(9)].join("");
							return thirdOutput;
					}
		
		}

		inject('numberNotation', numberNotation)

		let pushNotification = (message, window) => {
			// Inside page components
			window.$OneSignal.push(['addListenerForNotificationOpened', (message) => {
				console.log('Received NotificationOpened:', message )}
			])
		}

		inject('pushNotification', pushNotification)


		let getAnonymousIDFromStorage = () => localStorage.getItem('CUDUA_ANONYMOUS_ID');

		inject('getAnonymousIDFromStorage', getAnonymousIDFromStorage);

		let saveAnonymousIdToStorage = (id) => {
			localStorage.setItem('CUDUA_ANONYMOUS_ID', id);
		}
		inject('saveAnonymousIdToStorage', saveAnonymousIdToStorage);

		let deleteAnonymousIdFromStorage = () => {
			localStorage.removeItem('CUDUA_ANONYMOUS_ID');
		}

		inject('deleteAnonymousIdFromStorage', deleteAnonymousIdFromStorage)

		let addRedBorder = (target) => {
            document.getElementById(target).classList.add('add-red-border');
		}
		inject('addRedBorder', addRedBorder);

        let removeRedBorder = (target) => {
            document.getElementById(target).classList.remove('add-red-border');
		}
		inject('removeRedBorder', removeRedBorder);

        let outputValidationError = (target, message) => {
            document.getElementById(target).style.display = 'block';
            document.getElementById(target).innerHTML = '';
            document.getElementById(target).innerHTML = message;
		}
		inject('outputValidationError', outputValidationError);

        let removeValidationError = (target) => {
            document.getElementById(target).style.display = 'none';
		}
		
		inject('removeValidationError', removeValidationError);
		

		let checkFileExtension = (name) => {
			if ( /\.(jpe?g|png|gif)$/i.test(name) === false ) { 
				return false
			} 

			return true;
		}

		inject('checkFileExtension', checkFileExtension)

		let timeStampModifier = (timestamp) => {

			timestamp = Date.parse(timestamp);

			let difference = Date.now() - timestamp;

			let result = "";
			
			if (difference < 5 * 1000) {
				return 'just now';
			} else if (difference < 90 * 1000) {
				return 'moments ago';
			}
		
			//it has minutes
			if ((difference % 1000 * 3600) > 0) {
				if (Math.floor(difference / 1000 / 60 % 60) > 0) {
					let s = Math.floor(difference / 1000 / 60 % 60) == 1 ? '' : 's';
					result = `${Math.floor(difference / 1000 / 60 % 60)} min${s} `;
				}
			}
		
			//it has hours
			if ((difference % 1000 * 3600 * 60) > 0) {
				if (Math.floor(difference / 1000 / 60 / 60 % 24) > 0) {
					let s = Math.floor(difference / 1000 / 60 / 60 % 24) == 1 ? '' : 's';
					result = `${Math.floor(difference / 1000 / 60 / 60 % 24)} hr${s}`;
				}
			}
		
			//it has days
			if ((difference % 1000 * 3600 * 60 * 24) > 0) {
				if (Math.floor(difference / 1000 / 60 / 60 / 24) > 0) {
					let s = Math.floor(difference / 1000 / 60 / 60 / 24) == 1 ? '' : 's';
					result = `${Math.floor(difference / 1000 / 60 / 60 / 24)} day${s}`;
				}
		
			}

			//it has weeks
			if ((difference % 1000 * 3600 * 60 * 24 * 7) > 0) {
				if (Math.floor(difference / 1000 / 60 / 60 / 24 / 7) > 0) {
					let s = Math.floor(difference / 1000 / 60 / 60 / 24 / 7) == 1 ? '' : 's';
					result = `${Math.floor(difference / 1000 / 60 / 60 / 24 / 7)} week${s}`;
				}
		
			}

			//it has months
			if ((difference % 1000 * 3600 * 60 * 24 * 7 * 4) > 0) {
				if (Math.floor(difference / 1000 / 60 / 60 / 24 / 7 / 4) > 0) {
					let s = Math.floor(difference / 1000 / 60 / 60 / 24 / 7 / 4) == 1 ? '' : 's';
					result = `${Math.floor(difference / 1000 / 60 / 60 / 24 / 7 / 4)} month${s}`;
				}
		
			}
		
			return result + ' ago';


		}

		inject ('timeStampModifier', timeStampModifier)

		let convertTodate =  (dateString) => {
            let month = [
                'January',
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ];

            let startDay = new Date(dateString).getDate().toString();
            let formatStart = "";

            if (startDay.length > 1) {
                if (startDay == "21") {
                    formatStart = startDay+"st"
                } else {
                    formatStart = startDay[1] == '3' ? startDay+"rd" : startDay+"th";  
                    formatStart = startDay[1] == '2' || startDay[1] == '22' ? startDay+"nd" : startDay+"th";  
                }
            } else {
                if (startDay == '1') {
                    formatStart = startDay+"st";
                } else {
                    formatStart = startDay == "3" ? startDay+"rd" : startDay+"th";
                }
            }
            
            let startMonth = month[new Date(dateString).getMonth()]
            let startYear = new Date(dateString).getFullYear()

            return `${formatStart} ${startMonth}, ${startYear}`;

		}
		
		inject('convertTodate', convertTodate)

		let convertNameToLogo = (name) => {
			name = name.toUpperCase().trim();


			if (name.length == 0 || name == undefined){
				return "!!"
			}

			if (name.length == 1) {
				return `${name}!`
			}

			let splitName = name.split(' ');
			let newLogo;

			if (splitName.length > 1) {
				newLogo = `${splitName[0][0]}${splitName[1][0]}`;
			} else {
				newLogo = `${splitName[0][0]}${splitName[0][1]}`;
			}

			return newLogo
		}

		inject('convertNameToLogo', convertNameToLogo)

		let firstLetterUpperCase = (s)  => {
			if (typeof s !== 'string') return ''
			return s.charAt(0).toUpperCase() + s.slice(1)
		}

		inject('firstLetterUpperCase', firstLetterUpperCase)

		let validateEmailAddress = (email) => {
			const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}
		
		inject('validateEmailAddress', validateEmailAddress);


		let validateBusinessUsername = (username) => {
			let check = new RegExp(/^(?!.*\.\.\s)(?!.*\.$)[^\W][\w.]{0,29}$/ig).test(username);
			return check;
		}

		inject('validateBusinessUsername', validateBusinessUsername);
}