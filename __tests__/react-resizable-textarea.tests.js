import React from 'react';
import ResizableTextArea from '../src/react-resizable-textarea';
import TestUtils from 'react-testutils-additions';

describe('react-resizable-textarea tests', () => {
    var component

    describe('When rendering the textarea',  () => {

        beforeAll(() => {
            component = TestUtils.renderIntoDocument(<ResizableTextArea />);
        });

        it('it should render a textarea', () => {
            var textArea = TestUtils.findOne(component, '.resizable-textarea');
            expect(textArea).toBeDefined();
        });

        it('it should render a dragger', () => {
            var dragger = TestUtils.findOne(component, '.resizable-textarea-dragger');
            expect(dragger).toBeDefined();
        });

        afterAll(() => {
            TestUtils.unmountFromDocument(component);
        });
    });

    describe('When passing in textarea props',  () => {

        it('it should map those on the underlying textarea', () => {
            var onChangeMock = jasmine.createSpy('onChangeMock');
            
            component = TestUtils.renderIntoDocument(<ResizableTextArea onChange={ onChangeMock } value='foo' />);
            var textArea = TestUtils.findOne(component, '.resizable-textarea');
            expect(textArea.value).toBe('foo');

            TestUtils.Simulate.change(textArea, { target: { value: 'bar' } });
            expect(onChangeMock).toHaveBeenCalled();

            TestUtils.unmountFromDocument(component);
        });
    });
});