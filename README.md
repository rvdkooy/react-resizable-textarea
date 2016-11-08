# react-resizable-textarea
With this ReactJs component you can render textarea's that are resizable in IE, just like in Chrome and Firefox


example:

``` javascript

import ResizableTextArea from 'react-resizable-textarea';

<ResizableTextArea value={ 'some text' } onChange={ (e) => window.alert(e.target.value) } />

```

### Development


```
npm install

npm run devserver

npm test
```
