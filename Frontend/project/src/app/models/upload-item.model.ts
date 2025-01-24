export interface UploadItem {
    id: string;            // Azonosító (backend generálja)
    cím: string;         // Elem címe
    leírás: string;   // Feltöltés leírása
    imageUrl: string;      // A kép URL (backend adja vissza a feltöltés után)
    értékelés: number;        // Értékelés
  }
  