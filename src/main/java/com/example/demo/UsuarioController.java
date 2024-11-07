package com.example.demo;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class UsuarioController {
    

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario){
        try {
            usuarioService.registrarUsuario(usuario);
            return ResponseEntity.ok("Usuario registrado exitosamente");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
    String email = loginData.get("email");
    String password = loginData.get("password");

    Optional<Usuario> usuario = usuarioService.login(email, password);
    
    if (usuario.isPresent()) {
        return ResponseEntity.ok("Login exitoso");
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
    }
}
}
