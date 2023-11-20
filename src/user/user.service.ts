import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { AllUsersDTO } from './dto/allUsers.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { CreateUserDTO } from './dto/createUser.dto';
import { FindByOneDTO } from './dto/findByOne.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    const savedUsers = await this.userRepository.find();
    const usersList = savedUsers.map((user) => {
      return new AllUsersDTO(user.id, user.name, user.email, user.acceptTerms);
    });
    return usersList;
  }

  async createUser(userEntity: CreateUserDTO) {
    await this.userRepository.save(userEntity);
  }

  async updateUser(id: number, userEntity: UpdateUserDTO) {
    await this.userRepository.update(id, userEntity);
  }

  async deleteUser(id: number) {
    await this.userRepository.delete(id);
  }

  async findOneBy(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (user === null) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    const userEntity = new FindByOneDTO(
      user.id,
      user.name,
      user.email,
      user.createdAt,
      user.acceptTerms,
    );
    return userEntity;
  }

  async findbyEmail(email: string) {
    const checkEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (checkEmail === null)
      throw new NotFoundException('O email não foi encontrado.');
    return checkEmail;
  }
}
