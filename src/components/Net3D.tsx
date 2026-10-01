import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const still = matchMedia('(prefers-reduced-motion: reduce)').matches
const hasWebGL = () => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')) } catch { return false } }

function Graph() {
  const g = useRef<THREE.Group>(null)
  const { pos, col, lp, lc } = useMemo(() => {
    const N = innerWidth < 700 ? 34 : 64, b = new THREE.Color('#2563eb'), e = new THREE.Color('#34d399')
    const P: THREE.Vector3[] = [], col: number[] = [], lp: number[] = [], lc: number[] = []
    for (let i = 0; i < N; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(1.2 + Math.random() * 1.3)
      P.push(v); const c = b.clone().lerp(e, (v.y + 2.5) / 5); col.push(c.r, c.g, c.b)
    }
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) if (P[i].distanceTo(P[j]) < 1.2) {
      lp.push(...P[i].toArray(), ...P[j].toArray())
      const c = b.clone().lerp(e, (P[i].y + P[j].y + 5) / 10); lc.push(c.r, c.g, c.b, c.r, c.g, c.b)
    }
    return { pos: new Float32Array(P.flatMap(p => p.toArray())), col: new Float32Array(col), lp: new Float32Array(lp), lc: new Float32Array(lc) }
  }, [])
  useFrame(({ clock, pointer }) => {
    if (!g.current) return
    g.current.rotation.y = clock.elapsedTime * 0.06 + pointer.x * 0.5
    g.current.rotation.x = -pointer.y * 0.35
  })
  return (
    <group ref={g}>
      <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[pos, 3]} /><bufferAttribute attach="attributes-color" args={[col, 3]} /></bufferGeometry><pointsMaterial size={0.09} vertexColors /></points>
      <lineSegments><bufferGeometry><bufferAttribute attach="attributes-position" args={[lp, 3]} /><bufferAttribute attach="attributes-color" args={[lc, 3]} /></bufferGeometry><lineBasicMaterial vertexColors transparent opacity={0.4} /></lineSegments>
    </group>
  )
}

export default function Net3D() {
  if (!hasWebGL()) return <div className="fb" aria-hidden="true" />
  return (
    <div className="net" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]} frameloop={still ? 'demand' : 'always'} gl={{ alpha: true, antialias: true }}><Graph /></Canvas>
    </div>
  )
}
