const API_BASE_URL = 'http://127.0.0.1:8000';

export interface DictionaryEntry {
  kor_nm: string;
  desc: string;
  eng_short_nm: string;
  eng_full_nm: string;
  synonym: string[];
}

export async function searchKorean(korNm: string): Promise<DictionaryEntry[]> {
  const response = await fetch(`${API_BASE_URL}/search/kornm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ kor_nm: korNm }),
  });
  return response.json();
}

export async function searchEnglish(engNm: string): Promise<DictionaryEntry[]> {
  const response = await fetch(`${API_BASE_URL}/search/engnm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eng_nm: engNm }),
  });
  return response.json();
}

export async function deleteWord(korNm: string): Promise<SearchResponse> {
  const response = await fetch(`${API_BASE_URL}/search/delword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ kor_nm: korNm }),
  });
  return response.json();
}

export async function getRecommendation(entry: DictionaryEntry): Promise<DictionaryEntry> {
  const response = await fetch(`${API_BASE_URL}/dict/recommend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
  return response.json();
}

export async function addDictionaryEntry(entry: DictionaryEntry): Promise<SearchResponse> {
  const response = await fetch(`${API_BASE_URL}/dict/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
  return response.json();
}