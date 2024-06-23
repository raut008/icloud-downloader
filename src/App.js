import { useCallback, useState } from "react";
import Header from "./Components/Header/Header";
import Loader from "./Components/Loader/Loader";
import LoginForm from "./Components/LoginForm/LoginForm";
import VerificationForm from "./Components/VerificationForm/VerificationForm";
import DownloadButton from "./Components/Button/Button";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const getFile = async () => {
    try {
      const data = await fetch("http://localhost:3200/download-zip")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.blob();
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = "public.zip"; // Change the filename as needed
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    } catch (error) {}
  };

  const showOrHideLoader = useCallback((value) => {
    setIsLoading(value);
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="Layout">
        {isLoading && <Loader />}
        <LoginForm />
        <VerificationForm showOrHideLoader={showOrHideLoader} />
        <DownloadButton handleDownload={getFile}/>
      </div>
    </div>
  );
}

export default App;
