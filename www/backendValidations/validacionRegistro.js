document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    fetch('http://localhost:8080/api/auth/registro', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email,password})  
    })
    .then(response => {
        if (response.ok){
            return response.text();
        } else {
            throw new Error("DATOS INVALIDOS");
        }
    })
    .then(message => {
        alert(message);
        window.location.href="main.html";
    })
    .catch(error => {
        document.getElementById("error-message").textContent = error.message;
    })   
});