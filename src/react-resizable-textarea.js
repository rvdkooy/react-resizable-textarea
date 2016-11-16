import React, { Component, PropTypes } from 'react';

class ResizableTextArea extends Component {
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
    }

    componentDidMount() {
        this._dragger.addEventListener('mousedown', this._onEnableDrag);
    }

    componentWillUnmount() {
        this._dragger.removeEventListener('mousedown', this._onEnableDrag);
        this._removeEventListeners();
    }

    _onEnableDrag(e) {
        document.addEventListener('mousemove', this._onMouseMove);
        document.addEventListener('mouseup', this._onDisableDrag);

        this._prevTextAreaStyleBackgroundColor = this._textArea.style.backgroundColor;
        this._textArea.style.backgroundColor = 'transparent';

        this._lastY = e.clientY;
        this._lastX = e.clientX;
        this._containerHeight = this._container.offsetHeight;
        this._containerWidth = this._container.offsetWidth;
        this._draggerHeight = this._dragger.offsetHeight;

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
            this._containerHeight = (this._containerHeight + yMovement);
            this._textArea.style.height =
                (this._containerHeight - this._draggerHeight - this.props.borderOffset) + 'px';
            this._container.style.height = (this._containerHeight) + 'px';
        }

        if (this.props.directions.indexOf('x') !== -1) {
            const xMovement = e.clientX - this._lastX;
            this._containerWidth = (this._containerWidth + xMovement);
            this._container.style.width = this._containerWidth + 'px';
            this._textArea.style.width = (this._containerWidth - this.props.borderOffset) + 'px';
        }

        this._lastX = e.clientX;
        this._lastY = e.clientY;
    }

    render() {
        const props = {};

        Object.keys(this.props).forEach((k) => {
            props[k] = this.props[k];
        });

        if (props.className) {
            props.className = 'resizable-textarea ' + props.className;
        } else {
            props.className = 'resizable-textarea';
        }
        props.ref = t => this._textArea = t;

        delete props.directions;
        delete props.borderOffset;

        return (
            React.createElement('div', { className: 'resizable-textarea-container', ref: c => this._container = c },
                React.createElement('textarea', props),
                React.createElement('div', { className: 'resizable-textarea-dragger', ref: d => this._dragger = d })
            ));
    }
}

ResizableTextArea.propTypes = {
    directions: PropTypes.string,
    borderOffset: PropTypes.number
};

ResizableTextArea.defaultProps = {
    directions: 'y',
    borderOffset: 2
};

export default ResizableTextArea;
