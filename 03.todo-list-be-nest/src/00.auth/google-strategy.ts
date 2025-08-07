import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";


interface GoogleProfile {
  displayName: string;
  emails: { value: string }[];
  photos: { value: string }[];
  id: string;
  provider: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
      scope: ["email", "profile"],
    });
  }
  
  validate(accessToken: string, refreshToken: string, profile: GoogleProfile) {
    return {
      id: profile.id,
      provider:profile.provider,
      name: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos.length > 0 ? profile.photos[0].value : undefined,
    };
  }
}