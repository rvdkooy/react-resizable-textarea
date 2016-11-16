import React from 'react';
import TestUtils from 'react-testutils-additions';
import ResizableTextArea from '../src/react-resizable-textarea';

describe('react-resizable-textarea tests', () => {
    let component;

    describe('When rendering the textarea', () => {

        beforeAll(() => {
            component = TestUtils.renderIntoDocument(<ResizableTextArea />);
        });

        it('it should render a textarea', () => {
            const textArea = TestUtils.findOne(component, '.resizable-textarea');
            expect(textArea).toBeDefined();
        });

        it('it should render a dragger', () => {
            const dragger = TestUtils.findOne(component, '.resizable-textarea-dragger');
            expect(dragger).toBeDefined();
        });

        afterAll(() => {
            TestUtils.unmountFromDocument(component);
        });
    });

    describe('When passing in textarea props', () => {

        it('it should map those on the underlying textarea', () => {
            const onChangeMock = jasmine.createSpy('onChangeMock');

            component = TestUtils.renderIntoDocument(<ResizableTextArea onChange={ onChangeMock } value="foo" />);
            const textArea = TestUtils.findOne(component, '.resizable-textarea');
            expect(textArea.value).toBe('foo');

            TestUtils.Simulate.change(textArea, { target: { value: 'bar' } });
            expect(onChangeMock).toHaveBeenCalled();

            TestUtils.unmountFromDocument(component);
        });
    });
});
