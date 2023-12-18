import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
	const [foodCat, setFoodCat] = useState([]);
	const [foodItem, setFoodItem] = useState([]);
	const [search, setSearch] = useState("");

	const loadData = async () => {
		let response = await fetch("http://localhost:5000/api/fooddata", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		response = await response.json();
		setFoodItem(response[0]);
		setFoodCat(response[1]);
		// console.log(response[0], response[1]);
	};

	useEffect(() => {
		loadData();
	}, []);

	return (
		<div>
			<div>
				<Navbar />
			</div>
			<div>
				<div
					id="carouselExampleFade"
					className="carousel slide carousel-fade"
					data-bs-ride="carousel"
					style={{ objectFit: "contain !important" }}>
					<div className="carousel-inner" id="carousel">
						<div
							className="carousel-caption"
							style={{ zIndex: "10" }}>
							<div className="d-flex justify-content-center">
								<input
									className="form-control me-2"
									type="search"
									placeholder="Search"
									aria-label="Search"
									value={search}
									onChange={(event) =>
										setSearch(event.target.value)
									}
								/>
								{/* <button
									className="btn btn-outline-info text-white"
									type="submit">
									Search
								</button> */}
							</div>
						</div>
						<div className="carousel-item active">
							<img
								src="https://images.unsplash.com/photo-1554998171-706e730d721d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=700&ixid=MnwxfDB8MXxyYW5kb218MHx8Rm9vZHx8fHx8fDE3MDA1NzE1OTk&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=900"
								className="d-block w-100"
								alt="..."
								style={{ filter: "brightness(30%)" }}
							/>
						</div>
						<div className="carousel-item">
							<img
								src="https://images.unsplash.com/photo-1630278156268-12d56c2e135f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=700&ixid=MnwxfDB8MXxyYW5kb218MHx8QnVyZ2VyfHx8fHx8MTcwMDU3MTYxMQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=900"
								className="d-block w-100"
								alt="..."
								style={{ filter: "brightness(30%)" }}
							/>
						</div>
						<div className="carousel-item">
							<img
								src="https://images.unsplash.com/photo-1516697073-419b2bd079db?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=700&ixid=MnwxfDB8MXxyYW5kb218MHx8UGl6emF8fHx8fHwxNzAwNTcxNTc1&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=900"
								className="d-block w-100"
								alt="..."
								style={{ filter: "brightness(30%)" }}
							/>
						</div>
					</div>
					<button
						className="carousel-control-prev"
						type="button"
						data-bs-target="#carouselExampleFade"
						data-bs-slide="prev">
						<span
							className="carousel-control-prev-icon"
							aria-hidden="true"></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button
						className="carousel-control-next"
						type="button"
						data-bs-target="#carouselExampleFade"
						data-bs-slide="next">
						<span
							className="carousel-control-next-icon"
							aria-hidden="true"></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
			</div>
			<div className="container">
				{foodCat.length !== 0
					? foodCat.map((data) => {
							return (
								<div className="row mb-3">
									<div key={data._id} className="fs-3 m-3">
										{data.CategoryName}
									</div>
									<hr />
									{foodItem.length !== 0 ? (
										foodItem
											.filter(
												(item) =>
													item.CategoryName ===
														data.CategoryName &&
													item.name
														.toLowerCase()
														.includes(
															search.toLowerCase()
														)
											)
											.map((filterItems) => {
												return (
													<div
														key={filterItems._id}
														className="col-12 col-md-6 col-lg-3 mb-3">
														<Card
															foodItem={
																filterItems
															}
															options={
																filterItems
																	.options[0]
															}
														/>
													</div>
												);
											})
									) : (
										<div>No Data Found!!</div>
									)}
								</div>
							);
					  })
					: ""}
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
}
