# Configuración de la Aplicación de Boda

## 📋 Instrucciones de Configuración

Para personalizar la aplicación de boda, edita el archivo `lib/config.ts`. Este archivo centraliza toda la configuración importante.

## 🔧 Parámetros Configurables

### 1. Información del Evento
```typescript
EVENT: {
  DATE: new Date("2025-09-05T21:00:00"), // Fecha y hora del evento
  FAMILY_NAMES: {
    BRIDE: "Azul",    // Nombre de la novia
    GROOM: "Victor"   // Nombre del novio
  },
  VENUE: {
    NAME: "Salón de Eventos",      // Nombre del lugar
    ADDRESS: "Dirección del evento" // Dirección del lugar
  }
}
```

### 2. Códigos de Acceso
```typescript
ACCESS_CODES: {
  ADMIN: "AZU15ADMIN",      // Código para panel de administración
  FAMILY_BRIDE: "AZUL2025", // Código para familia de la novia
  FAMILY_GROOM: "VICTOR2025" // Código para familia del novio
}
```

### 3. Familias Invitadas
```typescript
GUEST_ACCESS_CODES: {
  "AZU15A": { family: "Familia Aguirre-Rollahiser", guests: 4 },
  "AZU15B": { family: "Familia Vigas-Biagioli", guests: 6 },
  "AZU15C": { family: "Familia Hubert-Herrero", guests: 3 },
  "AZU15D": { family: "Titi Y Eze", guests: 2 },
  "AZU15E": { family: "More Y Nacho", guests: 2 },
  "AZU15F": { family: "Milos Y Sabi", guests: 2 },
  "AZU15G": { family: "Paisa Y Gaby", guests: 2 },
  "AZU15H": { family: "Familia Roht- Iturrioz", guests: 4 },
  "AZU15I": { family: "Familia Biscaro-Roth", guests: 4 },
  "AZU15J": { family: "Sole, Lolita Y Bis", guests: 3 },
  "AZU15K": { family: "Gaby y Benja", guests: 2 },
  "AZU15L": { family: "Pablo, Vane Y Rochi", guests: 3 },
  "AZU15M": { family: "Silvia Y Pulpo", guests: 2 },
  "AZU15N": { family: "Silvana", guests: 1 },
  "AZU15O": { family: "Jesus, Paula y Agus", guests: 3 },
  "AZU15P": { family: "Juli, Silvi", guests: 2 },
  "AZU15Q": { family: "Pili", guests: 1 },
  "AZU15R": { family: "Cande", guests: 1 },
  "AZU15S": { family: "Lo", guests: 1 },
  "AZU15T": { family: "Juli Araya", guests: 1 },
  "AZU15U": { family: "Juli Scherho", guests: 1 },
  "AZU15V": { family: "Rocha", guests: 1 },
  "AZU15W": { family: "Alma", guests: 1 },
  "AZU15X": { family: "Valen", guests: 1 },
  "AZU15Y": { family: "Marti", guests: 1 },
  "AZU15Z": { family: "Lucy Gelinger", guests: 1 },
  "AZU15A1": { family: "Fati R", guests: 1 },
  "AZU15B1": { family: "Jose Sosa", guests: 1 },
  "AZU15C1": { family: "Avi", guests: 1 },
  "AZU15D1": { family: "Espe", guests: 1 },
  "AZU15E1": { family: "Yayi", guests: 1 },
  "AZU15F1": { family: "Licho", guests: 1 },
  "AZU15G1": { family: "Nemo", guests: 1 },
  "AZU15H1": { family: "Nils", guests: 1 },
  "AZU15I1": { family: "Jero", guests: 1 },
  "AZU15J1": { family: "Mati Koppel", guests: 1 },
  "AZU15K1": { family: "Bauti", guests: 1 },
  "AZU15L1": { family: "Facu", guests: 1 },
  "AZU15M1": { family: "Nahue", guests: 1 },
  "AZU15N1": { family: "Tomy", guests: 1 },
  "AZU15O1": { family: "Manu", guests: 1 },
  "AZU15P1": { family: "Colito Lizarreta", guests: 1 },
  "AZU15Q1": { family: "Lucy Steinbach", guests: 1 },
  "AZU15R1": { family: "Mati", guests: 1 },
  "AZU15S1": { family: "Mauro", guests: 1 },
  "AZU15T1": { family: "Pulpo", guests: 1 },
  "AZU15U1": { family: "Mahi", guests: 1 },
  "AZU15V1": { family: "Eve", guests: 1 },
  "AZU15W1": { family: "Sabi", guests: 1 },
  "AZU15X1": { family: "Agus Suppes", guests: 1 },
  "AZU15Y1": { family: "Isa Natucci", guests: 1 },
  "AZU15Z1": { family: "Pili Sastre", guests: 1 },
  "AZU15A12": { family: "Anita", guests: 1 },
  "AZU15B12": { family: "Delfi Ristagno", guests: 1 },
  "AZU15C12": { family: "Delfi Zarandon", guests: 1 },
  "AZU15D12": { family: "Delfi Pastor y Mila", guests: 2 },
  "AZU15E12": { family: "Abuela ceci", guests: 1 },
  "AZU15F12": { family: "Tio Iña", guests: 1 },
  "AZU15G12": { family: "Elisa", guests: 1 },
  "AZU15H12": { family: "Mari", guests: 1 },
  "AZU15I12": { family: "Vale", guests: 1 },
  "AZU15J12": { family: "Negra", guests: 1 },
  "AZU15K12": { family: "Pepe", guests: 1 },





  // Agrega más familias aquí...
}
```

