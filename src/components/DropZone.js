import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const styles = {
  container: {
    transform: "translateY(-100%)",
    "& p": {
      color: "red",
      textAlign: "center",
    },
  },
  dropContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    width: "800px",
    height: "100px",
    border: "4px dashed #4aa1f3",
  },
  dropMessage: {
    textAlign: "center",
    color: "#4aa1f3",
    fontFamily: "Arial",
    fontSize: "20px",
  },
  fileDisplayContainer: {
    position: "fixed",
    width: "805px",
  },
  fileStatusBar: {
    width: "100%",
    verticalAlign: "top",
    marginTop: "10px",
    marginBottom: "20px",
    position: "relative",
    lineHeight: "50px",
    height: "50px",
    "& div": {
      overflow: "hidden",
    },
  },
  fileType: {
    display: "inline-block!important",
    position: "absolute",
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
};

const useStyles = makeStyles(styles);

const DropZone = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const classes = useStyles();

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
  return (
    <div>
      <div
        className={classes.dropContainer}
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
      >
        <div className={classes.dropMessage}>
          <div>
            <FontAwesomeIcon icon={faDownload} size={"sm"} />
          </div>
          Drag & Drop files here or click to upload
        </div>
      </div>

      <div className={classes.fileDisplayContainer}>
        {validFiles.map((data, i) => (
          <div className={classes.fileStatusBar} key={i}>
            <div>
              <div className={classes.fileTypeLogo} />
              <div className={classes.fileType}>{fileType(data.name)}</div>
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
