import React, { Component } from "react";
import Dropzone from "./Dropzone";
import "./css/Upload.css";
import Progress from "./Progress";

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            uploading: false,
            uploadProgress: {},
            successfullUploaded: false,
        };

        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.renderActions = this.renderActions.bind(this);
    }

    onFilesAdded(files) {
        this.setState(prevState => ({
            files: prevState.files.concat(files)
        }));
    }

    async uploadFiles() {
        this.setState({ uploadProgress: {}, uploading: true });
        const promises = [];
        this.state.files.forEach(file => {
            promises.push(this.sendRequest(file));
        });
        try {
            await Promise.all(promises);

            this.setState({ successfullUploaded: true, uploading: false });
        } catch (e) {
            this.setState({ successfullUploaded: false, uploading: false });
        }
    }

    sendRequest(file) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            req.upload.addEventListener("progress", event => {
                if (event.lengthComputable) {
                    const copy = { ...this.state.uploadProgress };
                    copy[file.name] = {
                        state: "pending",
                        percentage: (event.loaded / event.total) * 100
                    };
                    this.setState({ uploadProgress: copy });
                }
            });

            req.upload.addEventListener("load", event => {
                const copy = { ...this.state.uploadProgress };
                copy[file.name] = { state: "done", percentage: 100 };
                this.setState({ uploadProgress: copy });
                resolve(req.response);
            });

            req.upload.addEventListener("error", event => {
                const copy = { ...this.state.uploadProgress };
                copy[file.name] = { state: "error", percentage: 0 };
                this.setState({ uploadProgress: copy });
                reject(req.response);
            });

            const formData = new FormData();
            formData.append("file", file, file.name);

            req.onreadystatechange = function() {
                if (req.readyState === 4) {
                    this.updateCaption(JSON.parse(req.response));
                }
            }.bind(this);
	    req.open("POST", "http://EC2Co-EcsEl-13MXYMDBCZ6GO-461702766.eu-west-2.elb.amazonaws.com:8090/recognize", true);
            req.send(formData);
        });
    }

    updateCaption = (responseVar) => {
        var handleToUpdate = this.props.updateCaptionContent;
        handleToUpdate(responseVar.filename, JSON.stringify(responseVar.labels));
    }

    renderProgress(file) {
        const uploadProgress = this.state.uploadProgress[file.name];
        if (this.state.uploading || this.state.successfullUploaded) {
            return (
                    <div className="ProgressWrapper">
                    <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
                    <img
                    className="CheckIcon"
                    alt="done"
                    src="./images/baseline-check_circle_outline-24px.svg"
                    style={{
                        opacity:
                        uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
                    }}
                    />
                    </div>
            );
        }
    }

    renderActions() {
        if (this.state.successfullUploaded) {
            return (
                    <button
                    onClick={() =>
                             this.setState({ files: [], successfullUploaded: false })
                        }
                    className="btn btn-danger btn-shadow px-3 my-2 ml-0 ml-sm-1 text-left">
                    Clear
                    </button>
            );
        } else {
            return (
                    <button
                    disabled={this.state.files.length < 0 || this.state.uploading}
                    onClick={this.uploadFiles}
                    className="btn btn-success btn-shadow px-3 my-2 ml-0 text-left">
                    Upload
                    </button>
            );
        }
    }

    render() {
        return (
                <div className="Upload">
                <div className="Content">
                <div>
                <Dropzone
                onFilesAdded={this.onFilesAdded}
                disabled={this.state.uploading || this.state.successfullUploaded}
                />
                </div>
                <div className="Files">
                {this.state.files.map(file => {
                    return (
                            <div key={file.name} className="Row">
                            <span className="Filename">{file.name}</span>
                            {this.renderProgress(file)}
                        </div>
                    );
                })}
                </div>
                </div>
                <div className="Actions">{this.renderActions()}</div>
                </div>
        );
    }
}

export default Upload;
