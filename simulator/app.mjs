import { tasks, strategies, snippets, simulate } from './model.mjs';
const $ = id => document.getElementById(id);
const key = 'graperoot-context-study-v1';
for (const task of tasks) { const option = document.createElement('option'); option.value = task.id; option.textContent = task.name; $('task').append(option); }
function state() { return { task: $('task').value, budget: +$('budget').value, overhead: +$('overhead').value, latency: +$('latency').value, note: $('note').value }; }
function persist() { try { localStorage.setItem(key, JSON.stringify(state())); $('storage').textContent = 'Saved in this browser. Export to keep a separate copy.'; } catch { $('storage').textContent = 'Browser storage unavailable. Export your decision to save it.'; } }
try {
  const saved = JSON.parse(localStorage.getItem(key) || 'null');
  if (saved && typeof saved === 'object') {
    if (tasks.some(t => t.id === saved.task)) $('task').value = saved.task;
    for (const id of ['budget', 'overhead', 'latency']) if (Number.isFinite(saved[id])) $(id).value = saved[id];
    if (typeof saved.note === 'string') $('note').value = saved.note;
  }
} catch { /* A corrupt or unavailable store does not block the simulator. */ }
function name(id) { return snippets.find(s => s.id === id).name; }
function render() {
  const s = state();
  for (const id of ['budget', 'overhead', 'latency']) $(id + 'Value').textContent = s[id].toLocaleString();
  $('results').replaceChildren();
  for (const strategy of strategies) {
    const r = simulate(s.task, strategy.id, s.budget, s.overhead, s.latency);
    const card = document.createElement('article'); card.className = 'card';
    // Only static fixture labels and validated numeric outputs enter this template.
    card.innerHTML = `<div class="card-top"><h3>${strategy.name}</h3><span class="coverage">${Math.round(r.coverage * 100)}% coverage</span></div><div class="meter"><div class="fill" style="width:${r.coverage * 100}%"></div></div><div class="stats"><span>Modeled tokens<strong>${r.used.toLocaleString()}</strong></span><span>Retrieval calls<strong>${r.calls}</strong></span><span>Estimated retrieval + packing<strong>${r.estimatedMs} ms</strong></span></div><div class="snippets">${r.selected.map(id => `<span class="chip">${name(id)}</span>`).join('') || '<span class="chip">No snippets fit</span>'}</div><p class="missing">${r.missing.length ? 'Required context missing: ' + r.missing.map(name).join(', ') : 'All required fixture snippets included. Task correctness remains untested.'}</p>`;
    $('results').append(card);
  }
  persist();
}
for (const id of ['task', 'budget', 'overhead', 'latency']) $(id).addEventListener('input', render);
$('note').addEventListener('input', persist);
$('reset').addEventListener('click', () => { $('task').value = tasks[0].id; $('budget').value = 1200; $('overhead').value = 100; $('latency').value = 200; render(); });
$('export').addEventListener('click', () => {
  const s = state(); const results = strategies.map(strategy => ({ strategy: strategy.id, ...simulate(s.task, strategy.id, s.budget, s.overhead, s.latency) }));
  const blob = new Blob([JSON.stringify({ label: 'Synthetic educational simulation; not GrapeRoot benchmarks', createdAt: new Date().toISOString(), ...s, results }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'context-decision.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
});
render();
