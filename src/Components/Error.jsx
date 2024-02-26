import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className="container p-5 m-5 text-center">
        <div>
          <h1 className="text-danger-emphasis fw-bold">404</h1>
          <h3 className="py-2 text-primary-emphasis">UH OH! You're lost.</h3>
          <p className="py-2 text-secondary fw-medium">
            The page you are looking for does not exist. How you got here is a
            mystery. But you can click the button below to go back to the
            homepage.
          </p>

          <Link to="/">
            <button type="button" className="btn btn-outline-warning">
              Go Back to Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
