let loginForm = document.forms.login_form;

loginForm.addEventListener('submit', (event) =>
 {
    const email = loginForm.elements.email_input.value
    const password = loginForm.elements.password_input.value
    const url = "http://127.0.0.1:8080/user/login"


    let xhr = new XMLHttpRequest();
    // open a connection
    xhr.open("POST", url, true);
    // Converting JSON data to string
    var data = JSON.stringify({ "email": email, "password": password });
    // Sending data with the request
    xhr.send(data);
});