function formValidation(event) {
    event.preventDefault(); // Prevent form from submitting until validation passes

    let name = document.getElementById("your_name").value;
    let email = document.getElementById("your_email").value;
    let message = document.getElementById("enter_message").value;
    let errorMessage = document.getElementById("error");

    errorMessage.textContent = ''; // Clear error message

    // Name validation
    if (name === '') {
        errorMessage.textContent = "Name is required";
        return false;
    }

    // Email validation using regex
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email === '') {
        errorMessage.textContent = 'Email is required';
        return false;
    } else if (!emailPattern.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address';
        return false;
    }

    // Message validation
    if (message === '') {
        errorMessage.textContent = 'Message is required';
        return false;
    }

    // If everything is valid, proceed with form submission
    submitForm();
    return true;
}

function submitForm() {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        error.innerHTML = "Please wait..."

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    error.innerHTML = "Form submitted successfully";
                } else {
                    console.log(response);
                    error.innerHTML = json.message;
                }
            })
            .catch(error => {
                console.log(error);
                error.innerHTML = "Something went wrong!";
            })
            .then(function () {
                form.reset();
                setTimeout(() => {
                    error.style.display = "none";
                }, 3000);
            });
    });
}

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link")
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab")
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}


var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}
function closemenu() {
    sidemenu.style.right = "-200px";
}

