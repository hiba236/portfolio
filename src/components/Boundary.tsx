import { Component, type ReactNode } from 'react'
export default class Boundary extends Component<{ children: ReactNode }, { err: boolean }> {
  state = { err: false }
  static getDerivedStateFromError() { return { err: true } }
  render() { return this.state.err ? <p role="alert" className="ld">This interactive element could not be displayed.</p> : this.props.children }
}
