// controllers/AuthController.js
import UserModel from '../models/UserModel';

class AuthController {
  
  async login(username, password) {
    console.log('🎮 AuthController.login');
    
    try {
      // Validaciones
      if (!username || !username.trim()) {
        return {
          success: false,
          message: 'El usuario es obligatorio'
        };
      }

      if (!password || !password.trim()) {
        return {
          success: false,
          message: 'La contraseña es obligatoria'
        };
      }

      // Intentar autenticar
      const result = await UserModel.authenticate(username, password);

      if (result.success) {
        return {
          success: true,
          message: 'Login exitoso',
          data: result.data
        };
      } else {
        return {
          success: false,
          message: result.error || 'Usuario o contraseña incorrectos'
        };
      }

    } catch (error) {
      console.error('Error en AuthController.login:', error);
      return {
        success: false,
        message: 'Error al iniciar sesión'
      };
    }
  }

  async logout() {
    console.log('🎮 AuthController.logout');
    return {
      success: true,
      message: 'Sesión cerrada'
    };
  }
}

export default new AuthController();