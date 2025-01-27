interface InstanceData {
  idInstance: string;
  apiTokenInstance: string;
}

export function jsonParse<T>(value: unknown): T | null {
  if (typeof value !== 'string') {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
}

export const saveInstanceData = (data?: InstanceData | null): void => {
  if (data) {
    sessionStorage.setItem('instanceData', JSON.stringify(data));
  } else {
    sessionStorage.removeItem('instanceData');
  }
};

export const getInstanceData = (): InstanceData | null =>
  jsonParse<InstanceData>(sessionStorage.getItem('instanceData'));
