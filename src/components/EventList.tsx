import React from "react";
import { Event } from "../types/Events";
import { motion, AnimatePresence } from "framer-motion";
import EventCard from "./EventCard";

interface EventListProps {
  events: Event[];
  onEdit: (eventId: string) => void;
  onDelete: (eventId: string) => void;
}

function EventList({ events, onEdit, onDelete }: EventListProps) {
  return (
    <div className="event-list">
      <AnimatePresence>
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
          >
            <EventCard event={event} onEdit={onEdit} onDelete={onDelete} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default EventList;
