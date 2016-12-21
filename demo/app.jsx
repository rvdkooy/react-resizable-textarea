import ReactDom from 'react-dom';
import React from 'react';
import ResizableTextArea from '../dist/react-resizable-textarea.js';

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consectetur a ' +
                   'eros nec tempus. Morbi aliquam et neque at lobortis. Donec consectetur risus quis ' +
                   'lorem tristique, convallis tincidunt est mollis. In suscipit a enim nec tristique. ' +
                   'Nulla fermentum nisi et eleifend imperdiet. Morbi sed arcu leo. Nullam quis cursus ante. ' +
                   'Maecenas tristique lacus ut sollicitudin condimentum. Nulla facilisi.';

class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            value: loremIpsum
        };
    }

    _onChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        return (<div>
                    <div>
                        <h1>Default:</h1>
                        <p><code>{ '<ResizableTextArea />' }</code></p>
                        <ResizableTextArea value={ this.state.value }
                            onChange={ this._onChange } />
                    </div>
                    <div>
                        <h1>In a Container:</h1>
                        <p><code>{ '<ResizableTextArea />' }</code></p>
                        <div id="parentcontainer"
                            style={ { width: '300px', height: '300px', border: '1px solid blue', overflow: 'auto' } }>
                            <p>{ loremIpsum }</p>
                            <ResizableTextArea value={ this.state.value }
                                onChange={ this._onChange } />
                            <p>{ loremIpsum }</p>
                        </div>
                    </div>
                    <div>
                        <h1>Resizing Both directions:</h1>
                        <p><code>{ '<ResizableTextArea directions="xy" />' }</code></p>
                        <ResizableTextArea value={ this.state.value }
                            onChange={ this._onChange }
                            directions="xy" />
                    </div>
                    <div>
                        <h1>Auto size on mount:</h1>
                        <p><code>{ '<ResizableTextArea rows="auto" />' }</code></p>
                        <ResizableTextArea value={ this.state.value }
                            onChange={ this._onChange }
                            rows="auto" />
                    </div>
                    <div>
                        <h1>Minimum dimensions:</h1>
                        <p><code>{ '<ResizableTextArea minWidth={250} minHeight={150} />' }</code></p>
                        <ResizableTextArea value={ this.state.value }
                            onChange={ this._onChange }
                            minWidth={250}
                            minHeight={150}
                            directions="xy" />
                    </div>
                </div>);
    }
}

ReactDom.render(<Wrapper />, document.getElementById('maincontainer'));
