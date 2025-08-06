import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
import { ThemeProvider } from './pages/dark-mode/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Provider>
)
