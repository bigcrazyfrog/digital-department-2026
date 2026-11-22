const PASSING_PERCENTAGE = 67

function isArray(value) {
  return Array.isArray(value)
}

export function validateQuizData(data) {
  if (typeof data !== 'object' || data === null || isArray(data))
    return false;

  if (typeof data.quizTitle !== 'string' || data.quizTitle.trim() === '')
    return false;

  if (!isArray(data.correctAnswers) || data.correctAnswers.length === 0)
    return false;

  if (!isArray(data.attempts) || data.attempts.length === 0)
    return false;

  for (let i = 0; i < data.attempts.length; i++) {
    const attempt = data.attempts[i];

    if (typeof attempt !== 'object' || attempt === null || isArray(attempt))
      return false;

    if (typeof attempt.name !== 'string' || attempt.name.trim() === '')
      return false;

    if (!isArray(attempt.answers) || attempt.answers.length !== data.correctAnswers.length)
      return false;
  }

  return true;
}

export function calculateAttempt(attempt, correctAnswers) {
  let score = 0;
  for (let i = 0; i < correctAnswers.length; i++) {
    if (attempt.answers[i] === correctAnswers[i]) {
      score += 1;
    }
  }

  const percentage = Math.round((score / correctAnswers.length) * 100);
  const passed = percentage >= 67;

  return {
    name: attempt.name.trim(),
    score: score,
    percentage: percentage,
    passed: passed,
  };
}

export function calculateReport(data) {
  const attempts = data.attempts.map(function (attempt) {
    return calculateAttempt(attempt, data.correctAnswers);
  });

  let totalPercentage = 0;
  let passedCount = 0;
  let best = attempts[0];

  attempts.forEach(function (calculated) {
    totalPercentage += calculated.percentage;
    if (calculated.passed === true)
      passedCount += 1;
    if (calculated.percentage > best.percentage)
      best = calculated;
  });

  const averagePercentage = Math.round(totalPercentage / attempts.length);

  return {
    quizTitle: data.quizTitle.trim(),
    questionCount: data.correctAnswers.length,
    participantCount: attempts.length,
    averagePercentage: averagePercentage,
    passedCount: passedCount,
    threshold: 67,
    best: best,
    attempts: attempts,
  };
}
