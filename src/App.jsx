import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
	const [flagLists, setFlagLists] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	const handleOnChange = (e) => {
		const val = e.target.value;
		setSearchQuery(val);
	};

	const filteredFlags = searchQuery
		? flagLists.filter(({ common }) =>
				common.toLowerCase().includes(searchQuery.toLowerCase())
		  )
		: flagLists;

	useEffect(() => {
		const url =
			"https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";
		axios
			.get(url)
			.then((res) => setFlagLists(res.data))
			.catch(() => {
				console.error("Error fetching data: ");
			});
	}, []);

	return (
		<div>
			<div className="search-container">
				<input
					type="text"
					name="search"
					id="search"
					className="search"
					onChange={handleOnChange}
				/>
			</div>
			<div className="flag-grid">
				{filteredFlags.length > 0 ? (
					filteredFlags.map(({ common, png }) => (
						<div className="countryCard">
							<img src={png} alt={common} />
							<p>{common}</p>
						</div>
					))
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

export default App;
