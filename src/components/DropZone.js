import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import server from "../conf/server";

const styles = {
  dropContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    minHeight: "100px",
    border: "4px dashed #4aa1f3",
    cursor: "pointer",
  },
  dropMessage: {
    textAlign: "center",
    color: "#4aa1f3",
    fontFamily: "Arial",
    fontSize: "20px",
  },
  fileDisplayContainer: {
    // position: "fixed",
    // width: "805px",
  },
  fileStatusBar: {
    width: "100%",
    verticalAlign: "top",
    marginTop: "4px",
    marginBottom: "4px",
    position: "relative",
    lineHeight: "24px",
    height: "24px",
    "& div": {
      overflow: "hidden",
    },
  },
  fileType: {
    display: "inline-block",
    fontSize: "12px",
    fontWeight: "700",
    lineHeight: "13px",
    marginTop: "25px",
    padding: "0 4px",
    borderRadius: "2px",
    boxShadow: "1px 1px 2px #abc",
    color: "#fff",
    background: "#0080c8",
    textTransform: "uppercase",
  },
  fileName: {
    display: "inline-block",
    verticalAlign: "top",
    marginLeft: "50px",
    color: "#4aa1f3",
  },

  fileError: {
    display: "inline-block",
    verticalAlign: "top",
    marginLeft: "50px",
    color: "#9aa9bb",
  },

  fileErrorMessage: {
    color: "red",
  },

  fileTypeLogo: {
    width: "50px",
    height: "50px",
    backgroundSize: "100%",
    position: "absolute",
  },

  fileSize: {
    display: "inline-block",
    verticalAlign: "top",
    marginLeft: "10px",
    marginRight: "5px",
    color: "#444242",
    fontWeight: "700",
    fontSize: "14px",
  },

  fileRemove: {
    position: "absolute",
    top: "20px",
    right: "10px",
    lineHeight: "15px",
    cursor: "pointer",
    color: "red",
    marginRight: "-10px",
  },
  modal: {
    zIndex: 999,
    display: "none",
    overflow: "hidden",
    "& overlay": {
      width: "100%",
      height: "100vh",
      background: "rgba(0,0,0,.66)",
      position: "absolute",
      top: 0,
      left: 0,
    },
    "& modalImage": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      overflow: "hidden",
      objectFit: "cover",
      width: "100%",
      height: "300px",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  },
  uploadModal: {
    zIndex: 999,
    display: "none",
    overflow: "hidden",
    "& overlay": {
      width: "100%",
      height: "100vh",
      background: "rgba(0,0,0,.66)",
      position: "absolute",
      top: 0,
      left: 0,
    },
  },

  progressContainer: {
    background: "white",
    width: "500px",
    height: "300px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    overflow: "hidden",
    border: "1px solid gray",
    "& span": {
      display: "flex",
      justifyContent: "center",
      paddingTop: "20px",
      fontSize: "20px",
    },
  },

  progress: {
    width: "90%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#efefef",
    height: "20px",
    borderRadius: "5px",
  },

  progressBar: {
    position: "absolute",
    backgroundColor: "#4aa1f3",
    height: "20px",
    borderRadius: "5px",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },

  error: {
    color: "red",
  },
  close: {
    position: "absolute",
    top: "15px",
    right: "35px",
    color: "#ccc",
    fontSize: "30px",
    fontWeight: "bold",
    transition: "0.3s",
  },
  fileInput: {
    display: "none",
  },
  fileUploadBtn: {
    color: "white",
    textTransform: "uppercase",
    outline: "none",
    backgroundColor: "#4aa1f3",
    fontWeight: "bold",
    padding: "8px 15px",
    marginBottom: "5px",
    cursor: "pointer",
  },
};

const useStyles = makeStyles(styles);

