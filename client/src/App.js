import {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Homepage from './components/homepage';
import Signuppage from './components/signuppage';
import Signinpage from './components/signinpage';
import Navbar from './components/navbar';
import Resetpasspage from './components/resetpasspage';
import { fetchposts } from './actions/postactions';
import { useDispatch } from 'react-redux';
import  resetpassword from './components/resetpassword';
import OTPsubmit from './components/otpsubmit';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchposts());
}, [dispatch])
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Homepage}/>
        <Route path="/signup" exact component={Signuppage}/>
        <Route path="/signin" exact component={Signinpage}/>
        <Route path="/reset" exact component={Resetpasspage}/>
        <Route path="/reset-password" exact component={resetpassword}/>
        <Route path="/OTP-submit" exact component={OTPsubmit}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
