import React, { useState } from "react";
import logo from "./logo.svg";
import "./styles/global.css";
import { EventForm, EventList, FilterBar, Modal } from "./components";
import { EventFormData } from "./types/Events";
import { useEvents } from "./hooks/useEvents";

function App() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [petFriendlyOnly, setPetFriendlyOnly] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const categories = [
    "Concierto",
    "Conferencia",
    "Deporte",
    "Cultural",
    "Otro",
  ];

  const handleSubmit = (formData: EventFormData) => {
    if (editingEventId) {
      updateEvent(editingEventId, formData);
    } else {
      addEvent(formData);
    }
    setIsModalOpen(false);
    setEditingEventId(null);
  };

  const handleEditEvent = (eventId: string) => {
    setEditingEventId(eventId);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
    if (editingEventId === eventId) {
      setEditingEventId(null);
    }
    // setIsModalOpen(false);
  };

  const openCreateEventModal = () => {
    setEditingEventId(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEventId(null);
  };

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      !selectedCategory || event.category === selectedCategory;
    const matchesPetFriendly = !petFriendlyOnly || event.petFriendly;
    return matchesCategory && matchesPetFriendly;
  });

  const editingEvent = editingEventId
    ? events.find((e) => e.id === editingEventId)
    : null;

  return (
    <div className="app-container">
      <h1>Gestion de Eventos</h1>

      <div className="content">
        <div className="list-section">
          <div className="actions-header">
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              petFriendly={petFriendlyOnly}
              onCategoryChange={setSelectedCategory}
              onPetFriendlyChange={setPetFriendlyOnly}
            />
            <button className="create-btn" onClick={openCreateEventModal}>
              Crear Nuevo Evento
            </button>
          </div>
          <h2>Eventos</h2>
          {filteredEvents.length === 0 ? (
            <p>No hay eventos para mostrar</p>
          ) : (
            <EventList
              events={filteredEvents}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
            />
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingEvent ? "Editar Evento" : "Crear Evento"}
      >
        <EventForm
          onSubmit={handleSubmit}
          initialValues={editingEvent || undefined}
        />
      </Modal>
    </div>
  );
}

export default App;
