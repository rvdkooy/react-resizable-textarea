import ReactDom from 'react-dom';
import React from 'react';
import ResizableTextArea from '../src/react-resizable-textarea';

class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consectetur a eros nec tempus. Morbi aliquam et neque at lobortis. Donec consectetur risus quis lorem tristique, convallis tincidunt est mollis. In suscipit a enim nec tristique. Nulla fermentum nisi et eleifend imperdiet. Morbi sed arcu leo. Nullam quis cursus ante. Maecenas tristique lacus ut sollicitudin condimentum. Nulla facilisi.'
        };
    }

    _onChange(e) {
        this.setState({ value: e.target.value });
    }


//
    render() {
        return (<div>
                    <h1>Default:</h1>
                    <ResizableTextArea value={ this.state.value } onChange={ this._onChange } />
                    <div>
                        <h1>Scroll container:</h1>
                        <div style={ { width: '500px', height: '500px', border: '1px solid blue', overflow: 'auto' } }>
                            <ResizableTextArea value={ this.state.value } onChange={ this._onChange } />
                        </div>

                    </div>
                </div>);
    }
}




ReactDom.render(<Wrapper />, document.getElementById('maincontainer'));