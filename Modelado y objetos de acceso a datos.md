# Modelado y Objetos de Acceso a Datos

## 1. Interacción de los Modelos
La arquitectura de la aplicación sigue un patrón Cliente-Servidor donde los modelos sirven como el "contrato" o puente de comunicación entre el frontend (Angular/Ionic) y el backend (Node.js/Express + PostgreSQL).
- **Backend:** Define las tablas relacionales (`users`, `languages`). Al realizar una consulta SQL, los datos se devuelven en formato JSON.
- **Frontend (Interfaces):** Angular toma ese JSON y lo "mapea" a sus interfaces locales (`User`, `Language`), lo que permite que el código TypeScript reconozca las propiedades (ej. `lang.name`, `user.email`) brindando autocompletado y prevención de errores en tiempo de compilación.

---

## 2. Interfaces (Conexión Front y API)
Estas son las definiciones que conectan los objetos devueltos por la API con el Frontend. Se encuentran centralizadas en `src/app/models/models.ts`.

```typescript
export interface User {
  id?: number;
  name: string;
  email: string;
  token?: string; // Utilizado para la sesión
}

export interface Language {
  id?: number;
  name: string;
  code: string;       // Ej. 'EN', 'ES'
  icon_url: string;   // URL de la bandera o icono
  created_at?: Date;
}
```

---

## 3. Servicios para Acceso a Datos (APIs)
Se creó el servicio `LanguageService` (`src/app/services/language.service.ts`) encargado de encapsular todas las llamadas HTTP. Los componentes visuales (como la Landing Page) solo "llaman" a este servicio sin preocuparse por la lógica de red.

### Operaciones CRUD Básicas Implementadas:
- **Create:** `POST /api/languages` - `createLanguage(language)`
- **Read (All):** `GET /api/languages` - `getLanguages()`
- **Read (One):** `GET /api/languages/:id` - `getLanguageById(id)`
- **Update:** `PUT /api/languages/:id` - `updateLanguage(id, language)`
- **Delete:** `DELETE /api/languages/:id` - `deleteLanguage(id)`

---

## 6. Uso de Inteligencia Artificial en el Modelado
La IA fue utilizada como asistente para el diseño rápido y la validación de la arquitectura de la base de datos y la capa de servicios:
1. **Generación del Esquema Relacional:** La IA propuso la estructura SQL para abstraer los idiomas en su propia tabla (`languages`), en lugar de atarlos rígidamente al código (hardcoding). Además, propuso la tabla relacional `user_languages` previendo la futura necesidad de rastrear el progreso de múltiples idiomas por usuario.
2. **Creación de Servicios Angular (Boilerplate):** La IA generó rápidamente la estructura repetitiva del CRUD utilizando `HttpClient` y `Observable`, garantizando que se siguieran las mejores prácticas de inyección de dependencias (`@Injectable`) de Angular.
3. **Revisión Continua:** Durante el proceso, la IA sugirió adaptar la ruta post-login hacia un nuevo Dashboard (Tab2) basándose en las necesidades del flujo del usuario, integrando de forma automática los modelos de TypeScript generados previamente.
