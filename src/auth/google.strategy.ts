import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any
  ): Promise<any> {
    const { displayName, emails, photos } = profile;

    if (!emails || emails.length === 0) {
      throw new Error('Google account has no public email');
    }

    const user = {
      email: emails[0].value,
      name: displayName,
      avatarUrl: photos?.[0]?.value || null,
      accessToken,
    };

    return user;
  }
}
