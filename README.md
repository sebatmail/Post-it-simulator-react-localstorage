# 📌 Post-It Simulator

## 📝 Descripción
Este es un sistema web de notas virtuales (Post-Its) desarrollado íntegramente en **React JS**, cumpliendo con todos los requerimientos de la Evaluación 4 (Unidad 3: React JS).

El proyecto permite agregar nuevas notas (con título, descripción y nivel de importancia), visualizarlas de forma responsiva en formato cuadriculado (cambiando a una por fila en dispositivos móviles), y eliminarlas fácilmente.

---

## 💾 Implementación de LocalStorage (Persistencia de Datos)
Tal como se solicitó en las instrucciones de la evaluación y tomando como referencia el ejemplo proporcionado en clases (`TodoList.jsx`), se ha implementado la persistencia de datos utilizando la API nativa del navegador `localStorage`.

### Detalles Técnicos de la Persistencia:
1. 🛡️ **Inicialización Segura (Lazy Init):** Se utilizó inicialización perezosa en el `useState` de las notas. Al cargar la aplicación, React intenta leer la clave `notas_react` desde `localStorage`. Si existen datos válidos y previamente guardados, se cargan en el estado inmediatamente.
2. ⚠️ **Uso de Try/Catch:** Se implementaron bloques `try/catch` tanto para la lectura como para la escritura de datos en el almacenamiento local, previniendo así caídas de la aplicación en caso de que el navegador tenga restricciones de privacidad.
3. 🔄 **Guardado Automático:** A través de un hook `useEffect` con dependencia en el estado `notas`, la aplicación guarda automáticamente el arreglo completo en `localStorage` cada vez que el usuario agrega o elimina un Post-It. 

Gracias a esto, al refrescar la página (`F5`) o cerrar el navegador, **las notas no se pierden y permanecen exactamente donde el usuario las dejó**.

---

## 📂 Estructura del Proyecto

A continuación se detalla la infraestructura de carpetas y componentes del sistema:

```text
📁 src/
 ├── 📁 componentes/
 │    ├── 📄 ErrorBoundary.jsx   # 🛡️ Capturador de errores para evitar caídas de UI
 │    ├── 📄 PostIt.jsx          # 🟨 Componente individual que renderiza la interfaz de una nota
 │    ├── 📄 PostItApp.jsx       # 🧠 Componente principal: maneja el estado y localStorage
 │    └── 📄 PostItForm.jsx      # 📝 Formulario para validación e ingreso de nuevas notas
 │
 ├── 📄 index.css                # 🎨 Estilos globales, diseño de Post-Its y fuentes
 ├── 📄 index.jsx                # 🚀 Punto de entrada principal de la aplicación React
 └── ...
```

---

## ⚙️ Instalación y Ejecución
Este proyecto utiliza la estructura clásica de **Create React App** para asegurar compatibilidad total con los requerimientos evaluativos.

Para iniciar el proyecto en un entorno local de desarrollo:

1. **Instalar las dependencias:**
   ```bash
   npm install
   ```
2. **Iniciar el servidor local:**
   ```bash
   npm start
   ```

---

## 🛠️ Tecnologías Utilizadas
* ⚛️ **React JS:** Para toda la lógica de componentes, renderizado condicional y manejo de estados (`useState`, `useEffect`, `useRef`).
* 🎨 **CSS Puro y Bootstrap:** Para la diagramación, sistema de grillas responsivas y diseño general.
* 🗄️ **LocalStorage:** Para la persistencia de los datos en el navegador.
