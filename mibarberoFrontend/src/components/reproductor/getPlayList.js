import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

const getPLaylist = () => {
    const apiKey = "AIzaSyAi-AFYpYwWgvfteGrvWC-Zdv8pYb8dsZ0";
    const getVideoInfo = async (videoId) => {
        try {
            const URL = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`;
            const response = await axios.get(URL);
            return response.data.items[0];
        } catch (error) {
            console.log("Tenemos un error", error);
            return null;
        }
    };
};

module.exports = {
    getPLaylist,
};
