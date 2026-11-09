const sourceJson = `{
  "event": {
    "title": "Ночь в музее",
    "date": "15 ноября, 18:30",
    "place": "Музей космонавтики, проспект Мира, 111",
    "description": "Вечерняя программа с выставкой и экскурсиями",
    "meeting": "Сбор: 18:30. Начало: 19:00."
  },
  "services": [
    { "id": "guide", "title": "  Экскурсия с гидом  ", "price": 500 },
    { "id": "audio", "title": "Аудиогид", "price": 350 },
    { "id": "catalog", "title": "Каталог выставки", "price": 250 }
  ]
}`;

let data;

try {
  data = JSON.parse(sourceJson);
} catch (error) {
  document.querySelector('#data-error').textContent = 'Ошибка чтения данных';
  document.querySelector('#data-error').hidden = false;
}

function buildReport(services, guideChecked, audioChecked, catalogChecked) {
  const selected = services.filter(service =>
    (service.id === 'guide' && guideChecked) ||
    (service.id === 'audio' && audioChecked) ||
    (service.id === 'catalog' && catalogChecked)
  );
  const items = selected.map(({ title, price }) => ({
    title: title.trim(),
    price: price
  }));

  return {
    count: items.length,
    total: items.reduce((sum, item) => sum + item.price, 0),
    items: items
  };
}

document.querySelector('#program-button').addEventListener('click', () => {
  document.querySelector('#program').hidden = false;
});

document.querySelector('#form-button').addEventListener('click', () => {
  document.querySelector('#services-form').hidden = false;
});

document.querySelector('#services-form').addEventListener('submit', event => {
  event.preventDefault();

  if (!data) return;

  const guideChecked = document.querySelector('#guide').checked;
  const audioChecked = document.querySelector('#audio').checked;
  const catalogChecked = document.querySelector('#catalog').checked;
  const report = buildReport(
    data.services,
    guideChecked,
    audioChecked,
    catalogChecked
  );

  document.querySelector('#result').innerHTML =
    `Выбрано услуг: ${report.count}<br>Итого: ${report.total} руб.` +
    report.items.map(item => `<br>${item.title}`).join('');
  document.querySelector('#result').hidden = false;

  try {
    const json = JSON.stringify(report);
    JSON.parse(json);

    document.querySelector('#report-json').textContent = json;
    document.querySelector('#report-json').hidden = false;
    document.querySelector('#report-error').hidden = true;
  } catch (error) {
    document.querySelector('#report-error').textContent = 'Ошибка отчёта';
    document.querySelector('#report-error').hidden = false;
    document.querySelector('#report-json').hidden = true;
  }
});
