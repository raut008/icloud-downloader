import { useCallback, useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Loader from "./Components/Loader/Loader";
import LoginForm from "./Components/LoginForm/LoginForm";
import VerificationForm from "./Components/VerificationForm/VerificationForm";
import DownloadButton from "./Components/Button/Button";
import { get } from "./Services/ApiService";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showDownLoadButton, setShowDownLoadButton] = useState(false);
  const [downloadLink, setdownloadLink] = useState("");

  const showOrHideLoader = useCallback((value) => {
    setIsLoading(value);
  }, []);

  const showOrHideOtpForm = useCallback((value) => {
    setShowOtpForm(value);
  }, []);

  const donwnloadDriveFiles = async () => {
    const { result } = await get("/iclouddrive");
    console.log({ result });
    let i = 0;
    const progressBar = document.getElementById("progressbar");
    const interval = setInterval(() => {
      var link = document.createElement("a");
      link.href = result[i];
      console.log(link.href);
      link.click();
      i++;
      progressBar.style.display = "block";
      progressBar.innerHTML = `Downloading (${i} of ${result.length})`;
      if (i >= result.length) {
        clearInterval(interval);
        // progressBar.innerHTML = `Downloading Completed`;
      }
    }, 10000);

    // console.log({ data });
  };

  useEffect(() => {
    const eventSource = new EventSource("/health");

    eventSource.onmessage = function (event) {
      console.log(`Received: ${event.data}`);
      console.log(event);
      if (event.data === "filesdownloaded") {
        showOrHideLoader(false);
        setShowDownLoadButton(true);
        // setdownloadLink(event?.data);
        // donwnloadDriveFiles();
      }
    };
  }, [showOrHideLoader]);

  const getFile = async () => {
    // window.location.href = downloadLink;
    var link = document.createElement("a");
    link.href = downloadLink;
    link.download = "icloudphotos";
    link.click();
    // try {
    //   fetch("/download-zip")
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error("Network response was not ok");
    //       }
    //       return response.blob();
    //     })
    //     .then((blob) => {
    //       const url = window.URL.createObjectURL(blob);
    //       const a = document.createElement("a");
    //       a.style.display = "none";
    //       a.href = url;
    //       a.download = "public.zip"; // Change the filename as needed
    //       document.body.appendChild(a);
    //       a.click();
    //       window.URL.revokeObjectURL(url);
    //     })
    //     .catch((error) => {
    //       console.error("There was a problem with the fetch operation:", error);
    //     });
    // } catch (error) {}
  };

  const reloadBrowser = () => {
    window.location.reload();
  };

  const deletePublicFolder = async () => {
    try {
      const data = await fetch("/delete", {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((result) => {
          return result;
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error.message);
        });
      console.log({ data });
    } catch (error) {}
  };

  return (
    <div className="App">
      <Header />
      <div className="Layout">
        {isLoading && <Loader />}
        <div
          style={{
            textAlign: "center",
            background: "rgb(239 236 34)",
            color: "#000",
            padding: "1rem",
            borderRadius: "1rem",
            fontSize: "1.6em",
            display: "none",
          }}
          id="progressbar"
        ></div>
        <LoginForm showOrHideLoader={showOrHideLoader} showOrHideOtpForm={showOrHideOtpForm} />

        {showOtpForm && <VerificationForm showOrHideLoader={showOrHideLoader} />}
        {showDownLoadButton && <DownloadButton text={"Download Zip"} handleDownload={donwnloadDriveFiles} />}
        {showDownLoadButton && <DownloadButton text={"Reload Page"} handleDownload={reloadBrowser} />}
      </div>
    </div>
  );
}

export default App;
