/** Deterministic planning helpers. Durations are minutes, outputs are estimates. */
export type TimeInputs = {
  weeklyTasks: number; beforeMinutes: number; assistedMinutes: number;
  reviewMinutes: number; setupMinutes: number; amortizationWeeks: number;
};
function number(value: number, name: string, min = 0, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) {
    throw new RangeError(`${name} : nombre fini entre ${min} et ${max} requis.`);
  }
  return value;
}
function result(value: number): number {
  if (!Number.isFinite(value)) throw new RangeError('Valeurs trop grandes pour un calcul fiable.');
  return value;
}
function positive(value: number, name: string): number {
  number(value, name);
  if (value === 0) throw new RangeError(`${name} doit être supérieur à zéro.`);
  return value;
}
export function timeSavings(input: TimeInputs) {
  const tasks = number(input.weeklyTasks, 'Tâches par semaine');
  const before = number(input.beforeMinutes, 'Durée actuelle');
  const assisted = number(input.assistedMinutes, 'Durée assistée');
  const review = number(input.reviewMinutes, 'Durée de contrôle');
  const setup = number(input.setupMinutes, 'Mise en place');
  const weeks = positive(input.amortizationWeeks, 'Semaines de répartition');
  const baselineMinutes = result(tasks * before);
  const recurringMinutes = result(tasks * result(assisted + review));
  const allocatedSetupMinutes = result(setup / weeks);
  const futureMinutes = result(recurringMinutes + allocatedSetupMinutes);
  const savedMinutes = result(baselineMinutes - futureMinutes);
  return {
    baselineMinutes, recurringMinutes, allocatedSetupMinutes, futureMinutes, savedMinutes,
    savedHours: result(savedMinutes / 60),
    savedPercent: baselineMinutes === 0 ? null : result(savedMinutes / baselineMinutes * 100),
    kind: 'estimate' as const,
  };
}
export type EmailInputs = {
  emailsPerDay: number; workDaysPerWeek: number; beforeMinutes: number;
  repetitivePercent: number; assistedMinutes: number; reviewMinutes: number;
  setupMinutes: number; amortizationWeeks: number;
};
export function emailWorkload(input: EmailInputs) {
  const perDay = number(input.emailsPerDay, 'Emails par jour');
  const days = number(input.workDaysPerWeek, 'Jours travaillés', 0, 7);
  const share = number(input.repetitivePercent, 'Part répétitive', 0, 100) / 100;
  const weeklyEmails = result(perDay * days);
  const repetitiveEmails = result(weeklyEmails * share);
  const selected = timeSavings({ ...input, weeklyTasks: repetitiveEmails });
  const unchangedMinutes = result((weeklyEmails - repetitiveEmails) * number(input.beforeMinutes, 'Durée actuelle'));
  const baselineMinutes = result(weeklyEmails * input.beforeMinutes);
  const futureMinutes = result(selected.futureMinutes + unchangedMinutes);
  const savedMinutes = result(baselineMinutes - futureMinutes);
  return {
    weeklyEmails, repetitiveEmails, unchangedMinutes, baselineMinutes, futureMinutes, savedMinutes,
    savedHours: result(savedMinutes / 60),
    savedPercent: baselineMinutes === 0 ? null : result(savedMinutes / baselineMinutes * 100),
    allocatedSetupMinutes: selected.allocatedSetupMinutes, kind: 'estimate' as const,
  };
}
export type PilotPeriod = {
  tasks: number; productionMinutes: number; reviewMinutes: number;
  correctionMinutes: number; tasksWithErrors: number;
};
function period(input: PilotPeriod) {
  const tasks = positive(input.tasks, 'Nombre de tâches observées');
  const errors = number(input.tasksWithErrors, 'Tâches comportant une erreur', 0, tasks);
  if (!Number.isSafeInteger(tasks) || !Number.isSafeInteger(errors)) {
    throw new RangeError('Les nombres de tâches observées doivent être des entiers sûrs.');
  }
  const totalMinutes = result(number(input.productionMinutes, 'Production') +
    number(input.reviewMinutes, 'Relecture') + number(input.correctionMinutes, 'Corrections'));
  return { tasks, totalMinutes, minutesPerTask: result(totalMinutes / tasks), errorRate: errors / tasks };
}
export function pilotComparison(beforeInput: PilotPeriod, afterInput: PilotPeriod, setupMinutes: number) {
  const before = period(beforeInput), after = period(afterInput);
  const setup = number(setupMinutes, 'Mise en place');
  const savedMinutesPerTask = result(before.minutesPerTask - after.minutesPerTask);
  const comparableBaselineMinutes = result(before.minutesPerTask * after.tasks);
  const afterIncludingSetupMinutes = result(after.totalMinutes + setup);
  const netSavedMinutes = result(comparableBaselineMinutes - afterIncludingSetupMinutes);
  const errorRateDifference = after.errorRate - before.errorRate;
  const timeDirection = savedMinutesPerTask > 0 ? 'faster' : savedMinutesPerTask < 0 ? 'slower' : 'unchanged';
  const qualityDirection = errorRateDifference > 0 ? 'more-errors' : errorRateDifference < 0 ? 'fewer-errors' : 'unchanged';
  return {
    before, after, savedMinutesPerTask, comparableBaselineMinutes, afterIncludingSetupMinutes,
    netSavedMinutes, netSavedHours: result(netSavedMinutes / 60), errorRateDifference,
    timeDirection, qualityDirection, causalClaim: false as const,
    limitation: 'Comparaison descriptive : vérifier la difficulté des dossiers et les autres changements intervenus.',
  };
}
export type AutomationInputs = {
  repetitive: boolean; clearRules: boolean; stableInputs: boolean;
  languageTask: boolean; frequentExceptions: boolean;
  sensitiveData: boolean; consequentialDecision: boolean;
};
export function automationTriage(input: AutomationInputs) {
  for (const key of ['repetitive', 'clearRules', 'stableInputs', 'languageTask', 'frequentExceptions', 'sensitiveData', 'consequentialDecision'] as const) {
    if (typeof input[key] !== 'boolean') throw new TypeError(`${key} : réponse oui/non requise.`);
  }
  if (input.consequentialDecision || input.sensitiveData) return {
    decision: 'human' as const,
    reason: 'Examiner les données et les conséquences avec un responsable avant toute automatisation.',
  };
  if (input.frequentExceptions || !input.stableInputs) return {
    decision: 'human' as const,
    reason: 'Clarifier les entrées et le traitement des exceptions avant de déléguer cette tâche.',
  };
  if (input.repetitive && input.clearRules && !input.languageTask) return {
    decision: 'automate' as const,
    reason: 'Tester une règle déterministe sur ce périmètre stable, avec journal des erreurs et possibilité de reprise.',
  };
  if (input.languageTask) return {
    decision: 'assist' as const,
    reason: 'Préparer un brouillon avec assistance, puis faire vérifier les faits et approuver le résultat.',
  };
  return { decision: 'human' as const, reason: 'Le processus ne présente pas encore un périmètre suffisamment défini pour ce tri.' };
}