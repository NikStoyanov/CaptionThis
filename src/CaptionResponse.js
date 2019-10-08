import React, { Component } from "react";

class CaptionResponse extends Component {
    render() {
        return (
                <div className="card text-center ht-tm-element">
		<div className="card-body">
		<h4 className="card-title">{this.props.name}</h4>
		<img src="images/baseline-cloud_upload-24px.svg" alt="pic" />
		<p className="card-text">{this.props.caption}.</p>
		</div>
		</div>
        );
    }
}

export default CaptionResponse;
