let registrationForm = document.forms.registration_form;

registrationForm.addEventListener('submit', (event) =>
 {
    const email = registrationForm.elements.email_input.value
    const password = registrationForm.elements.password_input.value

    console.log(email)
    console.log(password)
    const url = "http://127.0.0.1:8080/user/register"


    let xhr = new XMLHttpRequest();
    // open a connection
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type","application/json");
    // Converting JSON data to string
    var data = JSON.stringify({ "email": email, "password": password });
    // Sending data with the request
    xhr.send(data);
});