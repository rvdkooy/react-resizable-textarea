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

    render() {
        return (<div>
                    <ResizableTextArea value={ this.state.value } onChange={ this._onChange } />
                </div>);
    }
}




ReactDom.render(<Wrapper />, document.getElementById('maincontainer'));