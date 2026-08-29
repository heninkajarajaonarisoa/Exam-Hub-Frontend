import { fetchApi } from "./client";

export function resetMockDb() {
  return null;
}


export async function login(email, password) {
  return fetchApi("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}


function mapStudent(u) {
  return { id: u.id, role: u.role, name: u.name, email: u.email, active: u.is_active };
}

export async function getStudents() {
  const students = await fetchApi("/students");
  return students.map(mapStudent);
}

export async function createStudent({ name, email, password }) {
  const student = await fetchApi("/students", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  return mapStudent(student);
}

export async function updateStudent(id, patch) {
  const student = await fetchApi(`/students/${id}`, {
    method: "PUT",
    body: JSON.stringify(patch),
  });
  return mapStudent(student);
}

export async function deactivateStudent(id) {
  const student = await fetchApi(`/students/${id}`, { method: "DELETE" });
  return mapStudent(student);
}

export async function reactivateStudent(id) {
  const student = await fetchApi(`/students/${id}`, {
    method: "PUT",
    body: JSON.stringify({ isActive: true }),
  });
  return mapStudent(student);
}



export async function getCourses() {
  return fetchApi("/courses");
}

export async function createCourse({ code, name, description }) {
  return fetchApi("/courses", {
    method: "POST",
    body: JSON.stringify({ code, name, description }),
  });
}

export async function updateCourse(id, patch) {
  return fetchApi(`/courses/${id}`, {
    method: "PUT",
    body: JSON.stringify(patch),
  });
}

export async function deleteCourse(id) {
  await fetchApi(`/courses/${id}`, { method: "DELETE" });
  return { deleted: true };
}


function mapExam(e, { courseCode, questionCount, attemptCount } = {}) {
  return {
    id: e.id,
    courseId: e.course_id,
    title: e.title,
    description: e.description,
    startAt: e.opens_at,
    endAt: e.closes_at,
    ...(courseCode !== undefined ? { courseCode } : {}),
    ...(questionCount !== undefined ? { questionCount } : {}),
    ...(attemptCount !== undefined ? { attemptCount } : {}),
  };
}

export async function getExams() {
  const [exams, courses] = await Promise.all([fetchApi("/exams"), fetchApi("/courses")]);
  const courseById = new Map(courses.map((c) => [c.id, c]));

  return Promise.all(
    exams.map(async (e) => {
      const [questions, results] = await Promise.all([
        fetchApi(`/exams/${e.id}/questions`),
        fetchApi(`/exams/${e.id}/results`),
      ]);
      return mapExam(e, {
        courseCode: courseById.get(e.course_id)?.code ?? "?",
        questionCount: questions.length,
        attemptCount: results.attemptsCount,
      });
    })
  );
}

export async function getExam(id) {
  const exam = await fetchApi(`/exams/${id}`);
  return mapExam(exam);
}

export async function createExam({ courseId, title, description, startAt, endAt }) {
  const exam = await fetchApi("/exams", {
    method: "POST",
    body: JSON.stringify({ courseId, title, description, opensAt: startAt, closesAt: endAt }),
  });
  return mapExam(exam);
}

export async function updateExam(id, patch) {
  const body = {};
  if (patch.title !== undefined) body.title = patch.title;
  if (patch.description !== undefined) body.description = patch.description;
  if (patch.startAt !== undefined) body.opensAt = patch.startAt;
  if (patch.endAt !== undefined) body.closesAt = patch.endAt;

  const exam = await fetchApi(`/exams/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  return mapExam(exam);
}

export async function deleteExam(id) {
  await fetchApi(`/exams/${id}`, { method: "DELETE" });
  return { deleted: true };
}

function mapChoiceOut(c) {
  return { id: c.id, text: c.label, correct: c.is_correct };
}

function mapQuestion(q) {
  return {
    id: q.id,
    examId: q.exam_id,
    text: q.statement,
    points: Number(q.points),
    choices: (q.choices ?? []).map(mapChoiceOut),
  };
}

export async function getExamQuestions(examId) {
  const questions = await fetchApi(`/exams/${examId}/questions`);
  return questions.map(mapQuestion);
}

export async function isExamLocked(examId) {
  const results = await fetchApi(`/exams/${examId}/results`);
  return results.attemptsCount > 0;
}

export async function createQuestion(examId, { text, points, choices }) {
  const question = await fetchApi(`/exams/${examId}/questions`, {
    method: "POST",
    body: JSON.stringify({
      statement: text,
      points: Number(points),
      choices: choices.map((c) => ({ label: c.text, isCorrect: c.correct })),
    }),
  });
  return mapQuestion(question);
}

export async function updateQuestion(id, patch) {
  const body = {};
  if (patch.text !== undefined) body.statement = patch.text;
  if (patch.points !== undefined) body.points = Number(patch.points);
  if (patch.choices !== undefined) {
    body.choices = patch.choices.map((c) => ({ label: c.text, isCorrect: c.correct }));
  }
  const question = await fetchApi(`/questions/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  return mapQuestion(question);
}

export async function deleteQuestion(id) {
  await fetchApi(`/questions/${id}`, { method: "DELETE" });
  return { deleted: true };
}


export async function getExamResults(examId) {
  const r = await fetchApi(`/exams/${examId}/results`);
  return {
    rows: r.students.map((s) => ({
      studentId: s.studentId,
      studentName: s.name,
      score: s.score ?? 0,
      submittedAt: s.submittedAt,
    })),
    average: r.average ?? 0,
    attemptCount: r.attemptsCount,
  };
}

export async function getMyExams(_studentId) {
  const exams = await fetchApi("/my/exams");
  return Promise.all(
    exams.map(async (e) => {
      const detail = await fetchApi(`/my/exams/${e.id}`);
      return {
        id: e.id,
        courseId: e.course?.id ?? null,
        courseCode: e.course?.code ?? "?",
        title: e.title,
        description: e.description,
        startAt: e.opensAt,
        endAt: e.closesAt,
        questionCount: detail.questions?.length ?? 0,
      };
    })
  );
}

export async function getMyExam(_studentId, examId) {
  const data = await fetchApi(`/my/exams/${examId}`);

  if (data.alreadySubmitted) {
    const err = new Error("Vous avez déjà passé cet examen.");
    err.status = 409;
    throw err;
  }

  return {
    id: data.exam.id,
    title: data.exam.title,
    description: data.exam.description,
    questions: data.questions.map((q) => ({
      id: q.id,
      text: q.statement,
      points: Number(q.points),
      choices: q.choices.map((c) => ({ id: c.id, text: c.label })),
    })),
  };
}

export async function submitExam(_studentId, examId, answers) {
  const result = await fetchApi(`/my/exams/${examId}/submit`, {
    method: "POST",
    body: JSON.stringify({ answers }),
  });
  return {
    score: result.score,
    submittedAt: result.submittedAt,
    correction: result.questions.map((q) => ({
      questionId: q.questionId,
      text: q.statement,
      points: Number(q.points),
      choices: q.choices.map(mapChoiceOut),
      selectedChoiceId: q.selectedChoiceId,
      correctChoiceId: q.correctChoiceId,
      isCorrect: q.isCorrect,
    })),
  };
}

export async function getMyExamResult(_studentId, examId) {
  const data = await fetchApi(`/my/exams/${examId}`);

  if (!data.alreadySubmitted) {
    const err = new Error("Aucune tentative trouvée pour cet examen.");
    err.status = 404;
    throw err;
  }

  return {
    examTitle: data.exam.title,
    score: data.score,
    submittedAt: data.submittedAt,
    correction: data.questions.map((q) => {
      const correctChoice = q.choices.find((c) => c.isCorrect) ?? null;
      return {
        questionId: q.id,
        text: q.statement,
        points: Number(q.points),
        choices: q.choices.map((c) => ({ id: c.id, text: c.label })),
        selectedChoiceId: q.selectedChoiceId,
        correctChoiceId: correctChoice?.id ?? null,
        isCorrect: q.selectedChoiceId !== null && q.selectedChoiceId === correctChoice?.id,
      };
    }),
  };
}

export async function getMyResults(_studentId) {
  const results = await fetchApi("/my/results");
  return results.map((r) => ({
    examId: r.examId,
    examTitle: r.examTitle,
    score: r.score,
    submittedAt: r.submittedAt,
  }));
}
