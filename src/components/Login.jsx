// components/Login.jsx
import '../styles.css';
import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false); // Para mostrar/ocultar el formulario de registro

  const handleLogin = (e) => {
    e.preventDefault();
    // Verifica credenciales en la API
    if (email === 'admin@admin.com' && password === 'admin') {
      localStorage.setItem('token', 'superadmin-token');
      window.location.href = '/dashboard';
    } else {
      alert('Credenciales incorrectas.');
    }
  };

  return (
    <div className="login-container">
      {!showRegister ? (
        <>
          <h2>Administrador TALKING</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="register-btn">
            Iniciar
          </button>
          </form>
          <button onClick={() => setShowRegister(true)} className="register-btn">
            Registrarse
          </button>
        </>
      ) : (
        <RegisterForm setShowRegister={setShowRegister} />
      )}
    </div>
  );
}

// Componente para el formulario de registro
function RegisterForm({ setShowRegister }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('/api/users', formData)
      .then(() => {
        alert('Usuario registrado con éxito.');
        setShowRegister(false); // Vuelve al formulario de inicio de sesión
      })
      .catch((error) => {
        alert('Error al registrar usuario:', error.message);
      });
  };

  return (
    <div className="register-container">
      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleInputChange}
          required
        />
        <button className="cancel-btn">
        Registrarse
      </button>
      </form>
      <button onClick={() => setShowRegister(false)} className="cancel-btn">
        Cancelar
      </button>
    </div>
  );
}

export default Login;