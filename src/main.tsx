import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router/AppRouter.tsx'
import { seedDemoAccounts } from './utils/seedDemoAccounts.ts'

// Pre-populate demo accounts on first load
seedDemoAccounts()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppRouter />
    </StrictMode>,
)
