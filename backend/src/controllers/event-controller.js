import { events } from "../data/events.js";

export function getEvents(req, res) {
  const { category } = req.query;
  const list = category ? events.filter((e) => e.category === category) : events;

  res.json(list);
}

export function getEventById(req, res) {
  const event = events.find((e) => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({ error: { message: "Event not found" } });
  }

  res.json(event);
}

