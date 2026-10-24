import test from 'node:test';
import assert from 'node:assert/strict';
import { simulate, tasks, strategies, snippets } from './model.mjs';
test('zero budget includes no context', () => {
  for (const s of strategies) { const r = simulate('validation', s.id, 0, 100, 200); assert.equal(r.used, 0); assert.equal(r.coverage, 0); }
});
test('budgets, token accounting, missing labels and coverage stay consistent', () => {
  for (const task of tasks) for (const s of strategies) for (const budget of [100, 500, 1200, 2400, 5000]) {
    const r = simulate(task.id, s.id, budget, 100, 200);
    assert.ok(r.used <= budget);
    assert.equal(r.used, r.selected.reduce((n, id) => n + snippets.find(x => x.id === id).tokens, 0) + r.calls * 100);
    assert.equal(new Set(r.selected).size, r.selected.length);
    assert.deepEqual(r.missing, task.required.filter(id => !r.selected.includes(id)));
    assert.ok(Math.abs(r.coverage - (1 - r.missing.length / task.required.length)) < 1e-12);
  }
});
test('large budget can cover every required snippet', () => {
  for (const task of tasks) for (const s of strategies) assert.equal(simulate(task.id, s.id, 5000, 100, 200).coverage, 1);
});
test('hidden dependency demonstrates an upfront ranking failure', () => {
  assert.ok(simulate('hidden', 'demand', 1200, 100, 200).coverage > simulate('hidden', 'upfront', 1200, 100, 200).coverage);
});
test('invalid parameters are rejected', () => {
  for (const n of [-1, NaN, Infinity]) assert.throws(() => simulate('validation', 'upfront', n, 100, 200));
  assert.throws(() => simulate('unknown', 'upfront', 100, 100, 200));
  assert.throws(() => simulate('validation', 'unknown', 100, 100, 200));
});
