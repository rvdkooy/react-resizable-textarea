import React from 'react';
import TestUtils from 'react-testutils-additions';
import ResizableTextArea from '../src/react-resizable-textarea';

describe('react-resizable-textarea tests', () => {
    let component;

    describe('When rendering the textarea', () => {

        beforeAll(() => {
            component = TestUtils.renderIntoDocument(<ResizableTextArea defaultValue="foo" />);
        });

        it('it should render a textarea', () => {
            const textArea = TestUtils.findOne(component, '.resizable-textarea');
            expect(textArea).toBeDefined();
            expect(textArea.innerHTML).toBe('foo');
        });

        it('it should render a dragger', () => {
            const dragger = TestUtils.findOne(component, '.resizable-textarea-dragger');
            expect(dragger).toBeDefined();
        });

        it('it should be able to access the underlying textarea', () => {
            const textarea = component.getTextarea();
            expect(textarea.innerHTML).toBe('foo');
        });
    });

    describe('When passing in textarea props', () => {

        it('it should map those on the underlying textarea', () => {
            const onChangeMock = jasmine.createSpy('onChangeMock');

            component = TestUtils.renderIntoDocument(
                <ResizableTextArea onChange={ onChangeMock }
                    value="foo"
                    rows={3} />
            );
            const textArea = TestUtils.findOne(component, '.resizable-textarea');
            expect(textArea.value).toBe('foo');
            expect(textArea.rows).toBe(3);

            TestUtils.Simulate.change(textArea, { target: { value: 'bar' } });
            expect(onChangeMock).toHaveBeenCalled();
        });
    });

    describe('When specifying minimum dimensions', () => {
        it('it should render them as inline styles in px', () => {
            component = TestUtils.renderIntoDocument(
                <ResizableTextArea defaultValue="a"
                    minWidth={111}
                    minHeight={222} />
            );
            const textArea = TestUtils.findOne(component, '.resizable-textarea');
            expect(textArea.style.minWidth).toBe('111px');
            expect(textArea.style.minHeight).toBe('222px');
        });
    });

    afterAll(() => {
        TestUtils.unmountFromDocument(component);
    });
});
