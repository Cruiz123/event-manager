export interface Event {
  id: string;
  name: string;
  category: string;
  price: number;
  date: Date[];
  petFriendly: boolean;
}

export type EventFormData = Omit<Event, "id">;
