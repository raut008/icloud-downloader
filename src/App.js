import { useCallback, useState } from "react";
import Header from "./Components/Header/Header";
import Loader from "./Components/Loader/Loader";
import LoginForm from "./Components/LoginForm/LoginForm";
import VerificationForm from "./Components/VerificationForm/VerificationForm";


function App() {
  const [isLoading, setIsLoading] = useState(false);

  const showOrHideLoader = useCallback((value)=>{
    setIsLoading(value);
  },[]);

  return (
    <div className="App">
      <Header/>
      <div className="Layout">
      {isLoading && <Loader/>}
      <LoginForm />
      <VerificationForm showOrHideLoader={showOrHideLoader}/>
      </div>
    </div>
  );
}

export default App;
