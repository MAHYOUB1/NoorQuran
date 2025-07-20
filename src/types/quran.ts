// Types for Quran API data

export interface Verse {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Page {
  number: number;
  ayahs: Verse[];
}

export interface Reciter {
  identifier: string;
  name: string;
  englishName: string;
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}