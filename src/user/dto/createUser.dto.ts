import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  email: string;

  @IsString()
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password too weak. It must contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'É preciso aceitar os termos.' })
  @IsBoolean({ message: 'É preciso aceitar os termos de serviço.' })
  acceptTerms: boolean;
}
