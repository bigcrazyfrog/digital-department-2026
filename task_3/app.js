function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function selectAttempts(filter) {
  const attempts = window.reportData.attempts;
  if (filter === 'passed') {
    return attempts.filter(function (attempt) {
      return attempt.passed === true;
    });
  }
  if (filter === 'failed') {
    return attempts.filter(function (attempt) {
      return attempt.passed === false;
    });
  }
  return attempts;
}

function renderAttempts(attempts) {
  const list = document.querySelector('#result-list');
  const count = document.querySelector('#result-count');
  const total = window.reportData.attempts.length;

  let html = '';
  attempts.forEach(function (attempt) {
    html += '<li class="result-item">' +
      '<span class="result-name">' + escapeHtml(attempt.name) + '</span>' +
      ' — ' + attempt.score + ' из ' + attempt.questionCount +
      ' (' + attempt.percentage + '%)' +
      '</li>';
  });

  list.innerHTML = html;
  if (count) {
    count.textContent = 'Показано: ' + attempts.length + ' из ' + total;
  }
}

function startFilter() {
  const form = document.querySelector('form');
  const select = document.querySelector('select');
  const count = document.querySelector('#result-count');
  const list = document.querySelector('#result-list');

  if (!form || !select || !count || !list) {
    fail('Не найдены элементы формы');
    return;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const value = select.value;
    const filtered = selectAttempts(value);
    renderAttempts(filtered);
  });
}

startFilter()
