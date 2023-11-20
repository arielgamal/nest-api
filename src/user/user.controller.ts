import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { HashPasswordPipe } from 'src/pipes/hash-password.pipe';

@Controller('/user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Get()
  async findAll() {
    const usuariosSalvos = await this.UserService.findAll();
    return usuariosSalvos;
  }

  @Post()
  createUser(
    @Body() body: CreateUserDTO,
    @Body('password', HashPasswordPipe) hashedPassword: string,
  ) {
    const newUser = new UserEntity();
    newUser.email = body.email;
    newUser.password = hashedPassword;
    newUser.acceptTerms = body.acceptTerms;
    if (body.acceptTerms === false) {
      throw new BadRequestException('Aceite os termos para prosseguir');
    }
    console.log(newUser);
    return {
      usuario: this.UserService.createUser(newUser),
      mensagem: 'Usuário criado com sucesso!',
    };
  }

  @Put('/:id')
  async updateUser(@Param('id') id: number, @Body() body: UpdateUserDTO) {
    const updatedUser = await this.UserService.updateUser(id, body);
    return {
      usuario: updatedUser,
      mensagem: 'Usuário atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    const updatedUser = await this.UserService.deleteUser(id);
    return {
      usuario: updatedUser,
      mensagem: 'Usuário excluído com sucesso!',
    };
  }

  @Get('/:id')
  async findOneBy(@Param('id') id: number) {
    const userEntity = await this.UserService.findOneBy(id);
    return {
      usuario: userEntity,
      message: 'Usuário encontrado com sucesso!',
    };
  }
}
