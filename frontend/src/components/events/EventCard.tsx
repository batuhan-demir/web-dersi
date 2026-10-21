import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
      <h3>{event.title}</h3>
      <p className="kategori">{event.category}</p>
      <p>
        Tarih:{" "}
        <time dateTime={`${event.date}T${event.time}`}>
          {formatDate(event.date)}, {event.time}
        </time>
      </p>
      <p>Yer: {event.location}</p>
      <p>Kontenjan: {event.capacity} kişi</p>
      <p className="aciklama">{event.description}</p>
      <a
        href={`#${event.id}`}
        onClick={(e) => {
          e.preventDefault();
          onShowDetail(event.id);
        }}
      >
        Detayları gör →
      </a>
    </article>
  );
}

export default EventCard;