const DropZone = (props) => {
  const dropContainerWidth = props.width;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const classes = useStyles();
  const fileInputRef = useRef();
  const uploadModalRef = useRef();
  const uploadRef = useRef();
  const progressRef = useRef();

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    let filteredArray = selectedFiles.reduce((file, current) => {
      const x = file.find((item) => item.name === current.name);
      if (!x) {
        return file.concat([current]);
      } else {
        return file;
      }
    }, []);
    setValidFiles([...filteredArray]);
  }, [selectedFiles]);

  const fileSize = (size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  const fileType = (fileName) => {
    return (
      fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
      fileName
    );
  };
  const removeFile = (name) => {
    // find the index of the item
    // remove the item from array

    const validFileIndex = validFiles.findIndex((e) => e.name === name);
    validFiles.splice(validFileIndex, 1);
    // update validFiles array
    setValidFiles([...validFiles]);
    const selectedFileIndex = selectedFiles.findIndex((e) => e.name === name);
    selectedFiles.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setSelectedFiles([...selectedFiles]);
    const unsupportedFileIndex = unsupportedFiles.findIndex(
      (e) => e.name === name
    );
    if (unsupportedFileIndex !== -1) {
      unsupportedFiles.splice(unsupportedFileIndex, 1);
      // update unsupportedFiles array
      setUnsupportedFiles([...unsupportedFiles]);
    }
  };
  const validateFile = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/x-icon",
    ];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };
  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        // add to an array so we can display the name of file
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
      } else {
        // add a new property called invalid
        files[i]["invalid"] = true;
        // add to the same array so we can display the name of the file
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        // set error message
        setErrorMessage("File type not permitted");
        setUnsupportedFiles((prevArray) => [...prevArray, files[i]]);
      }
    }
  };
  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };
  const fileInputClicked = () => {
    fileInputRef.current.click();
  };
  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };
  const uploadFiles = () => {
    const email = "snoronha@gmail.com"; // only for TESTING
    uploadModalRef.current.style.display = "block";
    uploadRef.current.innerHTML = "File(s) Uploading...";
    const formData = new FormData();
    for (let i = 0; i < validFiles.length; i++) {
      formData.append("files", validFiles[i]);
    }
    fetch(
      `${server.domain}/api/question/attachment/email/${email.toLowerCase()}`,
      {
        method: "post",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log("responseProblem: ", json);
      })
      .catch((error) => {
        console.log(error);
        // If error, display a message on the upload modal
        uploadRef.current.innerHTML = `<span class="error">Error Uploading File(s)</span>`;
        // set progress bar background color to red
        progressRef.current.style.backgroundColor = "red";
      })
      .finally(() => {});
    /*
      axios.post("https://api.imgbb.com/1/upload", formData, {}).catch(() => {
        // If error, display a message on the upload modal
        uploadRef.current.innerHTML = `<span class="error">Error Uploading File(s)</span>`;
        // set progress bar background color to red
        progressRef.current.style.backgroundColor = "red";
      });
      */
  };
  const openImageModal = (file) => {};
  const closeUploadModal = () => {
    uploadModalRef.current.style.display = "none";
  };
  return (
    <div>
      <div className={classes.uploadModal} ref={uploadModalRef}>
        <div className="overlay"></div>
        <div className={classes.close} onClick={() => closeUploadModal()}>
          x
        </div>
        <div className={classes.progressContainer}>
          <span ref={uploadRef}></span>
          <div className={classes.progress}>
            <div className={classes.progressBar} ref={progressRef}></div>
          </div>
        </div>
      </div>
      {unsupportedFiles.length === 0 && validFiles.length ? (
        <button className={classes.fileUploadBtn} onClick={() => uploadFiles()}>
          Upload Files
        </button>
      ) : (
        ""
      )}
      {unsupportedFiles.length ? (
        <p>Please remove all unsupported files.</p>
      ) : (
        ""
      )}
      <div
        className={classes.dropContainer}
        style={{ width: dropContainerWidth }}
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        onClick={fileInputClicked}
      >
        <div className={classes.dropMessage}>
          <input
            ref={fileInputRef}
            className={classes.fileInput}
            type="file"
            multiple
            onChange={filesSelected}
          />
          <div>
            <FontAwesomeIcon icon={faDownload} size={"sm"} />
          </div>
          Drag & Drop files here or click to upload
        </div>
      </div>
      <div
        className={classes.fileDisplayContainer}
        style={{ width: dropContainerWidth }}
      >
        {validFiles.map((data, i) => (
          <div className={classes.fileStatusBar} key={i}>
            <div
              onClick={
                !data.invalid
                  ? () => openImageModal(data)
                  : () => removeFile(data.name)
              }
            >
              <span className={classes.fileType}>{fileType(data.name)}</span>
              <span className={`file-name ${data.invalid ? "file-error" : ""}`}>
                {data.name}
              </span>
              <span className="file-size">({fileSize(data.size)})</span>{" "}
              {data.invalid && (
                <span className="file-error-message">({errorMessage})</span>
              )}
            </div>
            <div
              className={classes.fileRemove}
              onClick={() => removeFile(data.name)}
            >
              X
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DropZone;
