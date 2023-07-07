import Canvas from '@/components/canvas'
import ColorPanel from '@/components/color-panel'
import TitleBar from '@/components/title-bar'
import EditPanel from './components/edit-panel'

function App() {
  return (
    <main className='window'>
      <TitleBar />
      <EditPanel />
      <ColorPanel />
      <Canvas />
    </main>
  )
}

export default App
