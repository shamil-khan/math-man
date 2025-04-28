import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { StyledEngineProvider } from '@mui/material/styles';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <Dashboard />
    </StyledEngineProvider>
  );
};

export default App;
