import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Signup() {
	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
		location: "",
	});
	const handleChange = (event) => {
		const { name, value } = event.target;
		setCredentials((prev) => {
			return { ...prev, [name]: value };
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch("http://localhost:5000/api/createuser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: credentials.name,
				email: credentials.email,
				password: credentials.password,
				location: credentials.location,
			}),
		});

		const json = await response.json();
		console.log(json);
		if (!json.success) {
			alert("Invalid Credentials!!!");
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
						<label htmlFor="name" className="form-label">
							Name
						</label>
						<input
							type="text"
							className="form-control"
							name="name"
							value={credentials.name}
							onChange={handleChange}
						/>
					</div>
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
						<div id="emailHelp" className="form-text">
							We'll never share your email with anyone else.
						</div>
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
					<div className="mb-3">
						<label htmlFor="location" className="form-label">
							Address
						</label>
						<input
							type="text"
							className="form-control"
							id="exampleInputPassword1"
							name="location"
							value={credentials.location}
							onChange={handleChange}
						/>
					</div>
					<button type="submit" className="m-3 btn btn-info">
						Submit
					</button>
					<Link to="/login" className="m-3 btn btn-danger">
						Already a User
					</Link>
				</form>
			</div>
		</div>
	);
}
