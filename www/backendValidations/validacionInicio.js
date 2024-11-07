document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})  
    })
    .then(message => {
        window.location.href = "main.html";
    })
    .catch(error => {
        console.log("LOGIN INVÁLIDO")
    });  
});
