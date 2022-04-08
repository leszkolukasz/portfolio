const form  = document.getElementsByTagName('form')[0];

const first_name = document.getElementById('first_name');
const first_name_error = document.querySelector('#first_name + span.error');

const last_name = document.getElementById('last_name');
const last_name_error = document.querySelector('#last_name + span.error');

const email = document.getElementById('email');
const email_error = document.querySelector('#email + span.error');

const phone = document.getElementById('phone');
const phone_error = document.querySelector('#phone + span.error');

/*Array.from(form.elements).forEach((input) => {
    if (input.type !== "submit") {
        input.addEventListener('focus', function (event) {
            input.className += ' focused';
        });
        input.addEventListener('blur', function (event) {
            input.className = '';
        });
    }
});*/

form.addEventListener('focusin', function (event) {
    if (event.target.tagName != 'INPUT')
        return;

    event.target.className += ' focused';
    event.stopPropagation();
});

form.addEventListener('focusout', function (event) {
    if (event.target.tagName != 'INPUT')
        return;

    event.target.className = '';
    event.stopPropagation();
});

form.addEventListener('submit', function (event) {
    let error = false;

    error = error || validate_name();
    error = error || validate_email();
    error = error || validate_phone();

    validate_name();
    validate_email();
    validate_phone();

    if (error)
        event.preventDefault();

    else {
        document.body.innerHTML += `
            <section id="summary-container">
                <div id='summary'>
                    <span>Imię: ${first_name.value}</span>
                    <span>Nazwisko: ${last_name.value}</span>
                    <span>Email: ${email.value}</span>
                    <span>Telefon: ${phone.value}</span>
                    <button onclick="document.body.removeChild(document.getElementById('summary-container'))">OK</button>
                </div>
            </section>
        `;
        setTimeout(() => {document.body.removeChild(document.getElementById('summary-container'))}, 15000);
    }
});

function validate_name() {
    let error = false;

    if (first_name.value == '')
        first_name_error.textContent = 'First name required';
    else if (first_name.value.length > 40)
        first_name_error.textContent = 'Name must be shorter than 40 characters';
    else
        first_name_error.textContent = '';

    error = (first_name_error.textContent != '');

    if (error)
        first_name.className = 'invalid';
    else
        first_name.className = '';

    /////////////////

    if (last_name.value == '')
        last_name_error.textContent = 'Last name required';
    else if (last_name.value.length > 40)
        last_name_error.textContent = 'Name must be shorter than 40 characters';
    else
        last_name_error.textContent = '';

    error ||= (last_name_error.textContent != '');

    if (last_name_error.textContent != '')
        last_name.className = 'invalid';
    else
        last_name.className = '';

    return error;
}

function validate_email() {
    let error = false;

    if (email.value == '')
        email_error.textContent = 'Email required';
    else if (!check_email(email.value))
        email_error.textContent = 'Incorrect email format';
    else
        email_error.textContent = '';

    error = (email_error.textContent != '');

    if (error)
        email.className = 'invalid';
    else
        email.className = '';

    return error;
}

function validate_phone() {
    let error = false;

    if (phone.value == '')
        phone_error.textContent = 'Phone number required';
    else if (!check_phone(phone.value))
        phone_error.textContent = 'Incorrect phone number format';
    else
        phone_error.textContent = '';

    error = (phone_error.textContent != '');

    if (error)
        phone.className = 'invalid';
    else
        phone.className = '';

    return error;
}

const check_email = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  
const check_phone = (phone) => {
    return phone.match(/\d{9}/g);
};