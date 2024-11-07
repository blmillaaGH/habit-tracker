document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario para manejar la validación y el envío personalizado

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    fetch('http://localhost:8080/api/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })  
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error("Datos inválidos");
        }
    })
    .then(message => {
        alert(message);
        window.location.href = "main.html"; // Redirige si el registro es exitoso
    })
    .catch(error => {
        errorMessage.textContent = error.message; // Muestra el mensaje de error en el HTML
    });
});
