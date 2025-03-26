export const BASE_URL = "http://localhost:3000";

class ApiError extends Error {
  constructor(public response: Response) {
    super(`ApiError: ${response.status}`);
  }
}

// Работает только с useQuery (meta автоматически передается в fetchApiInstance)
// тут работает механизм каррирования
export const fetchApiInstanceWithMeta =
  <T>(url: string, init?: RequestInit) =>
  async (meta: { signal?: AbortSignal }) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...init,
      signal: meta.signal,
    });

    if (!response.ok) {
      throw new ApiError(response);
    }

    const data = (await response.json()) as Promise<T>;

    return data;
  };

// Без каррирования
export const fetchApiInstance = async <T>(url: string, init?: RequestInit) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...init,
  });

  if (!response.ok) {
    throw new ApiError(response);
  }

  const data = (await response.json()) as Promise<T>;

  return data;
};
