export const getLSItem = <StorageItem>(query: string): StorageItem => {
  const storageItem = localStorage.getItem(query);
  return storageItem ? JSON.parse(storageItem) : null;
};

export const setLSItem = <StorageItem>(
  query: string,
  data: StorageItem,
): void => {
  localStorage.setItem(query, JSON.stringify(data));
};

export const deleteLSItem = (query: string): void => {
  localStorage.removeItem(query);
};
