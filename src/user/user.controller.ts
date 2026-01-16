import { Controller, createParamDecorator, ExecutionContext, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('JWT') {}

const GetUser = createParamDecorator(
  (
    data: string | undefined,
    ctx: ExecutionContext,
  ) => {
    const request: Express.Request = ctx
      .switchToHttp()
      .getRequest();

    return request;
  },
);

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('email')
  getUserEmail(@GetUser() req) {
    return this.userService.getUserEmail(req.user);
  }
}
