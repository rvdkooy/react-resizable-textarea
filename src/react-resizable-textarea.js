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
        this._autoSizeTextarea = this._autoSizeTextarea.bind(this);
    }

    componentDidMount() {
        if (this.props.fitOnMount) {
            this._autoSizeTextarea();
        }

        this._dragger.addEventListener('mousedown', this._onEnableDrag);
    }

    componentWillUnmount() {
        this._dragger.removeEventListener('mousedown', this._onEnableDrag);
        this._removeEventListeners();
    }

    getTextarea() {
        return this._textArea;
    }

    _autoSizeTextarea() {
        const lastOverflowY = this._textArea.style.overflowY;
        const width = Math.max(this._textArea.offsetWidth, this.props.minWidth);

        this._textArea.style.width = width + 'px';
        this._textArea.style.overflowY = 'hidden';

        const textAreaCS = window.getComputedStyle(this._textArea);
        const topBorderWidth = parseInt(textAreaCS.getPropertyValue('border-top-width'), 10);
        const bottomBorderWidth = parseInt(textAreaCS.getPropertyValue('border-bottom-width'), 10);

        let height = topBorderWidth + bottomBorderWidth + this._textArea.scrollHeight;
        height = Math.max(height, this.props.minHeight);

        this._textArea.style.height = height + 'px';
        this._textArea.style.overflowY = lastOverflowY;
    }

    _onEnableDrag(e) {
        document.addEventListener('mousemove', this._onMouseMove);
        document.addEventListener('mouseup', this._onDisableDrag);

        this._lastY = e.clientY;
        this._lastX = e.clientX;
        this._textAreaHeight = this._textArea.offsetHeight;
        this._textAreaWidth = this._textArea.offsetWidth;

        // this prevents scrolling while dragging the textarea
        e.preventDefault();
    }

    _onDisableDrag() {
        this._removeEventListeners();

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
            this._textAreaHeight = Math.max(this._textAreaHeight + yMovement, this.props.minHeight);
            this._textArea.style.height = this._textAreaHeight + 'px';
        }

        if (this.props.directions.indexOf('x') !== -1) {
            const xMovement = e.clientX - this._lastX;
            this._textAreaWidth = Math.max(this._textAreaWidth + xMovement, this.props.minWidth);
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

        if (props.style) {
            props.style.minWidth = props.minWidth;
            props.style.minHeight = props.minHeight;
        } else {
            props.style = {
                minWidth: props.minWidth,
                minHeight: props.minHeight
            };
        }

        delete props.directions;
        delete props.minWidth;
        delete props.minHeight;
        delete props.fitOnMount;

        const draggerClassNames = `resizable-textarea-dragger direction-${this.props.directions}`;

        return (
            React.createElement('div', {
                className: 'resizable-textarea-container',
                ref: c => this._container = c
            },
                React.createElement('textarea', props),
                React.createElement('div', { className: draggerClassNames, ref: d => this._dragger = d })
            ));
    }
}

ResizableTextArea.propTypes = {
    directions: PropTypes.string,
    className: PropTypes.string,
    minWidth: PropTypes.number,
    minHeight: PropTypes.number,
    fitOnMount: PropTypes.bool
};

ResizableTextArea.defaultProps = {
    directions: 'y',
    className: '',
    minWidth: 100,
    minHeight: 30,
    fitOnMount: false
};

export default ResizableTextArea;

