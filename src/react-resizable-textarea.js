import React from 'react';

const borderOffset = 2;

class ResizableTextArea extends React.Component {
    constructor(props) {
        super(props);

        this._yStart = 0;
        this._xStart = 0;
        this._lastY = 0;
        this._lastX = 0;
        this._draggerHeight = 0;
        this._containerHeight = 0;
        this._containerWidth = 0;
        this._textAreaHeight = 0;
        this._textAreaWidth = 0;

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
        
        this._prevTextAreaStyleBackground = this._textArea.style.background;
        this._textArea.style.background = "transparent";

        this._yStart = e.clientY;
        this._xStart = e.clientX;
        this._lastY = e.clientY;
        this._lastX = e.clientX;
        this._containerHeight = this._container.offsetHeight;
        this._containerWidth = this._container.offsetWidth;

        this._draggerHeight = this._dragger.offsetHeight;
    }

    _onDisableDrag(e) {
        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('mouseup', this._onDisableDrag);

        this._textArea.style.background = this._prevTextAreaStyleBackground;
    }

    _onMouseMove(e) {
        
        if (e.clientY > this._lastY) {
            var yMovement = (e.clientY - this._lastY);
            var newHeight = (this._containerHeight + yMovement);
            this._containerHeight = (this._containerHeight + yMovement);
            this._textArea.style.height = (this._containerHeight - this._draggerHeight - borderOffset) + "px";
            this._container.style.height = (this._containerHeight) + "px";
          } else if (e.clientY < this._lastY) {
            var yMovement = (this._lastY - e.clientY);
            this._containerHeight = (this._containerHeight - yMovement);
            this._textArea.style.height = (this._containerHeight - this._draggerHeight - borderOffset) + "px";
            this._container.style.height = (this._containerHeight) + "px";
          }
          
          if (e.clientX > this._lastX) {
            var xMovement = (e.clientX - this._lastX);
            this._containerWidth = (this._containerWidth + xMovement);
            this._container.style.width = this._containerWidth + "px";
            this._textArea.style.width = (this._containerWidth - borderOffset) + "px";
          } else if (e.clientX < this._lastX) {
            var xMovement = (this._lastX - e.clientX);
            this._containerWidth = (this._containerWidth - xMovement);
            this._container.style.width = this._containerWidth + "px";
            this._textArea.style.width = (this._containerWidth - borderOffset) + "px";
          }
          
          this._lastX = e.clientX;
          this._lastY = e.clientY;
    }

    render() {
        
        var props = {};

        Object.keys(this.props).forEach(k => {
            props[k] = this.props[k];
        });

        if (props.className) {
            props.className = 'resizable-textarea ' + props.className;
        }

        return (<div className="resizable-textarea-container" ref={ (container) => this._container = container }>
                    <textarea className="resizable-textarea"
                              ref={ (_textArea) => this._textArea = _textArea }
                              { ...props }>
                    </textarea>
                    <div className="resizable-textarea-dragger" ref={ (dragger) => this._dragger = dragger }></div>
                </div>);
    }
}

export default ResizableTextArea;