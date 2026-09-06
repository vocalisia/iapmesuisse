import { test } from 'node:test';
import assert from 'node:assert/strict';
import { timeSavings, emailWorkload, pilotComparison, automationTriage, type AutomationInputs } from '../lib/free-tools/calculators';
const base = { weeklyTasks: 60, beforeMinutes: 8, assistedMinutes: 3, reviewMinutes: 2, setupMinutes: 240, amortizationWeeks: 8 };
test('worked example includes review and allocated setup', () => {
  const r = timeSavings(base);
  assert.equal(r.baselineMinutes, 480); assert.equal(r.futureMinutes, 330);
  assert.equal(r.savedMinutes, 150); assert.equal(r.savedHours, 2.5);
});
test('zero reference returns null percentage and keeps setup loss', () => {
  const r = timeSavings({ ...base, weeklyTasks: 0 });
  assert.equal(r.savedMinutes, -30); assert.equal(r.savedPercent, null);
});
test('negative gain is retained instead of marketing floor', () => {
  assert.equal(timeSavings({ ...base, assistedMinutes: 9 }).savedMinutes, -210);
});
test('all numeric inputs reject non-finite, negative and coerced values', () => {
  for (const key of Object.keys(base)) for (const value of [-1, NaN, Infinity, '10', null]) {
    assert.throws(() => timeSavings({ ...base, [key]: value } as typeof base));
  }
  assert.throws(() => timeSavings({ ...base, amortizationWeeks: 0 }));
});
test('arithmetic overflow rejected', () => {
  assert.throws(() => timeSavings({ ...base, weeklyTasks: Number.MAX_VALUE, beforeMinutes: 2 }));
  assert.throws(() => timeSavings({ ...base, amortizationWeeks: Number.MIN_VALUE }));
});
test('more review and setup never improve an estimate', () => {
  for (const reviewMinutes of [0, 1, 10, 100]) {
    const first = timeSavings({ ...base, reviewMinutes });
    const second = timeSavings({ ...base, reviewMinutes: reviewMinutes + 1 });
    assert.equal(first.savedMinutes - second.savedMinutes, 60);
  }
});
const mail = { emailsPerDay: 40, workDaysPerWeek: 5, beforeMinutes: 5, repetitivePercent: 25, assistedMinutes: 1, reviewMinutes: 1, setupMinutes: 80, amortizationWeeks: 4 };
test('email scenario changes only the selected portion', () => {
  const r = emailWorkload(mail);
  assert.equal(r.weeklyEmails, 200); assert.equal(r.repetitiveEmails, 50);
  assert.equal(r.unchangedMinutes, 750); assert.equal(r.baselineMinutes, 1000);
  assert.equal(r.futureMinutes, 870); assert.equal(r.savedMinutes, 130);
});
test('email shares zero and full cover correct baselines', () => {
  assert.equal(emailWorkload({ ...mail, repetitivePercent: 0 }).savedMinutes, -20);
  assert.equal(emailWorkload({ ...mail, repetitivePercent: 100 }).savedMinutes, 580);
  assert.equal(emailWorkload({ ...mail, emailsPerDay: 0 }).savedPercent, null);
  assert.throws(() => emailWorkload({ ...mail, repetitivePercent: 101 }));
  assert.throws(() => emailWorkload({ ...mail, workDaysPerWeek: 8 }));
});
const before = { tasks: 20, productionMinutes: 120, reviewMinutes: 20, correctionMinutes: 20, tasksWithErrors: 2 };
const after = { tasks: 40, productionMinutes: 120, reviewMinutes: 40, correctionMinutes: 40, tasksWithErrors: 8 };
test('pilot normalizes volumes, counts corrections, exposes worse quality separately', () => {
  const r = pilotComparison(before, after, 100);
  assert.equal(r.before.minutesPerTask, 8); assert.equal(r.after.minutesPerTask, 5);
  assert.equal(r.netSavedMinutes, 20); assert.equal(r.qualityDirection, 'more-errors');
  assert.equal(r.timeDirection, 'faster'); assert.equal(r.causalClaim, false);
});
test('pilot requires actual valid observed volumes and separate errors', () => {
  for (const tasks of [0, -1, 2.5, Number.MAX_SAFE_INTEGER + 1]) assert.throws(() => pilotComparison({ ...before, tasks }, after, 0));
  for (const tasksWithErrors of [-1, 21, 1.5, NaN]) assert.throws(() => pilotComparison({ ...before, tasksWithErrors }, after, 0));
  assert.throws(() => pilotComparison(before, after, Infinity));
});
test('identical pilot observations do not claim improvement', () => {
  const r = pilotComparison(before, before, 0);
  assert.equal(r.netSavedMinutes, 0); assert.equal(r.timeDirection, 'unchanged'); assert.equal(r.qualityDirection, 'unchanged');
});
const task: AutomationInputs = { repetitive: true, clearRules: true, stableInputs: true, languageTask: false, frequentExceptions: false, sensitiveData: false, consequentialDecision: false };
test('triage explains automation, assistance and blocking cases', () => {
  assert.equal(automationTriage(task).decision, 'automate');
  assert.equal(automationTriage({ ...task, languageTask: true }).decision, 'assist');
  for (const key of ['sensitiveData', 'consequentialDecision', 'frequentExceptions'] as const) {
    const r = automationTriage({ ...task, [key]: true }); assert.equal(r.decision, 'human'); assert.ok(r.reason);
  }
  assert.equal(automationTriage({ ...task, stableInputs: false }).decision, 'human');
  assert.throws(() => automationTriage({ ...task, repetitive: 'yes' } as unknown as AutomationInputs));
});