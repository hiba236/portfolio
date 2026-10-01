import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { JOBS, LI, MAIL, PROJ, SK } from './data'
import Mock from './components/Mock'
import Contact from './components/Contact'
import Boundary from './components/Boundary'

const Net3D = lazy(() => import('./components/Net3D'))
const Charts = lazy(() => import('./components/Charts'))
const Loading = () => <div className="ld" role="status">Loading…</div>
const LINKS = [['about', 'About'], ['projects', 'Projects'], ['data', 'Data Visualization'], ['skills', 'Skills'], ['experience', 'Experience'], ['contact', 'Contact']]

function InView({ children }: { children: ReactNode }) {
  const r = useRef<HTMLDivElement>(null), [on, set] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(e => { if (e[0].isIntersecting) { set(true); o.disconnect() } }, { rootMargin: '200px' })
    o.observe(r.current!); return () => o.disconnect()
  }, [])
  return <div ref={r}>{on ? <Boundary><Suspense fallback={<Loading />}>{children}</Suspense></Boundary> : <Loading />}</div>
}

export default function App() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <header className="top"><div className="w">
        <b>Hiba Ayoub</b>
        <button className="mb" aria-expanded={open} aria-controls="nv" onClick={() => setOpen(!open)}>Menu</button>
        <nav id="nv" className={open ? 'o' : ''} aria-label="Main">{LINKS.map(l => <a key={l[0]} href={'#' + l[0]} onClick={() => setOpen(false)}>{l[1]}</a>)}</nav>
      </div></header>
      <main>
        <section className="hero" style={{ padding: 0 }}>
          <Boundary><Suspense fallback={<div className="fb" aria-hidden="true" />}><Net3D /></Suspense></Boundary>
          <div className="w">
            <h1>Scalable interfaces for complex products.</h1>
            <p>Hiba Ayoub, front-end developer with 6+ years building React and TypeScript applications for SaaS, enterprise and government teams.</p>
            <a className="btn p" href="#projects">View Projects</a>
            <a className="btn" href="/Hiba_Ayoub_Frontend_Developer.pdf" download>Download CV</a>
            <a className="btn" href={LI} target="_blank" rel="noopener">LinkedIn</a>
            <a className="btn" href="#contact">Contact Me</a>
          </div>
        </section>
        <section id="about" className="alt"><div className="w"><h2>About me</h2>
          <p className="lead">I turn complicated workflows into clear interfaces: reusable components, dependable state and API integration, data visualization, AI-enabled features, testing and performance work. I also mentor junior developers and review code.</p></div></section>
        <section id="projects"><div className="w"><h2>Selected projects</h2>
          <p className="lead">Case studies from SaaS, AI, analytics and government work.</p>
          <p className="note">Conceptual UI mockups created for portfolio presentation. No confidential client data is shown.</p>
          {PROJ.map(p => (
            <article className="proj" key={p.t}>
              <div><h3>{p.t}</h3><p className="ctx">{p.x}</p><Mock m={p.m} /><div className="chips">{p.k.map(k => <span key={k}>{k}</span>)}</div></div>
              <dl><dt>Problem</dt><dd>{p.p}</dd><dt>My role</dt><dd>{p.r}</dd><dt>Technical approach</dt><dd>{p.a}</dd><dt>Interface decisions</dt><dd>{p.d}</dd><dt>Key challenge</dt><dd>{p.c}</dd><dt>Outcome</dt><dd>{p.o}</dd></dl>
            </article>))}
        </div></section>
        <section id="data" className="alt"><div className="w"><h2>Interactive data visualization</h2>
          <p className="lead">Built with Recharts. All data below is fictional and for illustration only.</p>
          <InView><Charts /></InView></div></section>
        <section id="skills"><div className="w"><h2>Technical skills</h2>
          <div className="sg" style={{ marginTop: 24 }}>{SK.map(s => <div className="sk" key={s[0]}><h3>{s[0]}</h3>{s[1].split(', ').map(k => <span key={k}>{k}</span>)}</div>)}</div></div></section>
        <section id="experience" className="alt"><div className="w"><h2>Professional experience</h2>
          <div className="tl" style={{ marginTop: 28 }}>{JOBS.map(j => <div className="job" key={j[1]}><h3>{j[0]}</h3><div className="m">{j[1]} · {j[2]}</div><ul>{j[3].map(x => <li key={x}>{x}</li>)}</ul></div>)}</div>
          <div className="two" id="education">
            <div><h3>Education</h3><p>B.Sc. Information and Communication Technology Engineering, Information Technology. Tartous University, 2009–2014.</p></div>
            <div><h3>Languages</h3><p>Arabic (native), English (B2), German (A1).</p></div>
          </div></div></section>
        <section id="contact" className="cta"><div className="w"><h2>Let’s build something useful.</h2>
          <p>Open to international remote opportunities and relocation-supported roles.</p>
          <p><a href={'mailto:' + MAIL}>{MAIL}</a> · <a href={LI} target="_blank" rel="noopener">LinkedIn</a></p>
          <Contact /></div></section>
      </main>
      <footer>© Hiba Ayoub. Built with React, TypeScript, Three.js and Recharts.</footer>
    </>
  )
}
