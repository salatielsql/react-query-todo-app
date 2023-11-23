import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { worker } from './api/mock.ts'
import './index.css'

worker.start()

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
