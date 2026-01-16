import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./auth.dto";
import * as argon from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable({})
export class AuthService {
    constructor(private readonly prisma: PrismaService, private config: ConfigService, private jwt: JwtService) {}

    async signup(userObj: AuthDto) {
        const hash = await argon.hash(userObj.password);
        console.log(hash, ' hash');
        let user =  await this.prisma.user.create({
            data: {
                email: userObj.email,
                hash,
                firstName: '12',
            }
        });


        return this.generateToken(user.email);
    }

    async signin(userObj: AuthDto) {
        await argon.hash(userObj.password);
        let user = await this.prisma.user.findUnique({where: {
              email: userObj.email
            }
        });
        if(!user) throw new ForbiddenException({ message: "User doesn't Exist in the system"});

        const pwdMatch = await argon.verify(user.hash, userObj.password);

        if(!pwdMatch) throw new ForbiddenException("Credentials are incorrect");

         return this.generateToken(user.email);
    }

    async generateToken(email: string) {
        const secretVal = this.config.get('JWT_SECRET_KEY');
        const payload = {
            sub: email
        }

        const token =  await this.jwt.signAsync(payload, {
            secret: secretVal,
            expiresIn: '20m'
        });
        return {
          token
        }
    }

}
