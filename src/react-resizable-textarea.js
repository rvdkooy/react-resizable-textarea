import React, { Component, PropTypes } from 'react';

class ResizableTextArea extends Component {
    constructor(props) {
        super(props);

        this._lastY = 0;
        this._lastX = 0;
        this._textAreaHeight = 0;
        this._textAreaWidth = 0;

        this._onEnableDrag = this._onEnableDrag.bind(this);
        this._onDisableDrag = this._onDisableDrag.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
    }

    componentDidMount() {
        this._dragger.addEventListener('mousedown', this._onEnableDrag);
    }

    componentWillUnmount() {
        this._dragger.removeEventListener('mousedown', this._onEnableDrag);
        this._removeEventListeners();
    }

    getTextarea() {
        return this._textArea;
    }

    _onEnableDrag(e) {
        document.addEventListener('mousemove', this._onMouseMove);
        document.addEventListener('mouseup', this._onDisableDrag);

        this._prevTextAreaStyleBackgroundColor = this._textArea.style.backgroundColor;
        this._textArea.style.backgroundColor = 'transparent';

        this._lastY = e.clientY;
        this._lastX = e.clientX;
        this._textAreaHeight = this._textArea.offsetHeight;
        this._textAreaWidth = this._textArea.offsetWidth;

        // this prevents scrolling while dragging the textarea
        e.preventDefault();
    }

    _onDisableDrag() {
        this._removeEventListeners();

        this._textArea.style.backgroundColor = this._prevTextAreaStyleBackgroundColor;
        // remove selection, which can be a site effect when hovering over the text
        window.getSelection().removeAllRanges();
    }

    _removeEventListeners() {
        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('mouseup', this._onDisableDrag);
        if (this._scrollableContainer) {
            this._scrollableContainer.removeEventListener('mousedown', this._onPreventMouseDownOnScrollableParent);
        }
    }

    _onMouseMove(e) {
        if (this.props.directions.indexOf('y') !== -1) {
            const yMovement = e.clientY - this._lastY;
            this._textAreaHeight = Math.max(this._textAreaHeight + yMovement, 30);
            this._textArea.style.height = this._textAreaHeight + 'px';
        }

        if (this.props.directions.indexOf('x') !== -1) {
            const xMovement = e.clientX - this._lastX;
            this._textAreaWidth = Math.max(this._textAreaWidth + xMovement, 100);
            this._textArea.style.width = this._textAreaWidth + 'px';
        }

        this._lastX = e.clientX;
        this._lastY = e.clientY;
    }

    render() {
        const props = {};

        Object.keys(this.props).forEach((k) => {
            props[k] = this.props[k];
        });

        props.className = `resizable-textarea ${this.props.className}`;
        props.ref = t => this._textArea = t;

        delete props.directions;

        const draggerClassNames = `resizable-textarea-dragger direction-${this.props.directions}`;

        return (
            React.createElement('div', { className: 'resizable-textarea-container', ref: c => this._container = c },
                React.createElement('textarea', props),
                React.createElement('div', { className: draggerClassNames, ref: d => this._dragger = d })
            ));
    }
}

ResizableTextArea.propTypes = {
    directions: PropTypes.string,
    className: PropTypes.string
};

ResizableTextArea.defaultProps = {
    directions: 'y',
    className: ''
};

export default ResizableTextArea;

