import axios from 'axios';
import FamilyMember from '../global/types/FamilyMember';

export const getFamilies = async () => {
  const response: FamilyMember[] = await axios.get('https://nioetnibs2.execute-api.us-east-1.amazonaws.com/prod/', {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
  return response;
};
