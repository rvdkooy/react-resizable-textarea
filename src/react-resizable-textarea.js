import React from 'react';

class ResizableTextArea extends React.Component {
    constructor(props) {
        super(props);

        this._lastY = 0;
        this._lastX = 0;
        this._draggerHeight = 0;
        this._containerHeight = 0;
        this._containerWidth = 0;

        this._onEnableDrag = this._onEnableDrag.bind(this);
        this._onDisableDrag = this._onDisableDrag.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._borderOffset = 2;
    }

    componentDidMount() {
        this._dragger.addEventListener('mousedown', this._onEnableDrag);
    }

    componentWillUnmount() {
        this._dragger.removeEventListener('mousedown', this._onEnableDrag);
        this._onDisableDrag();
    }

    _onEnableDrag(e) {
        document.addEventListener('mousemove', this._onMouseMove);
        document.addEventListener('mouseup', this._onDisableDrag);
        
        this._prevTextAreaStyleBackground = this._textArea.style.background;
        this._textArea.style.background = "transparent";

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

        // remove selection, which can be a site effect when hovering over the text
        window.getSelection().removeAllRanges();
    }

    _onMouseMove(e) {
        var yMovement = e.clientY - this._lastY;
        this._containerHeight = (this._containerHeight + yMovement);
        this._textArea.style.height = (this._containerHeight - this._draggerHeight - this._borderOffset) + "px";
        this._container.style.height = (this._containerHeight) + "px";

        var xMovement = e.clientX - this._lastX;
        this._containerWidth = (this._containerWidth + xMovement);
        this._container.style.width = this._containerWidth + "px";
        this._textArea.style.width = (this._containerWidth - this._borderOffset) + "px";

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