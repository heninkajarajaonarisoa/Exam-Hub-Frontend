

const DELAY = 350;
const wait = (ms = DELAY) => new Promise((res) => setTimeout(res, ms));

function apiError(status, message) {
  const err = new Error(message);
  err.status = status;
  err.message = message;
  return err;
}

const STORAGE_KEY = "examhub_mock_db_v1";

function seedDb() {
  const now = Date.now();
  const hour = 3600 * 1000;
  return {
    users: [
      { id: "u1", role: "admin", name: "Admin Principal", email: "admin@hei.mg", password: "admin123", active: true },
      { id: "u2", role: "student", name: "Rina Andria", email: "rina@hei.mg", password: "student123", active: true },
      { id: "u3", role: "student", name: "Tojo Rakoto", email: "tojo@hei.mg", password: "student123", active: true },
      { id: "u4", role: "student", name: "Fara Rasoa", email: "fara@hei.mg", password: "student123", active: false },
    ],
    courses: [
      { id: "c1", code: "PROG2", name: "Programmation 2", description: "Programmation orientée objet en Java." },
      { id: "c2", code: "BDD1", name: "Bases de données 1", description: "Modélisation et SQL." },
    ],
    exams: [
      {
        id: "e1",
        courseId: "c1",
        title: "QCM Algorithmique Avancée",
        description: "Structures de données et complexité.",
        startAt: new Date(now - hour).toISOString(),
        endAt: new Date(now + 48 * hour).toISOString(),
      },
      {
        id: "e2",
        courseId: "c2",
        title: "Évaluation Bases de Données",
        description: "Modèle relationnel et requêtes SQL.",
        startAt: new Date(now - 72 * hour).toISOString(),
        endAt: new Date(now - 24 * hour).toISOString(),
      },
    ],
    questions: [
      {
        id: "q1", examId: "e1", text: "Quelle est la complexité moyenne d'une recherche dans un arbre binaire équilibré ?", points: 2,
        choices: [
          { id: "ch1", text: "O(1)", correct: false },
          { id: "ch2", text: "O(log n)", correct: true },
          { id: "ch3", text: "O(n)", correct: false },
          { id: "ch4", text: "O(n log n)", correct: false },
        ],
      },
      {
        id: "q2", examId: "e1", text: "Une pile (stack) fonctionne selon le principe :", points: 1,
        choices: [
          { id: "ch5", text: "FIFO", correct: false },
          { id: "ch6", text: "LIFO", correct: true },
        ],
      },
      {
        id: "q3", examId: "e2", text: "Quelle clause SQL permet de filtrer des groupes après un GROUP BY ?", points: 2,
        choices: [
          { id: "ch7", text: "WHERE", correct: false },
          { id: "ch8", text: "HAVING", correct: true },
          { id: "ch9", text: "FILTER", correct: false },
        ],
      },
    ],
    attempts: [
      {
        id: "a1", examId: "e2", studentId: "u2", submittedAt: new Date(now - 20 * hour).toISOString(),
        answers: [{ questionId: "q3", choiceId: "ch8" }],
        score: 2,
      },
    ],
  };
}

function loadDb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fall through to reseed
  }
  const seeded = seedDb();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  return seeded;
}

