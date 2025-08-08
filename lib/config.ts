// Configuración general de la aplicación
export const APP_CONFIG = {
  // Configuración del evento
  EVENT: {
    DATE: new Date("2025-09-05T21:00:00"),
    FAMILY_NAMES: {
      BRIDE: "Azul",
      GROOM: "Victor"
    },
    VENUE: {
      NAME: "Salón de Eventos",
      ADDRESS: "Dirección del evento"
    }
  },

  // Códigos de acceso
  ACCESS_CODES: {
    ADMIN: "AZU15ADMIN",
    FAMILY_BRIDE: "AZUL2025",
    FAMILY_GROOM: "VICTOR2025"
  },

  // Códigos de acceso con información de familias invitadas
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

  },

  // Configuración de música
  MUSIC: {
    BACKGROUND_VOLUME: 0.3,
    AUTO_PLAY: true
  },

  // Configuración de la galería
  GALLERY: {
    MAX_PHOTOS_PER_VIEW: 12,
    ANIMATION_DURATION: 500
  },

  // Configuración de canciones
  SONGS: {
    MAX_SUGGESTIONS_PER_FAMILY: 10,
    ALLOW_DUPLICATES: false
  },

  // Configuración de Google Drive
  GOOGLE_DRIVE: {
    FOLDER_URL: "https://drive.google.com/drive/u/0/folders/1L6IFEzQB5KcqQu_1PDCVwJETjbJbEA7j",
    FOLDER_ID: "1L6IFEzQB5KcqQu_1PDCVwJETjbJbEA7j",
    UPLOAD_ENABLED: true,
    MAX_FILE_SIZE_MB: 50,
    ALLOWED_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"]
  }
}

export default APP_CONFIG
