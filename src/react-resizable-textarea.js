import React from 'react';

class ResizableTextArea extends React.Component {
    constructor(props) {
        super(props);

        this._yStart = 0;
        this._xStart = 0;
        this._lastY = 0;
        this._lastX = 0;
        this._textareaHeight = 0;
        this._textareaWidth = 0;

        this._onEnableDrag = this._onEnableDrag.bind(this);
        this._onDisableDrag = this._onDisableDrag.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
    }

    componentDidMount() {
        this._dragger.addEventListener('mousedown', this._onEnableDrag);
    }

    componentWillUnmout() {
        this._dragger.removeEventListener('mousedown', this._onEnableDrag);
        this._onDisableDrag();
    }

    _onEnableDrag(e) {
        document.addEventListener('mousemove', this._onMouseMove);
        document.addEventListener('mouseup', this._onDisableDrag);

        this._yStart = e.clientY;
        this._xStart = e.clientX;
        this._lastY = e.clientY;
        this._lastX = e.clientX;
        this._textareaHeight = this._subject.offsetHeight;
        this._textareaWidth = this._subject.offsetWidth;
    }

    _onDisableDrag(e) {
        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('mouseup', this._onDisableDrag);
    }

    _onMouseMove(e) {
        if (e.clientY > this._lastY) {
            var yMovement = (e.clientY - this._lastY);
            var newHeight = (this._textareaHeight + yMovement);
            this._textareaHeight = newHeight;
            this._subject.style.height = newHeight + "px";
          } else if (e.clientY < this._lastY) {
            var yMovement = (this._lastY - e.clientY);
            var newHeight = (this._textareaHeight - yMovement);
            this._textareaHeight = newHeight;
            this._subject.style.height = newHeight + "px";
          }
          
          if (e.clientX > this._lastX) {
            var xMovement = (e.clientX - this._lastX);
            var newWidth = (this._textareaWidth + xMovement);
            this._textareaWidth = newWidth;
            this._subject.style.width = newWidth + "px";
          } else if (e.clientX < this._lastX) {
            var xMovement = (this._lastX - e.clientX);
            var newWidth = (this._textareaWidth - xMovement);
            this._textareaWidth = newWidth;
            this._subject.style.width = newWidth + "px";
          }
          
          this._lastX = e.clientX;
          this._lastY = e.clientY;
    }

    render() {
        return (<div className="resizable-textarea-container">
                    <textarea className="resizable-textarea"
                              ref={ (subject) => this._subject = subject }
                              { ...this.props }>
                    </textarea>
                    <div className="resizable-textarea-dragger" ref={ (dragger) => this._dragger = dragger }></div>
                </div>);
    }
}

export default ResizableTextArea;