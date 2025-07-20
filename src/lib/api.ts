// API functions for Quran data

import { ApiResponse, Page, Surah, Reciter } from '@/types/quran';

// Updated to use more reliable Quran API
const BASE_URL = 'https://quranapi.pages.dev/api';
const FALLBACK_URL = 'https://api.alquran.cloud/v1';

export async function getQuranPage(pageNumber: number): Promise<Page> {
  try {
    // Use fallback API for page data as new API doesn't have pages endpoint
    const response = await fetch(`${FALLBACK_URL}/page/${pageNumber}/quran-uthmani`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse<Page> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching Quran page:', error);
    throw error;
  }
}

export async function getSurahs(): Promise<Surah[]> {
  try {
    // Try new API first
    const response = await fetch(`${BASE_URL}/surah.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Transform new API format to our format
    return data.map((surah: any, index: number) => ({
      number: index + 1,
      name: surah.surahNameArabic,
      englishName: surah.surahName,
      englishNameTranslation: surah.surahNameTranslation,
      numberOfAyahs: surah.totalAyah,
      revelationType: surah.revelationPlace === 'Mecca' ? 'Meccan' : 'Medinan'
    }));
  } catch (error) {
    console.error('Error fetching surahs from primary API, trying fallback:', error);
    
    // Fallback to old API
    try {
      const response = await fetch(`${FALLBACK_URL}/surah`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse<Surah[]> = await response.json();
      return data.data;
    } catch (fallbackError) {
      console.error('Error fetching surahs from fallback API:', fallbackError);
      throw fallbackError;
    }
  }
}

export async function getReciters(): Promise<Reciter[]> {
  try {
    // Try new API first
    const response = await fetch(`${BASE_URL}/reciters.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Transform new API format to our format with Arabic names
    const reciterNames: { [key: string]: string } = {
      'Nasser Al Qatami': 'ناصر القطامي',
      'Abu Bakr Al Shatri': 'عبدالباسط عبدالصمد ',
      'Mishary Rashid Al Afasy': 'مشاري العفاسي',
      'Yasser Al Dosari':  'ياسر الدوسري',
      'Hani Ar Rifai': "هاني الرفاعي"
    };

    const reciters = Object.entries(data).map(([id, englishName ]) => ({
      identifier: id,
      language: 'ar',
      name: reciterNames[englishName] ,
      englishName: englishName as string,
      format: 'audio',
      type: 'audio'
    }));
    
    return reciters;
  } catch (error) {
    console.error('Error fetching reciters from primary API, trying fallback:', error);
    
    // Fallback to old API
    try {
      const response = await fetch(`${FALLBACK_URL}/edition/format/audio`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse<Reciter[]> = await response.json();
      return data.data;
    } catch (fallbackError) {
      console.error('Error fetching reciters from fallback API:', fallbackError);
      throw fallbackError;
    }
  }
}

export async function getSurahAudio(surahNumber: number, reciterIdentifier: string): Promise<string> {
  try {
    // Try new API format first
    const audioUrl = `https://quranapi.pages.dev/api/audio/${surahNumber}.json`;
    const response = await fetch(audioUrl);
    if (response.ok) {
      console.log(response);
      const data = await response.json();
      console.log(`Audio data for Surah ${surahNumber}:`, data[reciterIdentifier].originalUrl
);
      return data[reciterIdentifier].originalUrl;
    }
    
    // Fallback to old API
    const fallbackResponse = await fetch(`${FALLBACK_URL}/surah/${surahNumber}/${reciterIdentifier}`);
    if (!fallbackResponse.ok) {
      throw new Error(`HTTP error! status: ${fallbackResponse.status}`);
    }
    const fallbackData = await fallbackResponse.json();
    return fallbackData.data.ayahs[0]?.audio || '';
  } catch (error) {
    console.error('Error fetching surah audio:', error);
    
    // Last resort: construct direct MP3 URL based on common patterns
    const directUrls = [
      `https://api.quran.com/api/v4/chapter_recitations/${1}/${surahNumber}.mp3`,
      `https://download.quranicaudio.com/quran/mishary_rashid_alafasy/${surahNumber.toString().padStart(3, '0')}.mp3`,
      `https://download.quranicaudio.com/quran/maher_almuaiqly/${surahNumber.toString().padStart(3, '0')}.mp3`
    ];
    
    return directUrls[0]; // Return first fallback URL
  }
}