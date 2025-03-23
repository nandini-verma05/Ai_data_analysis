

import './App.css'
import CoustomerRoutes from './Components/CoustomerRoutes/CoustomerRoutes'
import ErrorBoundary from './HandleError/ErrorBoundary';


function App() {
  
  return (
  <>
  <ErrorBoundary>
   <CoustomerRoutes />
   </ErrorBoundary>
  </>
  )
}

export default App
