import React, { useState } from 'react';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const res = await fetch('E:\\Harshendra\\Codings\\PYTHON\\Projects\\bajaj_finserv\\index.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonInput,
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
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
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON here...'
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            <br />
            <select multiple={true} onChange={handleOptionChange}>
                <option value="numbers">Numbers</option>
                <option value="alphabets">Alphabets</option>
                <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
            </select>
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
