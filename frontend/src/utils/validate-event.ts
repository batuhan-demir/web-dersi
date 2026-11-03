import type { EventFormData, EventFormErrors } from "../types/event-form";

export function validateEvent(data: EventFormData): EventFormErrors {
  const errors: EventFormErrors = {};

  if (data.title.trim().length < 3) {
    errors.title = "Etkinlik adı en az 3 karakter olmalı.";
  }

  if (data.category === "") {
    errors.category = "Bir kategori seçin.";
  }

  if (data.date === "") {
    errors.date = "Tarih seçin.";
  }

  if (data.time === "") {
    errors.time = "Saat seçin.";
  }

  if (data.location.trim() === "") {
    errors.location = "Yer boş olamaz.";
  }

  const capacity = Number(data.capacity);

  if (data.capacity.trim() === "" || !Number.isInteger(capacity) || capacity < 1 || capacity > 1000) {
    errors.capacity = "Kontenjan 1 ile 1000 arası tam sayı olmalı.";
  }

  if (data.description.trim().length < 10) {
    errors.description = "Açıklama en az 10 karakter olmalı.";
  }

  return errors;
}
