import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface UserPayload {
  sub: number;
  userName: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(email: string, password: string) {
    const user = await this.userService.findbyEmail(email);

    const authenticated = await bcrypt.compare(password, user.password);

    if (!authenticated) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload: UserPayload = {
      sub: user.id, //subject == sujeito
      userName: user.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
