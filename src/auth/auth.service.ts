import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async generateJwt(user: any) {
    const payload = { sub: user.id, username: user.name };
    return await this.jwtService.signAsync(payload);
  }

  async createUser(data: {
    email: string;
    fullName?: string;
    avatarUrl?: string;
  }) {
    return await this.prisma.user.create({
      data: {
        email: data.email,
        fullName: data.fullName,
        avatarUrl: data.avatarUrl,
      },
    });
  }

  async findUser(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findUserOrCreate(data: {
    email: string;
    fullName?: string;
    avatarUrl?: string;
  }) {
    const user = await this.findUser(data.email);
    if (!user) {
      return await this.createUser({
        email: data.email,
        fullName: data.fullName,
        avatarUrl: data.avatarUrl,
      });
    }
    return user;
  }
}
