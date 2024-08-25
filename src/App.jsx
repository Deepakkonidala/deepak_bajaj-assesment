import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
	const [jsonInput, setJsonInput] = useState('');
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [response, setResponse] = useState(null);

	const handleInputChange = (e) => {
		setJsonInput(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const apiUrl = import.meta.env.VITE_API_URL;
			const res = await axios.post(apiUrl, JSON.parse(jsonInput));
			setResponse(res.data);
		} catch (error) {
			console.error('Error submitting the form', error);
		}
	};

	const handleSelectChange = (selected) => {
		setSelectedOptions(selected);
	};

	const filteredResponse = () => {
		if (!response) return null;
		let filtered = {};
		selectedOptions.forEach((option) => {
			filtered[option.value] = response[option.value];
		});
		return filtered;
	};

	const renderFilteredResponse = () => {
		const filtered = filteredResponse();
		if (!filtered) return null;
		return (
			<div className="filtered-response">
				<h4>Filtered Response</h4>
				{Object.keys(filtered).map((key) => (
					<p key={key}>
						<span>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>{' '}
						{filtered[key].join(',')}
					</p>
				))}
			</div>
		);
	};

	const options = [
		{ value: 'numbers', label: 'Numbers' },
		{ value: 'alphabets', label: 'Alphabets' },
		{ value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
	];

	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<label className="form-label">
					API Input:
					<input
						type="text"
						value={jsonInput}
						onChange={handleInputChange}
						className="input-field"
						placeholder='{"data":["M","1","334","4","B"]}'
					/>
				</label>
				<button type="submit" className="submit-button">
					Submit
				</button>
			</form>
			<label className="form-label">
				Multi Filter:
				<Select
					isMulti
					options={options}
					onChange={handleSelectChange}
					className="multi-select"
				/>
			</label>
			{renderFilteredResponse()}
		</div>
	);
};

export default App;
