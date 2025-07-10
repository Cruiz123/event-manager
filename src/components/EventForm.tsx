import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { EventFormData } from "../types/Events";
import { validateEventForm } from "../utils";

interface EventFormProps {
  onSubmit: (values: EventFormData) => void;
  initialValues?: EventFormData;
}

const categories = ["Concierto", "Conferencia", "Deporte", "Cultural", "Otro"];

function EventForm({ onSubmit, initialValues }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>(
    initialValues || {
      name: "",
      category: categories[0],
      price: 0,
      date: [],
      petFriendly: false,
    }
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof EventFormData, string>>
  >({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDateAdd = (date: Date) => {
    if (!formData.date.some((d) => d.getTime() === date.getTime())) {
      const newDate = [...formData.date, date];
      setFormData({ ...formData, date: newDate });
    }
    setSelectedDate(null);
  };

  const handleDateRemove = (dateToRemove: Date) => {
    const newDate = formData.date.filter(
      (date) => date.getTime() !== dateToRemove.getTime()
    );
    setFormData({ ...formData, date: newDate });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateEventForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
      if (!initialValues) {
        setFormData({
          name: "",
          category: categories[0],
          price: 0,
          date: [new Date()],
          petFriendly: false,
        });
      }
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <div className="form-group">
        <label>Nombre del evento</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "error" : ""}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Categoría</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Precio</label>
        <input
          type="number"
          id="price"
          name="price"
          min={0}
          step={0.01}
          value={formData.price}
          onChange={handleChange}
          className={errors.price ? "error" : ""}
        />
        {errors.price && <span className="error-message">{errors.price}</span>}
      </div>
      <div className="form-group">
        <label>Fecha disponible</label>
        <DatePicker
          selected={formData.date[0]}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy/MM/dd"
          minDate={new Date()}
          className={errors.date ? "error" : ""}
        />
        <button
          type="button"
          onClick={() => selectedDate && handleDateAdd(selectedDate)}
          className="add-date-btn"
        >
          Añadir fecha
        </button>

        {errors.date && <span className="error-message">{errors.date}</span>}

        <div className="date-list">
          {formData.date.map((date, index) => (
            <div key={index} className="date-tag">
              <span>{date?.toLocaleDateString()}</span>
              <button
                type="button"
                onClick={() => handleDateRemove(date)}
                className="remove-date-btn"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>¿Es apto para mascotas?</label>
        <input
          type="checkbox"
          id="petFriendly"
          name="petFriendly"
          checked={formData.petFriendly}
          onChange={handleChange}
        />
        <label htmlFor="petFriendly">¿Admite mascotas?</label>
      </div>
      <button type="submit" className="submit-btn">
        {initialValues ? "Actualizar Evento" : "Crear Evento"}
      </button>
    </form>
  );
}

export default EventForm;
