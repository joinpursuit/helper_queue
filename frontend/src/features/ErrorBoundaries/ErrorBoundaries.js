import React, { Component } from 'react'


class ErrorBoundaries extends Component {
    state = { hasError: false }

    static getDerivedStateFromError(err) {
        return { hasError: true };
    }

    render() {
        if(this.state.hasError) {
            return <div>Something Went Wrong. Sorry!</div>
        }

        return (
            <>
                {this.props.children}
            </>
        )
    }
}

export default ErrorBoundaries;