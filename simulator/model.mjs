export const snippets = [
  { id: 'route', name: 'API route', tokens: 240 },
  { id: 'service', name: 'Account service', tokens: 380 },
  { id: 'schema', name: 'Validation schema', tokens: 190 },
  { id: 'auth', name: 'Authorization policy', tokens: 300 },
  { id: 'tests', name: 'Behavior tests', tokens: 350 },
  { id: 'config', name: 'Feature configuration', tokens: 160 },
  { id: 'ui', name: 'Settings interface', tokens: 420 },
];
export const tasks = [
  { id: 'validation', name: 'Add account input validation', required: ['route', 'schema', 'tests'], upfront: ['schema', 'route', 'tests', 'service', 'auth', 'config', 'ui'], demand: ['route', 'service', 'schema', 'tests', 'auth', 'config', 'ui'] },
  { id: 'permission', name: 'Fix a cross-file permission bug', required: ['route', 'service', 'auth', 'tests'], upfront: ['service', 'route', 'auth', 'tests', 'schema', 'config', 'ui'], demand: ['route', 'service', 'auth', 'tests', 'schema', 'ui', 'config'] },
  { id: 'hidden', name: 'Find a hidden feature-flag dependency', required: ['service', 'config', 'tests'], upfront: ['service', 'route', 'schema', 'ui', 'tests', 'auth', 'config'], demand: ['service', 'config', 'tests', 'route', 'schema', 'auth', 'ui'] },
];
export const strategies = [{ id: 'demand', name: 'On-demand retrieval' }, { id: 'upfront', name: 'Upfront context' }, { id: 'hybrid', name: 'Upfront + fallback' }];
export function simulate(taskId, strategy, budget, overhead, callMs) {
  const task = tasks.find(t => t.id === taskId);
  if (!task || !strategies.some(s => s.id === strategy)) throw new Error('Unknown task or strategy');
  for (const n of [budget, overhead, callMs]) if (!Number.isFinite(n) || n < 0) throw new Error('Inputs must be finite and nonnegative');
  const selected = []; let used = 0; let calls = 0;
  function add(order, cap, withCalls) {
    for (const id of order) {
      if (selected.includes(id)) continue;
      const item = snippets.find(s => s.id === id);
      const cost = item.tokens + (withCalls ? overhead : 0);
      if (used + cost > cap) continue;
      selected.push(id); used += cost; if (withCalls) calls++;
    }
  }
  if (strategy === 'demand') add(task.demand, budget, true);
  if (strategy === 'upfront') add(task.upfront, budget, false);
  if (strategy === 'hybrid') { add(task.upfront, budget * 0.5, false); add(task.demand, budget, true); }
  const missing = task.required.filter(id => !selected.includes(id));
  return { selected, missing, used, calls, coverage: (task.required.length - missing.length) / task.required.length, estimatedMs: (strategy === 'demand' ? 0 : 40) + calls * callMs };
}
