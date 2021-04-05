import React from 'react';
import { render, screen } from "@testing-library/react";
import "../Student";
import Student from '../Student';

it("renders home message", () => {
    render(<Student />);
    expect(screen.getByText("Helpful Resources And Links")).toBeInTheDocument();
})