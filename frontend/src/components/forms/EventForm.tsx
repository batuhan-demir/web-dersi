interface EventFormProps {
  onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <p>
          <label htmlFor="title">Etkinlik Adı</label>
          <input type="text" id="title" name="title" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" />
        </p>
        <p>
          <label htmlFor="category">Kategori</label>
          <select id="category" name="category" defaultValue="">
            <option value="">Seçiniz</option>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Söyleşi">Söyleşi</option>
            <option value="Yarışma">Yarışma</option>
          </select>
        </p>
        <p>
          <label htmlFor="date">Tarih</label>
          <input type="date" id="date" name="date" />
        </p>
        <p>
          <label htmlFor="time">Saat</label>
          <input type="time" id="time" name="time" />
        </p>
        <p>
          <label htmlFor="location">Yer</label>
          <input type="text" id="location" name="location" maxLength={80} placeholder="Örn. A Blok Konferans Salonu" />
        </p>
        <p>
          <label htmlFor="capacity">Kontenjan</label>
          <input type="number" id="capacity" name="capacity" min={1} max={1000} step={1} />
        </p>
        <p>
          <label htmlFor="description">Açıklama</label>
          <textarea id="description" name="description" rows={5} />
        </p>
        <p>
          <button type="submit">Kaydet</button>
        </p>
      </form>
    </>
  );
}

export default EventForm;
