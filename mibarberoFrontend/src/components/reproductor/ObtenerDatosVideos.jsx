const axios = require('axios');

const videoIds = ['Bs7oESFZYNo', 'WfMO_AETgB0', 'fzvCLpGB10M', 'xhUiP5EO8uQ', 'bmTpnLJUXwY'];
const apiKey = 'AIzaSyAi-AFYpYwWgvfteGrvWC-Zdv8pYb8dsZ0';

async function obtenerDatosVideos() {
    try {
        const videosData = await Promise.all(videoIds.map(async (videoId) => {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`);
            return response.data.items[0];
        }));

        const videos = videosData.map((video) => {
            const { id, snippet, contentDetails } = video;
            return {
                id: id,
                thumbnail: snippet.thumbnails.default.url,
                titulo: snippet.title,
                artista: snippet.channelTitle,
                duracion: contentDetails.duration,
            };
        });

        console.log(videos);
    } catch (error) {
        console.error('Error al obtener datos de los videos:', error);
    }
}

obtenerDatosVideos();