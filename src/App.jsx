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
		? flagLists.filter(({ name }) => name.toLowerCase().includes(searchQuery))
		: flagLists;

	useEffect(() => {
		const url = "https://xcountries-backend.azurewebsites.net/all";
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
					type="search"
					name="search"
					id="search"
					className="search"
					onChange={handleOnChange}
				/>
			</div>
			<div className="flag-grid">
				{filteredFlags.length > 0 ? (
					filteredFlags.map(({ name, flag }) => (
						<div className="flag-grid-item">
							<img src={flag} alt={name} />
							<p>{name}</p>
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
