import axios from 'axios';
import * as Google from 'expo-google-app-auth';

import { GOOGLE_ANDROID_CLIENT_ID } from '@env';

type ResponseGoogleAuthUser = {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
};

type ResponseGoogleAuth = {
  type: string;
  accessToken?: string;
  refreshToken?: string;
};

type ResponseGoogleAuthService = {
  cancelled?: boolean;
  user?: ResponseGoogleAuthUser;
};

export async function googleAuthService(): Promise<ResponseGoogleAuthService> {
  const response = (await Google.logInAsync({
    language: 'pt-BR',
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    // iosClientId: YOUR_CLIENT_ID_HERE,
    scopes: ['profile', 'email'],
  })) as ResponseGoogleAuth;

  if (response.type !== 'success') {
    return { cancelled: true };
  }

  const { data } = await axios({
    method: 'GET',
    url: 'https://www.googleapis.com/userinfo/v2/me',
    headers: { Authorization: `Bearer ${response.accessToken}` },
  });

  const user = data as ResponseGoogleAuthUser;

  return { user };
}
