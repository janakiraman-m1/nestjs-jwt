import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";



@Injectable()
export class JWTStrategyService extends PassportStrategy(Strategy, 'JWT') {
   constructor(config: ConfigService){
    const JWT_SECRET_KEY = config.get('JWT_SECRET_KEY');
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET_KEY,
        ignoreExpiration: false
    });
   }

   async validate(payload: any) {
        console.log(payload, 'payload')
        return payload;
   }
}