### 4. Configuración de Música
```typescript
MUSIC: {
  BACKGROUND_VOLUME: 0.3, // Volumen de la música de fondo (0.0 - 1.0)
  AUTO_PLAY: true         // Reproducir automáticamente
}
```

### 5. Configuración de Canciones
```typescript
SONGS: {
  MAX_SUGGESTIONS_PER_FAMILY: 10, // Máximo de canciones por familia
  ALLOW_DUPLICATES: false         // Permitir canciones duplicadas
}
```

### 6. Configuración de Google Drive
```typescript
GOOGLE_DRIVE: {
  FOLDER_URL: "https://drive.google.com/drive/u/0/folders/1L6IFEzQB5KcqQu_1PDCVwJETjbJbEA7j",
  FOLDER_ID: "1L6IFEzQB5KcqQu_1PDCVwJETjbJbEA7j",
  UPLOAD_ENABLED: true,           // Habilitar subida de fotos
  MAX_FILE_SIZE_MB: 50,          // Tamaño máximo por archivo
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"]
}
```

## 🚀 Cómo Aplicar Cambios

1. Edita el archivo `lib/config.ts`
2. Guarda los cambios
3. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## 📝 Ejemplos de Configuración

### Agregar Nueva Familia
```typescript
"AZU15H": { family: "Familia Nuevo", guests: 2 },
```

### Cambiar Código de Administrador
```typescript
ACCESS_CODES: {
  ADMIN: "MIADMIN2025", // Nuevo código
}
```

### Modificar Fecha del Evento
```typescript
EVENT: {
  DATE: new Date("2025-10-15T19:00:00"), // Nueva fecha
}
```

### Cambiar Google Drive
```typescript
GOOGLE_DRIVE: {
  FOLDER_URL: "https://drive.google.com/drive/folders/TU_NUEVO_ID",
  FOLDER_ID: "TU_NUEVO_ID", // Solo el ID de la carpeta
}
```

## ⚠️ Notas Importantes

- Después de cambiar códigos de acceso, informa a los invitados
- La fecha debe estar en formato ISO (YYYY-MM-DDTHH:mm:ss)
- Los códigos de familia deben ser únicos
- Reinicia la aplicación después de hacer cambios

## 🔐 Acceso de Administrador

Para acceder al panel de administración:
1. Ve a `/admin`
2. Ingresa el código configurado en `ACCESS_CODES.ADMIN`
3. Podrás ver todas las canciones sugeridas y descargar PDF

## 📸 Configuración de Google Drive

### Cómo obtener el ID de tu carpeta de Google Drive:

1. **Crea una carpeta en Google Drive** para las fotos del evento
2. **Comparte la carpeta** con permisos de "Editor" para que cualquiera con el enlace pueda subir fotos
3. **Copia el enlace** de la carpeta
4. **Extrae el ID** del enlace:
   - Enlace completo: `https://drive.google.com/drive/u/0/folders/1L6IFEzQB5KcqQu_1PDCVwJETjbJbEA7j`
   - ID de la carpeta: `1L6IFEzQB5KcqQu_1PDCVwJETjbJbEA7j`

### Pasos para configurar:

1. En `lib/config.ts`, actualiza:
```typescript
GOOGLE_DRIVE: {
  FOLDER_URL: "TU_ENLACE_COMPLETO_AQUI",
  FOLDER_ID: "SOLO_EL_ID_AQUI",
}
```

2. **Importante**: Asegúrate de que la carpeta tenga permisos para que "Cualquiera con el enlace" pueda "Editar"

### Funcionalidades incluidas:
- ✅ Botón directo para abrir Google Drive
- ✅ Selector de archivos con drag & drop
- ✅ Validación de tipos de archivo (JPG, PNG, GIF, WEBP)
- ✅ Validación de tamaño máximo (50MB por defecto)
- ✅ Vista previa de archivos seleccionados
- ✅ Identificación automática de la familia que sube fotos
