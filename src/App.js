import React, { useState } from 'react';
import axios from 'axios';

const useAnalyticsData = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [error, setError] = useState('');
    const [channelId, setChannelId] = useState('');

    const fetchAnalyticsData = async (channelId) => {
        try {
            const response = await axios.get(`http://localhost:5000/channel/${channelId}`);
            const data = response.data;
            setAnalyticsData(data);
            setError('');
            // Store data in local storage
            localStorage.setItem('analyticsData', JSON.stringify(data));
        } catch (error) {
            setError('Error retrieving channel analytics');
            setAnalyticsData(null);
        }
    };

    const handleInputChange = (e) => {
        setChannelId(e.target.value);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (channelId.trim() !== '') {
            await fetchAnalyticsData(channelId);
        } else {
            setError('Please enter a YouTube Channel ID');
        }
    };

    return { analyticsData, error, fetchAnalyticsData, handleInputChange, handleSubmit };
};

const App = () => {
    const { analyticsData, error, handleInputChange, handleSubmit } = useAnalyticsData();

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter YouTube Channel ID" onChange={handleInputChange} />
                <button type="submit">Get Analytics</button>
            </form>
            {error && <p>{error}</p>}
            {analyticsData && (
                <div>
                    <h2>Channel Analytics:</h2>
                    <pre>{JSON.stringify(analyticsData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default App;
export { useAnalyticsData };
