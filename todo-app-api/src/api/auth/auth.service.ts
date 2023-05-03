import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, MoreThan, Repository } from 'typeorm';

// Services
import { MailService } from '../../mailgun/mailgun.service';
import { UserService } from '../user/user.service';

// Configs & Helpers
import { feWebConfig } from '../../config';
import { compareBcryptHash, createBcryptHash } from '../../helpers';

// Dtos
import {
  RegisterUserByEmailDto,
  LoginByEmailDto,
  VerifyEmailDto,
  VerifyForgotPasswordDto,
} from './dto';

// Models
import { Verification, VerificationType } from '../../entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
    private readonly jwtService: JwtService,
    private readonly mailgunService: MailService,
  ) {}

  async findOneVerification(
    fields: FindOptionsWhere<Verification>,
  ): Promise<Verification> {
    const verification = await this.verificationRepository.findOne({
      where: fields,
    });
    if (!verification) throw new NotFoundException('Verification is not found');
    return verification;
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findOne({ email });
    await this.verificationRepository.softDelete({
      userId: user.id,
      type: VerificationType.FORGOT_PASSWORD,
    });
    const verification = await this.verificationRepository
      .create({ userId: user.id, type: VerificationType.FORGOT_PASSWORD })
      .save();

    const link = `${feWebConfig().url}/forgot-password?token=${
      verification.randomKey
    }&id=${user.id}`;
    this.mailgunService.sendmailForgotPassword(link, user.email);
    return link;
  }

  async verifyForgotPassword(dto: VerifyForgotPasswordDto) {
    const verification = await this.findOneVerification({
      userId: dto.id,
      expiredAt: MoreThan(new Date()),
    });
    const isValid = await compareBcryptHash(dto.token, verification.token);
    if (!isValid) throw new BadRequestException('Invalid  token');
    const user = await this.userService.update(verification.userId, {
      password: await createBcryptHash(dto.password),
    });
    this.verificationRepository.softDelete(verification.id);
    return user;
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const verification = await this.findOneVerification({
      userId: dto.id,
    });
    const isValid = await compareBcryptHash(dto.token, verification.token);
    if (!isValid) throw new BadRequestException('Invalid  token');
    await this.userService.update(dto.id, { isVerified: true });
    this.verificationRepository.softDelete(verification.id);

    return {
      success: true,
    };
  }

  async loginByEmail(dto: LoginByEmailDto) {
    const user = await this.userService.findOne({ email: dto.email });
    const isValid = await compareBcryptHash(dto.password, user.password);
    if (!isValid) throw new BadRequestException('Email or password is wrong');
    return {
      access_token: await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
        isVerified: user.isVerified,
      }),
      user,
    };
  }

  async registerUserByEmail(dto: RegisterUserByEmailDto) {
    const existedUser = await this.userService.findOne(
      { email: dto.email },
      false,
    );
    if (existedUser) throw new BadRequestException('Email da ton tai');
    const user = await this.userService.create(dto);
    const verification = await this.verificationRepository
      .create({ userId: user.id, type: VerificationType.VERIFY_EMAIL })
      .save();

    const link = `${feWebConfig().url}/verify-email?token=${
      verification.randomKey
    }&id=${user.id}`;
    this.mailgunService.sendVerifyEmail(link, user.email);
    return {
      access_token: await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
        isVerified: user.isVerified,
      }),
      user,
    };
  }
}
