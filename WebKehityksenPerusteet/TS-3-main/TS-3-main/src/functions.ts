const fetchData = async <T>(url: string, options: ReaquestInit = {}): Promise<T> => {
  const response = await fetch<Restaurant>(url, options);
  if (!response.ok) {
    throw new Error(`Error ${response.status} occured`);
  }
  const json = response.json();
  return json;
};

export {fetchData};