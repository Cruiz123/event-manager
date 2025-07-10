import { useEffect, useState } from "react";
import { Event, EventFormData } from "../types/Events";
import { getFromLocalStorage, saveToLocalStorage } from "../utils";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const saveEvents = getFromLocalStorage("events");
    if (saveEvents) {
      const eventWithDates = saveEvents.map((event: any) => ({
        ...event,
        date: event.date.map((dateStr: any) => new Date(dateStr)),
      }));
      setEvents(eventWithDates);
    }
  }, []);

  const addEvent = (eventData: EventFormData) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
    };

    const updateEvents = [...events, newEvent];
    setEvents(updateEvents);
    saveToLocalStorage("events", updateEvents);
    return newEvent;
  };

  const updateEvent = (id: string, eventData: EventFormData) => {
    const updatedEvents = events.map((event) => {
      return event.id === id ? { ...eventData, id } : event;
    });
    setEvents(updatedEvents);
    saveToLocalStorage("events", updatedEvents);
  };

  const deleteEvent = (id: string) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
    saveToLocalStorage("events", updatedEvents);
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
  };
};
