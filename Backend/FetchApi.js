import axios from 'axios';
// https://alquran.cloud/api => website for the api key
const BASE_URL = 'https://api.alquran.cloud/v1/quran';
import React from 'react';
//  the below is for displaying the arabic text of the Quran
export const fetchQuranText = async () => {
  const response = await axios.get(`${BASE_URL}/quran-uthmani`);
  return response.data;
};
// the below is for the Translation of the Quran
export const fetchTranslation = async () => {
  const response = await axios.get(`${BASE_URL}/en.asad`);
  return response.data;
};
// the below is for the Audio
export const fetchAudio = async () => {
  const response = await axios.get(`${BASE_URL}/ar.alafasy`);
  return response.data;
};
