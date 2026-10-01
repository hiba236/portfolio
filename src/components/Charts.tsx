import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
const bar = [{ n: 'React', v: 4 }, { n: 'REST APIs', v: 4 }, { n: 'TypeScript', v: 4 }, { n: 'WebSockets', v: 1 }, { n: 'Charting', v: 1 }, { n: 'Three.js', v: 1 }]
const dn = [{ n: 'UI architecture', v: 30 }, { n: 'Data visualization', v: 25 }, { n: 'Real-time', v: 15 }, { n: 'AI workflows', v: 15 }, { n: '3D', v: 15 }]
const cl = ['#2563eb', '#0f9f8f', '#34d399', '#163e72', '#6b9bff']
const tip = { contentStyle: { background: 'var(--card)', border: '1px solid var(--ln)', color: 'var(--tx)' }, itemStyle: { color: 'var(--tx)' } }
export default function Charts() {
  return (
    <div className="viz">
      <div className="ch">
        <h3>Technologies across project areas</h3><small>Illustrative, not production metrics.</small>
        <div role="img" aria-label="Bar chart, illustrative: React, REST APIs and TypeScript span four project areas; WebSockets, charting and Three.js one each." style={{ height: 250 }}>
          <ResponsiveContainer>
            <BarChart data={bar} layout="vertical" margin={{ left: 10, right: 20 }}>
              <XAxis type="number" domain={[0, 4]} hide />
              <YAxis type="category" dataKey="n" width={84} tick={{ fill: 'var(--mu)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip {...tip} formatter={(v) => [`${v} of 4 project areas (illustrative)`, '']} separator="" />
              <Bar dataKey="v" radius={4} isAnimationActive={false}>{bar.map((d, i) => <Cell key={i} fill={d.v > 2 ? '#2563eb' : '#0f9f8f'} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="ch">
        <h3>Areas of front-end expertise</h3><small>Conceptual split, not measured data.</small>
        <div role="img" aria-label="Donut chart, conceptual: UI architecture 30 percent, data visualization 25, real-time 15, AI workflows 15, 3D 15." style={{ height: 250 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={dn} dataKey="v" nameKey="n" innerRadius={55} outerRadius={88} isAnimationActive={false}>{dn.map((_, i) => <Cell key={i} fill={cl[i]} />)}</Pie>
              <Tooltip {...tip} formatter={(v) => [`${v}% (conceptual)`, '']} separator="" />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
