import React, { Component } from 'react';
import Upload from './Upload'
import CaptionResponse from './CaptionResponse'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
				ImageName: "Pic name",
				ImageCaption: "Upload something..."
		};

		this.updateCaptionContent = this.updateCaptionContent.bind(this);
	}

	updateCaptionContent(newName, newCaption) {
		this.setState({
			ImageName: newName,
      ImageCaption: newCaption
    });
	}

	render () {
		return (
			<div className="ht-main">
				  <div className="navbar-dark text-white">
				    <div className="container">
				      <nav className="navbar px-0 navbar-expand-lg navbar-dark">
				        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
				          <span className="navbar-toggler-icon"></span>
				        </button>
				        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
				          <div className="navbar-nav">
										<a href="app.html" className="p-3 text-decoration-none text-light"><span className="ht-tm-element btn btn-primary">How does it work?</span></a>
				            <a href="https://nikstoyanov.me" className="pl-md-0 p-3 text-light"><span className="ht-tm-element btn btn-primary">About</span></a>
				          </div>
									<a href="https://beerpay.io/NikStoyanov/Inscribe" target="_blank" rel="noopener noreferrer"><img src="https://beerpay.io/NikStoyanov/Inscribe/badge.svg?style=beer-square" alt="beer pay" /></a>
				        </div>
								<a href="https://github.com/nikstoyanov/inscription-ing" className="ht-tm-element btn btn-primary">
            			<span className="fab fa-github mr-2"></span>
									Fork API
								</a> &nbsp;
								<a href="https://github.com/nikstoyanov/inscription-ing" className="ht-tm-element btn btn-primary">
            			<span className="fab fa-github mr-2"></span>
									Fork Frontend
								</a>

							</nav>
				    </div>
				  </div>

				  <div className="jumbotron bg-transparent mb-0 radius-0" >
				  <div className="container ht-tm-container">
					<div className="col-xl-6">
					<h1 className="display-2">Caption image<span className="vim-caret">s</span></h1>

					<img alt="GitHub" src="https://img.shields.io/github/license/nikstoyanov/Inscribe.svg"></img> &nbsp;
					<img alt="Travis CI" src="https://img.shields.io/travis/com/nikstoyanov/Inscribe.svg"></img> &nbsp;

					<div className="lead mb-3 text-mono text-success">Use the API or front end interface (below) to inscribe images by generating a caption.</div>


					<div className="ht-tm-element card border-primary mb-3 text-center">
          <div className="card-body">
            <blockquote className="card-blockquote">
							<p>Run the API with:</p>
              <p>curl https://caption.ninja:8090/recognize -F 'file=@./cute-dog.jpg'</p>
            </blockquote>
          </div>
        </div>

					</div></div></div>

					<div className="jumbotron bg-transparent mb-0 radius-0" >
				  <div className="container ht-tm-container">
				  <div className="row">
						<div className="col-xl-6">
							<div className="card text-center ht-tm-element">
								<div className="card-body">
									<h1 className="display-3">Thou shall caption!</h1>
									<p className="lead">Upload thine pics here.</p>
									<div className="Card">
										<Upload updateCaptionContent={ this.updateCaptionContent }/>
									</div>
								</div>
							</div>

							<div className="ht-tm-codeblock ht-tm-btn-replaceable ht-tm-needs-darkness">
							The backend is written in Go and the frontend in JS using React. The image recognition is done using Tersorflow and Incepion v5.
							The project is run in Docker on AWS. For full explanation see <a href="./howto.html">how it all works</a>.
							</div>

							<div className="text-darkgrey text-mono my-2">
							The project is done for fun and as a learning exercise.
							</div>

					</div>
					<div className="col-xl-5">

					<CaptionResponse name={this.state.ImageName} caption={this.state.ImageCaption}/>

					</div>
					</div>
				</div>
				</div>

				<div className="container py-5">
				  <h1>Acknowledgements</h1>
					<p>
					<a href="https://hackerthemes.com/bootstrap-themes/neon-glow/" title="Bootstrap templates and themes"><img src="https://hackerthemes.com/bootstrap-themes/demo/images/hackerthemes-logo-bright.svg" alt="Bootstrap Templates and Themes" width="188" /></a>
				  </p>
					<p>
						Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0">CC 3.0 BY</a>
					</p>
					<p>
						Upload guide with React: <a href="https://malcoded.com/posts/react-file-upload/">https://malcoded.com/posts/react-file-upload/</a>
					</p>
					<p>
						Tensoflow with Go: <a href="https://github.com/tinrab/go-tensorflow-image-recognition">https://github.com/tinrab/go-tensorflow-image-recognition</a>
					</p>
				</div>
				</div>
		);
	}
}

export default App;
