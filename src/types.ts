export interface DictionaryEntry {
  kor_nm: string;
  desc: string;
  eng_short_nm: string;
  eng_full_nm: string;
  synonym: string[];
}

export interface SearchResponse {
  message: string;
}