import { EventFormData } from "../types/Events";

export const getFromLocalStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting data from localStorage:", error);
    return null;
  }
};

export const saveToLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
};

export const validateEventForm = (formData: EventFormData) => {
  const errors: Partial<Record<keyof EventFormData, string>> = {};

  if (!formData.name.trim()) {
    errors.name = "El nombre del evento es obligatorio.";
  }

  if (formData.price <= 0) {
    errors.price = "El precio debe ser mayor que cero.";
  }

  if (formData.date.length === 0) {
    errors.date = "Debe seleccionar al menos una fecha.";
  }

  return errors;
};
