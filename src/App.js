import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import {createMuiTheme, ThemeProvider} from '@material-ui/core';

const theme= createMuiTheme({
  palette:{
    primary:{
      main:'#a2cf6e'
    }
  }
})
function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Notes />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
      </Switch>
    </Router>
    </ThemeProvider>
    </>
  );
}

export default App;
