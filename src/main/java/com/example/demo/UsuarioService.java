package com.example.demo;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;


    public Usuario registrarUsuario(Usuario usuario){
        Optional<Usuario> usuarioExistente = usuarioRepository.findByEmail(usuario.getEmail());
        if (usuarioExistente.isPresent()) {
            throw new IllegalArgumentException("El nombre de usuario o el correo electrónico ya están registrados.");
        }
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> login(String email, String password){
    
        return usuarioRepository.findByEmail(email).filter(u -> u.getPassword().equals(password));
    }
}
