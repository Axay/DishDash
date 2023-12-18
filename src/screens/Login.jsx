import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
	let navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});
	const handleChange = (event) => {
		const { name, value } = event.target;
		setCredentials((prev) => {
			return { ...prev, [name]: value };
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch("http://localhost:5000/api/loginuser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: credentials.email,
				password: credentials.password,
			}),
		});

		const json = await response.json();
		console.log(json);
		if (!json.success) {
			alert("Invalid Credentials!!!");
		}
		if (json.success) {
			localStorage.setItem("userEmail", credentials.email);
			localStorage.setItem("authToken", json.authToken);
			console.log(localStorage.getItem("authToken"));
			navigate("/");
		}
	};
	return (
		<div>
			<div>
				<Navbar />
			</div>
			<div className="container mt-4">
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label
							htmlFor="exampleInputEmail1"
							className="form-label">
							Email address
						</label>
						<input
							type="email"
							className="form-control"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							name="email"
							value={credentials.email}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-3">
						<label
							htmlFor="exampleInputPassword1"
							className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="exampleInputPassword1"
							name="password"
							value={credentials.password}
							onChange={handleChange}
						/>
					</div>
					<button type="submit" className="m-3 btn btn-info">
						Submit
					</button>
					<Link to="/createUser" className="m-3 btn btn-danger">
						I'm a new user
					</Link>
				</form>
			</div>
		</div>
	);
}
