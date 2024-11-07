document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) { // Si la respuesta no es OK, lanza un error
            throw new Error('LOGIN INVÁLIDO');
        }
        return response.json();
    })
    .then(data => {
        if (data.message === "Login exitoso") {
            window.location.href = "main.html";
        } else {
            throw new Error(data.message);
        }
    })
    .catch(error => {
        console.error(error.message); 
        alert("LOGIN INVÁLIDO"); 
    });
});
