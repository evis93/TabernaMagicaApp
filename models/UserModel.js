// models/UserModel.js
import { supabase } from '../config/supabase';

class UserModel {
  
  async authenticate(username, password) {
   try {
      console.log('📡 UserModel.authenticate:', username);
      console.log('🔑 Password:', password);
      
      // PRUEBA 1: Ver todos los usuarios sin filtros
      const { data: todosUsuarios, error: errorTodos } = await supabase
        .from('usuarios')
        .select('*');
      
      console.log('👥 TODOS los usuarios en BD:', todosUsuarios);
      console.log('❌ Error al obtener todos:', errorTodos);
      
      // PRUEBA 2: Query original con filtros
      const { data: usuarios, error: errorUsuarios } = await supabase
        .from('usuarios')
        .select('id_usr, username, id_perfil, pass')
        .eq('username', username.trim())
        .eq('pass', password.trim());

      console.log('🔍 Usuarios filtrados:', usuarios);
      console.log('❌ Error en query filtrado:', errorUsuarios);

      console.log('📡 UserModel.authenticate:', username);
      
      if (errorUsuarios) {
        console.error('Error consultando usuarios:', errorUsuarios);
        throw errorUsuarios;
      }

      console.log('Usuarios encontrados:', usuarios);

      if (!usuarios || usuarios.length === 0) {
        return {
          success: false,
          error: 'Usuario o contraseña incorrectos'
        };
      }

      const usuario = usuarios[0];

      // Buscar el perfil por separado
      const { data: perfiles, error: errorPerfiles } = await supabase
        .from('perfiles')
        .select('id_perfil, perfil')
        .eq('id_perfil', usuario.id_perfil);

      if (errorPerfiles) {
        console.error('Error consultando perfiles:', errorPerfiles);
        throw errorPerfiles;
      }

      const perfil = perfiles && perfiles.length > 0 ? perfiles[0] : null;

      return {
        success: true,
        data: {
          id: usuario.id_usr,
          username: usuario.username,
          profile: perfil ? perfil.perfil : 'Usuario',
          profileId: usuario.id_perfil,
        }
      };

    } catch (error) {
      console.error('Error en UserModel.authenticate:', error);
      return {
        success: false,
        error: error.message || 'Error de conexión'
      };
    }
  }
}

export default new UserModel();