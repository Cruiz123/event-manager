import React from "react";
import { Event } from "../types/Events";

interface EventCardProps {
  event: Event;
  onEdit: (eventId: string) => void;
  onDelete: (eventId: string) => void;
}

function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  return (
    <div className="event-card">
      <div className="card-header">
        <h3>{event.name}</h3>
        {event.petFriendly && (
          <span className="pet-friendly">Pet Friendly</span>
        )}
      </div>
      <div className="card-body">
        <p>
          <strong>Categoría:</strong> {event.category}
        </p>
        <p>
          <strong>Precio:</strong> ${event?.price}
        </p>

        <div className="dates-section">
          <strong>Fechas Disponibles:</strong>
          <ul>
            {event.date.map((date, index) => (
              <li key={index}>{new Date(date).toLocaleDateString()}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card-actions">
        <button onClick={() => onEdit(event.id)} className="edit-btn">
          Editar
        </button>
        <button onClick={() => onDelete(event.id)} className="delete-btn">
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default EventCard;
