import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store,persistor } from './Store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import{ToastContainer} from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App/>
      <ToastContainer limit={1} />

    </PersistGate>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
