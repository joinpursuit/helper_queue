import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";
import Timer from '../Timer';

it('should render the text select time', () => {
    render(<Timer />);
    expect(screen.getByText("Select Time:")).toBeInTheDocument();
})

it('should render a select bar with 12 options', () => {
    render(<Timer />);
    expect(screen.queryAllByTestId("timeIntervalOptions")).toHaveLength(12);
})

it('should have a select bar that defaults to 15 minutes', () => {
    render(<Timer />);
    expect(screen.getByDisplayValue('15')).toBeInTheDocument()
})

it('should have a function select bar', () => {
    render(<Timer />);
    const select = screen.getByTestId("timerSelect");
    fireEvent.change(select, {target: {value: 1}});
    let options = screen.getAllByTestId("timeIntervalOptions");
    expect(options[0].selected).toBeTruthy();
    expect(options[6].selected).toBeFalsy();
})

it('should render a start button only', () => {
    render(<Timer />);
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.queryByText("Stop")).not.toBeInTheDocument();
    expect(screen.queryByText("Pause")).toBeNull();
})

it('should toggle the start button and the stop button', () => {
    render(<Timer />);
    let start = screen.getByText("Start");
    expect(start).toBeInTheDocument();
    expect(screen.queryByText("Stop")).toBeNull();
    fireEvent.click(start);
    expect(screen.queryByText("Start")).toBeNull();
    let stop = screen.getByText("Stop");
    expect(stop).toBeInTheDocument();
    fireEvent.click(stop);
    expect(screen.queryByText("Stop")).toBeNull();
    expect(screen.getByText("Start")).toBeInTheDocument();
})

