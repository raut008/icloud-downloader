import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./Components/Header/Header";
import Loader from "./Components/Loader/Loader";
import LoginForm from "./Components/LoginForm/LoginForm";
import VerificationForm from "./Components/VerificationForm/VerificationForm";
import DownloadButton from "./Components/Button/Button";
import { get } from "./Services/ApiService";
import Progress from "./Components/Progress/Progress";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);

  const [showDownLoadButton, setShowDownLoadButton] = useState(false);
  const [downloadLink, setdownloadLink] = useState("");
  const result = useRef([]);
  const fileIndex = useRef(-1);

  const showOrHideLoader = useCallback((value) => {
    setIsLoading(value);
  }, []);

  const showOrHideOtpForm = useCallback((value) => {
    setShowOtpForm(value);
  }, []);

  function downloadFile(url, fileName) {
    fetch(url, { method: "get" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network error");
        }
        return res.blob();
      })
      .then((res) => {
        const aElement = document.createElement("a");
        aElement.setAttribute("download", fileName);
        const href = URL.createObjectURL(res);
        aElement.href = href;
        //  aElement.setAttribute("target", "_blank");

        aElement.click();

        URL.revokeObjectURL(href);
        updatedProgressStatus(fileIndex.current);

        downloadStart();
      })
      .catch((error) => {
        console.log("error");
        updatedProgressStatus(fileIndex.current);

        downloadStart();
      });
  }

  function downloadStart() {
    fileIndex.current = fileIndex.current + 1;
    if (fileIndex.current < result.current.length) {
      var fileName = result.current[fileIndex.current];

      // 1.pdf_o=Ak7bknu4wedXT1ZjjbBPMa45NkjazFUqZ6PlsLe4NJUW&v=1&x=3&a=CAogQuotGwcOGAKOJpUTHtwcI3Schje9kSILh4v7JTHKNoESbxDliNaahTIY5eWxnIUyIgEAUgS5Yr0rWgRaBLhmaidho01JAd3mZ6VVXRNqFaeNWPzerNmUDTCDzXmluSE51rWr.CloudDocs&p=62&s=EqxsjZFEBIzgPNI4cv4bucC_ieQ
      //var fileName = "https://v3img.voot.com/resizeMedium,w_1090,h_613/jioimage/newcpp/64b25593c9871eccdb9140f4/64b25593c9871eccdb9140f4_1690196816713_aa.jpg";
      var saveName = fileName.substring(fileName.lastIndexOf("/") + 1, fileName.length).split("?")[0];

      console.log(fileName, "===", saveName);
      downloadFile(fileName, saveName);
      // updatedProgressStatus(fileIndex.current);
    }
  }

  const updatedProgressStatus = (i) => {
    const file = i + 1;
    const progressBar = document.getElementById("progressbar");
    const overlay = document.getElementById("progressOverlay");
    const progressAnimation = document.getElementById("file");
    const okbutton = document.getElementById("okbutton");
    console.log({ result: result.current });
    const percentage = Math.ceil((file / result.current.length) * 100);
    console.log({ percentage });
    progressAnimation.value = percentage;
    progressBar.style.display = "block";
    progressBar.innerHTML = `Downloading (${file} of ${result.current.length})`;
    if (file >= result.current.length) {
      progressBar.innerHTML = "Download Completed";
      okbutton.style.display = "block";
      // setTimeout(() => {
      //   progressBar.innerHTML = "";
      //   progressAnimation.value = 0;
      //   overlay.style.display = "none";
      //   reloadBrowser();
      // }, 30000);
    }
  };

  const donwnloadDriveFiles = async () => {
    const data = await get("/iclouddrive");
    result.current = data.result;
    const downloadDataInfoText = data?.downloadDataInfoText;
    console.log({ downloadDataInfoText });
    // result.current = [
    //   "https://v3img.voot.com/resizeMedium,w_1090,h_613/jioimage/newcpp/64b25593c9871eccdb9140f4/64b25593c9871eccdb9140f4_1690196816713_aa.jpg",
    //   "https://v3img.voot.com/resizeMedium,w_1090,h_613/v3Storage/assets/16x9-1719339319698.jpg",
    //   "https://v3img.voot.com/resizeMedium,w_914,h_514/v3…age/assets/vertical-carousel-tv-1719139678070.jpg",
    //   "https://v3img.voot.com/resizeMedium,w_384,h_384/v3Storage/assets/1x1-1717266004222.jpg",
    //   "https://v3img.voot.com/resizeMedium,w_914,h_514/v3Storage/assets/vertical-tv-1719326304918.jpg"
    // ];

    // console.log({ result });
    // let i = 0;
    const progressBar = document.getElementById("progressbar");
    const overlay = document.getElementById("progressOverlay");
    const progressAnimation = document.getElementById("file");
    const datadetails = document.getElementById("datadetails");
    overlay.style.display = "flex";
    datadetails.style.display = "block";
    progressAnimation.style.display = "block";
    progressBar.innerHTML = `Downloading in progress`;
    datadetails.innerHTML = downloadDataInfoText;

    downloadStart();
  };

  const showPrompt = (confirmText) => {
    if (window.confirm(confirmText)) {
      window.location.reload();
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    // setSSEConnection();
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
        <Progress />
        <LoginForm
          showOrHideLoader={showOrHideLoader}
          setShowDownLoadButton={setShowDownLoadButton}
          donwnloadDriveFiles={donwnloadDriveFiles}
          showOrHideOtpForm={showOrHideOtpForm}
        />
        {showOtpForm && <VerificationForm showOrHideLoader={showOrHideLoader} />}
        {/* {showDownLoadButton && <DownloadButton text={"Download Zip"} handleDownload={donwnloadDriveFiles} />}
        {showDownLoadButton && <DownloadButton text={"Reload Page"} handleDownload={reloadBrowser} />} */}
      </div>
    </div>
  );
}

export default App;
