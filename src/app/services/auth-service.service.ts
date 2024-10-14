import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'; // Ionic Storage para persistencia

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private users: any[] = [
    {
      username: 'Carlos', // Ejemplo de usuario registrado
      password: 'Calo1234', // Ejemplo de contraseña
    }
  ];

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializa el almacenamiento de Ionic
  async init() {
    const storage = await this.storage.create();
    this.storage = storage;
  }

  // Comprueba si un usuario ya existe en el sistema
  checkUserExists(username: string): boolean {
    return this.users.some(user => user.username === username);
  }

  // Método para validar el login con username y contraseña
  async login(username: string, password: string): Promise<boolean> {
    // Expresión regular para validar la contraseña:
    const passwordRegex = /^(?=.*\d{4})(?=.*[a-z]{3})(?=.*[A-Z]).{8,}$/;

    // Valida si la contraseña cumple con los requisitos
    const isValidPassword = passwordRegex.test(password);

    if (!isValidPassword) {
      return false; // Retorna false si el formato de contraseña es incorrecto
    }

    // Comprobamos si las credenciales coinciden con un usuario registrado
    const userExists = this.users.find(user => user.username === username && user.password === password);
    if (userExists) {
      await this.setUserSession(username); // Llamada asíncrona a setUserSession
      return true; // Autenticación exitosa
    }

    return false; // Usuario o contraseña incorrectos
  }

  // Guarda la sesión del usuario en Ionic Storage
  async setUserSession(username: string): Promise<void> {
    await this.storage.set('isLoggedIn', true);  // Guarda el estado de autenticación
    await this.storage.set('username', username); // Guarda el username del usuario autenticado
  }

  // Verifica si el usuario está autenticado (para AuthGuard)
  async isLoggedIn(): Promise<boolean> {
    const loggedIn = await this.storage.get('isLoggedIn');
    return loggedIn === true;
  }

  // Cierra la sesión del usuario
  async logout(): Promise<void> {
    await this.storage.remove('isLoggedIn'); // Elimina el estado de autenticación
    await this.storage.remove('username');   // Elimina el username almacenado
  }

  // Obtiene el username del usuario actualmente autenticado
  async getUserUsername(): Promise<string | null> {
    return await this.storage.get('username');
  }
}