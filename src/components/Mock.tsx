const s = { fill: 'var(--bl)' }, g = { fill: 'var(--ga)' }, n = { fill: 'var(--ln)' }
export default function Mock({ m }: { m: string }) {
  let body
  if (m === 'dash') body = [[10,50,20,40],[40,30,20,60],[70,60,20,30],[100,20,20,70],[130,40,20,50]].map((a, i) => <rect key={i} x={a[0]} y={a[1]} width={a[2]} height={a[3]} rx={3} {...(i % 2 ? g : s)} />)
  else if (m === 'chat') body = <><rect x="8" y="8" width="90" height="20" rx="8" {...n} /><rect x="60" y="36" width="90" height="20" rx="8" {...s} /><rect x="8" y="64" width="110" height="20" rx="8" {...n} /><rect x="40" y="92" width="80" height="16" rx="8" {...g} /></>
  else if (m === 'line') body = <><polyline points="8,90 40,60 70,72 100,30 130,44 155,14" fill="none" stroke="#2563eb" strokeWidth="3" /><polyline points="8,100 40,88 70,84 100,66 130,70 155,52" fill="none" stroke="#34d399" strokeWidth="3" /></>
  else body = [0, 1, 2, 3].map(i => <g key={i}><circle cx={20 + i * 44} cy={55} r={12} {...(i < 3 ? s : n)} /><text x={20 + i * 44} y={59} textAnchor="middle" fontSize="11" fill="#fff">{i + 1}</text>{i < 3 && <rect x={34 + i * 44} y={53} width={18} height={4} {...g} />}</g>)
  return <div className="mock"><svg viewBox="0 0 170 115" role="img" aria-label="Conceptual UI mockup with fictional data">{body}</svg></div>
}
