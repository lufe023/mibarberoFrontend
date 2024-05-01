import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ListByuser = ({ lists, setVideoIds }) => {
  const [playList, setPlayList] = useState();

  useEffect(() => {
    const consultar = lists?.flatMap((list) =>
      list.videoIds?.filter((video) => video.playing).map((video) => video.videoId)
    );

    const obtenerDatosVideos = async () => {
      if (!consultar) return; // Verificar si consultar está definido
      const getVideoInfo = async (videoId) => {
        try {
          const URL = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}&part=snippet,contentDetails`;
          const response = await axios.get(URL);
          return response.data.items[0];
        } catch (error) {
          console.log("Tenemos un error", error);
          return null;
        }
      };

      const videosInfo = await Promise.all(consultar.map(getVideoInfo));
      setPlayList(videosInfo.filter((video) => video));
    };

    obtenerDatosVideos();
  }, [lists]);

  const putList = (list) => {
    setVideoIds(list.videoIds.map((video) => video.videoId));
  };

  return (
    <div className='listByUser'>
      <h4>Mis Playlists</h4>
      <ul className="listas">
        {lists?.map((list) => (
          <li key={list.id} onClick={() => putList(list)}>
            <img src={`${playList?.find((video) => video.id === list.videoIds.find((video) => video.playing).videoId)?.snippet?.thumbnails?.medium?.url}`} />
            {list.name}{' '}
            <span>
              {'(' + list.videoIds.length + ')'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};



export default ListByuser;
