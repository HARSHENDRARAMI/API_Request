import React, { useState } from 'react';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isJsonValid, setIsJsonValid] = useState(true);
    const [error, setError] = useState(null);

    const validateJson = (input) => {
        try {
            JSON.parse(input);
            setIsJsonValid(true);
        } catch (e) {
            setIsJsonValid(false);
        }
    };

    const handleJsonChange = (e) => {
        const input = e.target.value;
        setJsonInput(input);
        validateJson(input);
    };

    const handleSubmit = async () => {
        setError(null);
        try {
            const res = await fetch('https://api-request-8w0v.onrender.com/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonInput,
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            setError('There was an issue with the request. Please try again.');
            console.error('Error:', error);
        }
    };

    const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedOptions(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    return (
        <div className="App">
            <h1>Backend Data Processor</h1>
            <textarea
                rows="10"
                cols="50"
                value={jsonInput}
                onChange={handleJsonChange}
                placeholder='Enter JSON here...'
            />
            {!isJsonValid && <p style={{ color: 'red' }}>Invalid JSON format</p>}
            <br />
            <button onClick={handleSubmit} disabled={!isJsonValid}>Submit</button>
            <br />
            <select multiple={true} onChange={handleOptionChange}>
                <option value="numbers">Numbers</option>
                <option value="alphabets">Alphabets</option>
                <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
            </select>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <h2>Response:</h2>
                    <pre>
                        {JSON.stringify(
                            selectedOptions.reduce((acc, key) => {
                                acc[key] = response[key];
                                return acc;
                            }, {}),
                            null,
                            2
                        )}
                    </pre>
                </div>
            )}
        </div>
    );
}

export default App;
