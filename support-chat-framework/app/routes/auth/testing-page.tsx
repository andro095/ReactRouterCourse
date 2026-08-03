import { Link } from "react-router"

const TestingPage = () => {
    return (
        <>
            <h1>Testing Page</h1>
            <Link to="/auth/login" className="text-blue-500 underline">Go back to login page</Link>
        </>
    )
}

export default TestingPage