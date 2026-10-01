import { useState, type FormEvent } from 'react'
import { MAIL } from '../data'
export default function Contact() {
  const [msg, setMsg] = useState('')
  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    location.href = `mailto:${MAIL}?subject=${encodeURIComponent('Portfolio message from ' + f.get('n'))}&body=${encodeURIComponent(f.get('m') + '\n\nReply to: ' + f.get('e'))}`
    setMsg('Your email app should open with this message. No backend is configured, so nothing is sent from this page.')
  }
  return (
    <form onSubmit={send}>
      <div><label htmlFor="n">Name</label><input id="n" name="n" required /></div>
      <div><label htmlFor="e">Email</label><input id="e" name="e" type="email" required /></div>
      <div><label htmlFor="m">Message</label><textarea id="m" name="m" rows={4} required /></div>
      <button className="btn" type="submit">Send Message</button>
      <p role="status">{msg}</p>
    </form>
  )
}
