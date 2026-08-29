


const API_URL : string | undefined = process.env.MOVIE_API_URL;
const API_KEY : string | undefined= process.env.MOVIE_API_KEY;
console.log(API_URL)
type ApiParams = Record<
  string,
  string | number | undefined
>;

export async function apiFetch<T>(
  endpoint = "",
  params: ApiParams = {}
): Promise<T> {
  

  const searchParams = new URLSearchParams();

  
  if (!API_URL || !API_KEY) {
  throw new Error("Missing movie API environment variables");
}
  searchParams.set("apikey", API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  });

  const response = await fetch(
    `${API_URL}${endpoint}?${searchParams.toString()}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data: T & {
    Response?: "True" | "False";
    Error?: string;
  } = await response.json();

  

  return data;
}