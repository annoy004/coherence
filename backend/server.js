import express from 'express';
import { google } from 'googleapis';
import cors from 'cors'; // Import the cors middleware

const app = express();
const port = 5000;

const apiKey = 'AIzaSyCeTSAVFvAG67F6Ek5TtW0p2NDW2426sJA';
const youtube = google.youtube({ version: 'v3', auth: apiKey });

// Use CORS middleware
app.use(cors());

// Route to handle GET requests for fetching channel analytics
app.get('/channel/:channelId', async (req, res) => {
    const { channelId } = req.params;

    try {
        // Fetch videos from the channel
        const videosResponse = await youtube.search.list({
            part: 'id',
            channelId: channelId,
            maxResults: 50,
            type: 'video'
        });

        const videoIds = videosResponse.data.items.map(item => item.id.videoId);

        const analyticsData = [];

        // Fetch statistics for each video
        for (const videoId of videoIds) {
            const response = await youtube.videos.list({
                part: 'statistics',
                id: videoId
            });

            const statistics = response.data.items[0].statistics;

            // Assuming impressions are total views + number of videos in search results
            const impressions = parseInt(statistics.viewCount) + videoIds.length;

            // Calculate engagement rate (views / impressions)
            const engagementRate = (parseInt(statistics.viewCount) / impressions) * 100; // Convert to percentage

            // Add engagement rate to video statistics
            statistics.engagementRate = engagementRate.toFixed(2); // Round to 2 decimal places

            analyticsData.push(statistics);
        }

        // Fetch channel details including subscriber count
        const channelResponse = await youtube.channels.list({
            part: 'statistics',
            id: channelId
        });

        const subscriberCount = channelResponse.data.items[0].statistics.subscriberCount;

        // Add subscriber count to analytics data
        analyticsData.push({ subscriberCount: parseInt(subscriberCount) });

        res.json(analyticsData);
    } catch (error) {
        console.error('Error retrieving channel analytics:', error);
        res.status(500).json({ error: 'Failed to retrieve channel analytics' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
