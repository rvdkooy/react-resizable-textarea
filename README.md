[![Build Status](https://travis-ci.org/rvdkooy/react-resizable-textarea.svg?branch=master)](https://travis-ci.org/rvdkooy/react-resizable-textarea)

# react-resizable-textarea
With this ReactJs component you can render textarea's that are resizable in IE, just like in Chrome and Firefox


## Usage:

``` javascript

import ResizableTextArea from 'react-resizable-textarea';

<ResizableTextArea value={ 'some text' } onChange={ (e) => window.alert(e.target.value) } />

```

## Optional props

``` javascript
<ResizableTextArea
	directions="x|y|xy" // string - Resizable directions
	fitOnMount // boolean - Auto size the textarea on mount
	minWidth={n} // number - Minimum width in px
	minHeight={n} // number - Minimum height in px
/>
````

## Development

```
npm install // installs all dependencies
npm run dev-server // starts webserver, runs webpack to create demo bundle and opens a browser

```