function saveDb(db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export function resetMockDb() {
  const seeded = seedDb();
  saveDb(seeded);
  return seeded;
}

// ---- auth --------------------------------------------------------------

export async function login(email, password) {
  await wait();
  const db = loadDb();
  const user = db.users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
  if (!user || user.password !== password) {
    throw apiError(401, "Email ou mot de passe incorrect.");
  }
  if (!user.active) {
    throw apiError(403, "Ce compte a été désactivé. Contactez l'administration.");
  }
  const token = btoa(`${user.id}:${Date.now()}`);
  const { password: _pw, ...safeUser } = user;
  return { token, user: safeUser };
}

// ---- admin: students -----------------------------------------------------

export async function getStudents() {
  await wait();
  const db = loadDb();
  return db.users.filter((u) => u.role === "student").map(({ password, ...s }) => s);
}

export async function createStudent({ name, email, password }) {
  await wait();
  const db = loadDb();
  if (db.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw apiError(409, "Un compte existe déjà avec cet email.");
  }
  const student = { id: uid("u"), role: "student", name, email, password, active: true };
  db.users.push(student);
  saveDb(db);
  const { password: _pw, ...safe } = student;
  return safe;
}

export async function updateStudent(id, patch) {
  await wait();
  const db = loadDb();
  const student = db.users.find((u) => u.id === id && u.role === "student");
  if (!student) throw apiError(404, "Étudiant introuvable.");
  Object.assign(student, patch);
  saveDb(db);
  const { password, ...safe } = student;
  return safe;
}

export async function deactivateStudent(id) {
  return updateStudent(id, { active: false });
}

// ---- admin: courses --------------------------------------------------

export async function getCourses() {
  await wait();
  return loadDb().courses;
}

export async function createCourse({ code, name, description }) {
  await wait();
  const db = loadDb();
  if (db.courses.some((c) => c.code.toLowerCase() === code.toLowerCase())) {
    throw apiError(409, "Ce code cours existe déjà.");
  }
  const course = { id: uid("c"), code, name, description };
  db.courses.push(course);
  saveDb(db);
  return course;
}

export async function updateCourse(id, patch) {
  await wait();
  const db = loadDb();
  const course = db.courses.find((c) => c.id === id);
  if (!course) throw apiError(404, "Cours introuvable.");
  Object.assign(course, patch);
  saveDb(db);
  return course;
}

export async function deleteCourse(id) {
  await wait();
  const db = loadDb();
  const hasExams = db.exams.some((e) => e.courseId === id);
  if (hasExams) throw apiError(409, "Impossible de supprimer un cours qui possède des examens.");
  db.courses = db.courses.filter((c) => c.id !== id);
  saveDb(db);
  return { deleted: true };
}

// ---- admin: exams ------------------------------------------------------

export async function getExams() {
  await wait();
  const db = loadDb();
  return db.exams.map((e) => ({
    ...e,
    courseCode: db.courses.find((c) => c.id === e.courseId)?.code ?? "?",
    questionCount: db.questions.filter((q) => q.examId === e.id).length,
    attemptCount: db.attempts.filter((a) => a.examId === e.id).length,
  }));
}

export async function getExam(id) {
  await wait();
  const db = loadDb();
  const exam = db.exams.find((e) => e.id === id);
  if (!exam) throw apiError(404, "Examen introuvable.");
  return exam;
}

export async function createExam({ courseId, title, description, startAt, endAt }) {
  await wait();
  const db = loadDb();
  const exam = { id: uid("e"), courseId, title, description, startAt, endAt };
  db.exams.push(exam);
  saveDb(db);
  return exam;
}

export async function updateExam(id, patch) {
  await wait();
  const db = loadDb();
  const exam = db.exams.find((e) => e.id === id);
  if (!exam) throw apiError(404, "Examen introuvable.");
  Object.assign(exam, patch);
  saveDb(db);
  return exam;
}

export async function deleteExam(id) {
  await wait();
  const db = loadDb();
  const hasAttempts = db.attempts.some((a) => a.examId === id);
  if (hasAttempts) throw apiError(409, "Impossible de supprimer un examen qui a des tentatives.");
  db.exams = db.exams.filter((e) => e.id !== id);
  saveDb(db);
  return { deleted: true };
}

// ---- admin: questions -----------------------------------------------

export async function getExamQuestions(examId) {
  await wait();
  const db = loadDb();
  return db.questions.filter((q) => q.examId === examId);
}

export async function isExamLocked(examId) {
  await wait();
  const db = loadDb();
  return db.attempts.some((a) => a.examId === examId);
}

export async function createQuestion(examId, { text, points, choices }) {
  await wait();
  const db = loadDb();
  const locked = db.attempts.some((a) => a.examId === examId);
  if (locked) throw apiError(409, "Cet examen a déjà des tentatives : questions verrouillées.");
  if (choices.length < 2 || choices.length > 6) throw apiError(400, "Une question doit avoir entre 2 et 6 choix.");
  const correctCount = choices.filter((c) => c.correct).length;
  if (correctCount !== 1) throw apiError(400, "Exactement un choix doit être correct.");
  const question = {
    id: uid("q"),
    examId,
    text,
    points,
    choices: choices.map((c) => ({ id: uid("ch"), text: c.text, correct: c.correct })),
  };
  db.questions.push(question);
  saveDb(db);
  return question;
}

export async function updateQuestion(id, patch) {
  await wait();
  const db = loadDb();
  const question = db.questions.find((q) => q.id === id);
  if (!question) throw apiError(404, "Question introuvable.");
  const locked = db.attempts.some((a) => a.examId === question.examId);
  if (locked) throw apiError(409, "Cet examen a déjà des tentatives : questions verrouillées.");
  if (patch.choices) {
    if (patch.choices.length < 2 || patch.choices.length > 6) throw apiError(400, "Une question doit avoir entre 2 et 6 choix.");
    const correctCount = patch.choices.filter((c) => c.correct).length;
    if (correctCount !== 1) throw apiError(400, "Exactement un choix doit être correct.");
  }
  Object.assign(question, patch);
  saveDb(db);
  return question;
}

export async function deleteQuestion(id) {
  await wait();
  const db = loadDb();
  const question = db.questions.find((q) => q.id === id);
  if (!question) throw apiError(404, "Question introuvable.");
  const locked = db.attempts.some((a) => a.examId === question.examId);
  if (locked) throw apiError(409, "Cet examen a déjà des tentatives : questions verrouillées.");
  db.questions = db.questions.filter((q) => q.id !== id);
  saveDb(db);
  return { deleted: true };
}

// ---- admin: results ------------------------------------------------

export async function getExamResults(examId) {
  await wait();
  const db = loadDb();
  const attempts = db.attempts.filter((a) => a.examId === examId);
  const rows = attempts.map((a) => {
    const student = db.users.find((u) => u.id === a.studentId);
    return { studentId: a.studentId, studentName: student?.name ?? "?", score: a.score, submittedAt: a.submittedAt };
  });
  const average = rows.length ? rows.reduce((s, r) => s + r.score, 0) / rows.length : 0;
  return { rows, average, attemptCount: rows.length };
}

// ---- student: my exams --------------------------------------------

export async function getMyExams(studentId) {
  await wait();
  const db = loadDb();
  const now = Date.now();
  const attemptedIds = new Set(db.attempts.filter((a) => a.studentId === studentId).map((a) => a.examId));
  return db.exams
    .filter((e) => !attemptedIds.has(e.id))
    .filter((e) => new Date(e.startAt).getTime() <= now && now <= new Date(e.endAt).getTime())
    .map((e) => ({
      ...e,
      courseCode: db.courses.find((c) => c.id === e.courseId)?.code ?? "?",
      questionCount: db.questions.filter((q) => q.examId === e.id).length,
    }));
}

export async function getMyExam(studentId, examId) {
  await wait();
  const db = loadDb();
  const exam = db.exams.find((e) => e.id === examId);
  if (!exam) throw apiError(404, "Examen introuvable.");
  const now = Date.now();
  if (now < new Date(exam.startAt).getTime() || now > new Date(exam.endAt).getTime()) {
    throw apiError(403, "Cet examen n'est pas disponible actuellement.");
  }
  const already = db.attempts.some((a) => a.examId === examId && a.studentId === studentId);
  if (already) throw apiError(409, "Vous avez déjà passé cet examen.");
  const questions = db.questions
    .filter((q) => q.examId === examId)
    // RG-07: never send which choice is correct
    .map((q) => ({ id: q.id, text: q.text, points: q.points, choices: q.choices.map((c) => ({ id: c.id, text: c.text })) }));
  return { ...exam, questions };
}

export async function submitExam(studentId, examId, answers) {
  await wait();
  const db = loadDb();
  const exam = db.exams.find((e) => e.id === examId);
  if (!exam) throw apiError(404, "Examen introuvable.");
  const now = Date.now();
  if (now < new Date(exam.startAt).getTime() || now > new Date(exam.endAt).getTime()) {
    throw apiError(403, "La fenêtre de disponibilité de cet examen est fermée.");
  }
  const already = db.attempts.some((a) => a.examId === examId && a.studentId === studentId);
  if (already) throw apiError(409, "Vous avez déjà passé cet examen.");

  const questions = db.questions.filter((q) => q.examId === examId);
  let score = 0;
  const correction = questions.map((q) => {
    const given = answers.find((a) => a.questionId === q.id);
    const correctChoice = q.choices.find((c) => c.correct);
    const isCorrect = given && given.choiceId === correctChoice.id;
    if (isCorrect) score += q.points;
    return {
      questionId: q.id,
      text: q.text,
      points: q.points,
      choices: q.choices,
      selectedChoiceId: given?.choiceId ?? null,
      correctChoiceId: correctChoice.id,
      isCorrect: !!isCorrect,
    };
  });

  const attempt = {
    id: uid("a"),
    examId,
    studentId,
    answers,
    score,
    submittedAt: new Date().toISOString(),
  };
  db.attempts.push(attempt);
  saveDb(db);
  return { score, correction, submittedAt: attempt.submittedAt };
}

export async function getMyExamResult(studentId, examId) {
  await wait();
  const db = loadDb();
  const attempt = db.attempts.find((a) => a.examId === examId && a.studentId === studentId);
  if (!attempt) throw apiError(404, "Aucune tentative trouvée pour cet examen.");
  const exam = db.exams.find((e) => e.id === examId);
  const questions = db.questions.filter((q) => q.examId === examId);
  const correction = questions.map((q) => {
    const given = attempt.answers.find((a) => a.questionId === q.id);
    const correctChoice = q.choices.find((c) => c.correct);
    return {
      questionId: q.id,
      text: q.text,
      points: q.points,
      choices: q.choices,
      selectedChoiceId: given?.choiceId ?? null,
      correctChoiceId: correctChoice.id,
      isCorrect: given?.choiceId === correctChoice.id,
    };
  });
  return { examTitle: exam?.title ?? "Examen", score: attempt.score, submittedAt: attempt.submittedAt, correction };
}

export async function getMyResults(studentId) {
  await wait();
  const db = loadDb();
  return db.attempts
    .filter((a) => a.studentId === studentId)
    .map((a) => {
      const exam = db.exams.find((e) => e.id === a.examId);
      return {
        examId: a.examId,
        examTitle: exam?.title ?? "Examen supprimé",
        score: a.score,
        submittedAt: a.submittedAt,
      };
    });
}
