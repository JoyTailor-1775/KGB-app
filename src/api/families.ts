import axios from 'axios';
import { Family } from '../global/types/Family';

interface ServerResponse {
  data: Family[];
}

export const getFamilies = async (): Promise<Family[]> => {
  const response: ServerResponse = await axios.get(
    'https://nioetnibs2.execute-api.us-east-1.amazonaws.com/prod/',
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  );
  return response.data;
};
