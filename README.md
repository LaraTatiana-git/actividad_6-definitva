Actividad 6: Aplicación consultando a API Externa
Objetivos
El objetivo de esta actividad es desarrollar una aplicación completa en Angular con un sistema de componentes y rutas que se conecta a un servicio de base de datos a través de una API externa. Los objetivos específicos son:

Averiguar cuántos componentes se necesitan y crearlos.
Crear el sistema de rutas para cada componente.
Crear componentes hijos si es necesario.
Comunicar los componentes para que los datos lleguen a cada uno de los elementos.
Trabajar con formularios y validaciones.
Pautas de Elaboración
La aplicación debe tener un sistema de rutas y cargar CSS. Se debe cargar Bootstrap como framework de CSS para ayudar a maquetar el sistema de componentes. La API que se va a consultar es la siguiente: https://peticiones.online/users.

Rutas de la Aplicación
/home: Carga el listado completo de usuarios.
/user/1: Carga la vista de un usuario con todos sus datos (el número en la ruta corresponde al ID del usuario).
/newuser: Carga un formulario para dar de alta un nuevo usuario.
/updateuser/1: Carga el formulario de registro con los datos del usuario a actualizar.
Funcionalidades
En la pantalla principal (/home), se mostrará un listado de usuarios en formato GRID con opciones para ver detalles, borrar y actualizar.
La vista de usuario (/user/1) mostrará la información completa del usuario, con botones para volver al listado, editar el usuario y eliminarlo.
El formulario de nuevo usuario (/newuser) permitirá registrar un nuevo usuario con validaciones necesarias.
El formulario de actualización de usuario (/updateuser/1) permitirá editar y actualizar los datos de un usuario existente.
Notas Importantes
La API es de prueba, por lo que las respuestas de creación y actualización están simuladas.
En el formulario se deben validar todos los campos obligatorios, comprobar que el email es válido y usar una imagen de internet como ruta.
Instalación y Uso
Clonar el repositorio:
git clone https://github.com/LaraTatiana-git/actividad_6-main.git
Navegar al directorio del proyecto:
cd actividad_6-main
Instalar las dependencias:
npm install
Ejecutar la aplicación:
ng serve
Abrir el navegador y navegar a http://localhost:4200.
Contribuciones
Para contribuir a este proyecto, por favor sigue estos pasos:

Haz un fork del proyecto.
Crea una nueva rama (git checkout -b feature-nueva-funcionalidad).
Realiza los cambios y haz commit (git commit -m 'Añadir nueva funcionalidad').
Haz push a la rama (git push origin feature-nueva-funcionalidad).
Abre un Pull Request.
Licencia
Este proyecto no tiene una licencia específica.
