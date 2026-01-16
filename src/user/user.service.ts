import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    getUserEmail(userReqObject) {
        return {
            email: userReqObject?.sub
        }
  }
}
