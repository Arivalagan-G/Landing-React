import { FacebookOutlined, TwitterCircleFilled } from "@ant-design/icons";
import "./login.css";
import { useNavigate } from "react-router-dom";
import userService from "../../../../services/userService";

function Login({ toast }) {
  const navigate = useNavigate();
  function loginhandler() {
    navigate("/signup");
  }
  const onLogin = (response) => {
    if (response === 200) {
      toast.success("Login Successful !!!");
      let currentRole = localStorage.getItem("role");
      let jobSeekerName = localStorage.getItem("jobSeekerName");
      let employerName = localStorage.getItem("employerName");
      if (
        (currentRole === "jobseeker" && jobSeekerName === null) ||
        (currentRole === "employer" && employerName === null)
      ) {
        navigate("/registration");
      } else {
        if (currentRole === "jobseeker") {
          navigate("/job-seeker");
        } else if (currentRole === "employer") {
          navigate("/employer");
        } else {
          navigate("/admin/dashboard");
        }
      }
    } else {
      toast.error("Invalid Credentials!");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formValues = {
      username: e?.target?.username?.value,
      password: e?.target?.password?.value,
      role: e?.target?.role?.value,
    };

    console.log(formValues);
    userService.loginUser(formValues, onLogin);
  };
  return (
    <>
      <div className="login-form-body">
        <div className="box-form">
          <div className="left">
            <div className="overlay">
              <h1>Virtusa Jobs</h1>
              <p>Making new job opportunities every day</p>
            </div>
          </div>
          <div className="right">
            <h5 className="login-text">Login</h5>
            <p>
              Don't have an account? <br />
              <span className="create-account-option" onClick={loginhandler}>
                Create Your Account
              </span>{" "}
              it takes less than a minute
            </p>
            <form onSubmit={handleSubmit}>
              <div className="inputs">
                <select id="role" name="role" className="select">
                  <option value="admin" className="select-option">
                    Admin
                  </option>
                  <option value="jobseeker" className="select-option">
                    Job Seeker
                  </option>
                  <option value="employer" className="select-option">
                    Employer
                  </option>
                </select>
                <input
                  name="username"
                  type="email"
                  placeholder="Enter your Email Id"
                  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                />
                <br />
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your Password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                />
              </div>

              <div className="remember-me--forget-password">
                <div>
                  <input
                    type="checkbox"
                    name="item"
                    className="checkbox-login"
                  />

                  <span className="text-checkbox">Remember me</span>
                </div>

                <p>forget password?</p>
              </div>

              <br />
              <button className="login-button">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
