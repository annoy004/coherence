import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Dashboard from 'views/Dashboard';
import { useContext } from "react";



import { AccountContext } from "./contextsss/accountprovider.jsx";

const useAnalyticsData = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [error, setError] = useState('');
    const [channelId, setChannelId] = useState('');
    const {setPerson} = useContext(AccountContext);

    const fetchAnalyticsData = async (channelId) => {
        try {
            const response = await axios.get(`http://localhost:5000/channel/${channelId}`);
            setAnalyticsData(response.data);
            setPerson(response.data);
            setError('');
        } catch (error) {
            setError('Error retrieving channel analytics');
            setAnalyticsData(null);
        }
    };

    useEffect(() => {
        fetchAnalyticsData(channelId);
    }, [channelId]);

    const handleInputChange = (e) => {
        setChannelId(e.target.value);
    };

    return { analyticsData, error, fetchAnalyticsData, handleInputChange };
};


const App = () => {
    const [channelId, setChannelId] = useState('');
    const { analyticsData, error, fetchAnalyticsData } = useAnalyticsData();

    const handleInputChange = (e) => {
        setChannelId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchAnalyticsData(channelId);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter YouTube Channel ID" value={channelId} onChange={handleInputChange} />
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