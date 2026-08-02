export function AdminStatGrid({
  stats,
}: {
  stats: { label: string; value: string | number; icon: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="admin-stat-card">
          <div className="text-2xl">{s.icon}</div>
          <div className="mt-2 text-2xl font-black text-slate-900">{s.value}</div>
          <div className="text-xs text-slate-500">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
