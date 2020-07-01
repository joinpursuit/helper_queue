import React from 'react'
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Home from '../Home';

it('should render a header of helpful resources and links', () => {
    render(<Home />)
    expect(screen.getByTestId('homeHeader')).toHaveTextContent("Helpful Resources And Links")
})

it('should render a link to localhost', () => {
    const { container } = render(<Home />);
    const link = screen.getByTestId("localhostLink");
    const linkContainer = screen.getByTestId("localhostLinkContainer");
    expect(container.innerHTML).toMatch("Localhost:3000");
    expect(linkContainer).toContainElement(link);
    expect(link).toHaveAttribute('target', '__blank')
})

it('should render a link to Pursuits Github', () => {
    const { container } = render(<Home />);
    const link = screen.getByTestId("githubLink");
    const linkContainer = screen.getByTestId("githubLinkContainer");
    expect(container.innerHTML).toMatch("GitHub");
    expect(linkContainer).toContainElement(link);
    expect(link).toHaveAttribute('href', 'https://github.com/joinpursuit')
    expect(link).toHaveAttribute('target', '__blank')
})