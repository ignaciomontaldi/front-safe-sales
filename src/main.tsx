import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Header from './components/Header/Header.tsx'
import { TabProvider } from './context/tabContext.tsx'
import { SearchProvider } from './context/searchContext.tsx'
import { LoadingProvider } from './context/loadingContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
      <TabProvider>
        <SearchProvider>
          <Header />
          <App />
        </SearchProvider>
      </TabProvider>
    </LoadingProvider>
  </StrictMode>
)
