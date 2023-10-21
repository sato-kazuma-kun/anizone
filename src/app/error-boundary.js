"use client"

import React from "react"

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        // Define a state variable to track whether there is an error or not
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can use your own error logging service here
        console.log({ error, errorInfo });
    }

    render() {
        // Check if the error is thrown
        if (this.state.hasError) {
            // You can render any custom fallback UI with Tailwind CSS styles
            return (
                <main className="flex items-center justify-center place-content-center flex-col h-screen w-screen p-0 m-0 bg-red-200 rounded-lg shadow-md">
                    <h2 className="text-xl text-red-600 font-semibold mb-2">
                        Oops, there is an error!
                    </h2>
                    <p className="text-gray-800">
                        Something went wrong. Please try again later.
                    </p>
                    <button
                        style={{ transition: 'all 150ms ease-in-out', }}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                        type="button"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Try again
                    </button>
                </main>
            );
        }

        // Return children components in case of no error
        return this.props.children;
    }
}

export default ErrorBoundary;
