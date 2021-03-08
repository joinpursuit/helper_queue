import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";
import ResourceListIndex from '../ResourceListIndex';

const json = {
    "header": "Test Header",
    "list": [
        {
            "name": "test1",
            "url": "www.test1.com"
        }, {
            "name": "test2",
            "url": "www.test2.com"
        }]
    }

it('should always render the header', () => {
    render(<ResourceListIndex header={json.header} list={json.list}/>);
    expect(screen.getByTestId("resourceListHeader")).toHaveTextContent("Test Header");
})

it("should only show the list while moused over", () => {
    render(<ResourceListIndex header={json.header} list={json.list}/>);
    let listUL = screen.queryByTestId("resourceListUL");
    expect(listUL).toBeNull();
    const container = screen.getByTestId("resourceListIndexContainer");
    fireEvent.mouseOver(container);
    listUL = screen.queryByTestId("resourceListUL");
    expect(listUL).toBeInTheDocument();
    fireEvent.mouseLeave(container)
    listUL = screen.queryByTestId("resourceListUL");
    expect(listUL).toBeNull();

})

it('should render the appropriate amount of list elements while hovered', () => {
    render(<ResourceListIndex header={json.header} list={json.list} />);
    const container = screen.getByTestId("resourceListIndexContainer");
    fireEvent.mouseOver(container);
    const listItems = screen.queryAllByTestId("resourceListItem");
    expect(listItems).toHaveLength(2)
    expect(screen.getByText(/test1/i)).toBeInTheDocument()
    expect(screen.getByText(/test2/i)).toBeInTheDocument()
})