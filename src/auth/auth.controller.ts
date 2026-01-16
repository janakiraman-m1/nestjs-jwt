import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.provider';
import { AuthDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
    constructor(private authService: AuthService)  {}

    @UseGuards(AuthGuard('jwt'))
    @Post('signup')    
    signup(@Body() userObj: AuthDto) {
        return this.authService.signup(userObj)
    }


    @Post('signin')
    signin(@Body() userObj: AuthDto) {
        return this.authService.signin(userObj)
    }
}
