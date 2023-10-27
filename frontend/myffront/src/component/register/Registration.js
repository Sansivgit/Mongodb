import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  firstName: yup.string().required("First Name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

function Register() {
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  //Creating a state for maintaining Confirmpassword's state. Initially declare as false here
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/users").then((res) => {
      setUsers(res.data.data);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const togglePasswordVisibility = () => {
    try {
      setShowPassword(!showPassword);
    } catch (error) {
      alert(error, "Something went wrong togglepassword");
    }
  };
  //Ending PasswordFieldVisible Function

  //StartingConfirmPasswordFieldVisiblity Function, By:K.K.BALAN
  const toggleConfirmPasswordVisibility = () => {
    try {
      setShowCnfPassword(!showCnfPassword);
    } catch (error) {
      alert(error, "Something went wrong toggleconfirmpassword");
    }
  };
  //Ending ConfirmPasswordFieldVisiblity Function

  const onSubmit = async (data) => {
    try {
      console.log("working", data);
      const response = await axios.post("http://localhost:8000/users", data);

      console.log("Registration successfully", response.data);

      document.getElementById("registration-form").reset();
      navigate("/Login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const deleteUser = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:8000/users/deleteuser/${id}`)
      .then((response) => {
        console.log("Resource deleted successfully:", response.data);

        // Update the users state by filtering out the deleted user
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting resource:", error);
      });
  };

  return (
    <div className="container mt-3">
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} id="registration-form">
        <div className="form-row">
          <div className="form-group col">
            <label className="text-dark">First Name</label>
            <input
              name="firstName"
              type="text"
              {...register("firstName")}
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.firstName?.message}</div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            <label className="text-dark">Email</label>
            <input
              name="email"
              type="text"
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            <label className="text-dark">Password</label>
            <div className="input-group">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <button
                type="button"
                className="input-group-text"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <i class="fa-regular fa-eye fa-beat-fade"></i>
                ) : (
                  <i class="fa-regular fa-eye-slash fa-beat-fade"></i>
                )}
              </button>
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
          </div>
          <div className="form-group col">
            <label className="text-dark">Confirm Password</label>
            <div className="input-group">
              <input
                name="confirmPassword"
                onBlur={() => trigger("confirmPassword")}
                type={showCnfPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
              />
              <button
                type="button"
                className="input-group-text"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showCnfPassword ? (
                  <i class="fa-regular fa-eye fa-beat-fade"></i>
                ) : (
                  <i class="fa-regular fa-eye-slash fa-beat-fade"></i>
                )}
              </button>
              <div className="invalid-feedback">
                {errors.confirmPassword?.message}
              </div>
            </div>
          </div>
        </div>
        <div className="form-group mt-3">
          <button type="submit" className="btn btn-primary mr-1">
            Register
          </button>
        </div>
      </form>

      <div className="container mt-5">
        <h3>Users</h3>
        <div>
          {users.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>FirstName</th>
                  <th>email</th>
                  <th>Actions/Delete</th>
                  <th>Actions/View</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.firstName}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => navigate(`/viewuser/${user._id}`)}
                      >
                        View
                      </button>
                    </td>
                    {/* <td>
                      <button
                        className="pro-button ms-3"
                       
                      >
                        Edit
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Contacts available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
