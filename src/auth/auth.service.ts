import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from './interfaces/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async generateTokensAndSave(user: any) {
    const payload: JwtPayload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      // console.log(payload);
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });
      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token (postgres)');
      }

      const accessToken = this.jwtService.sign(
        { sub: payload.sub, email: payload.email },
        { expiresIn: '15m' }
      );
      return { accessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token (jwt)');
    }
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
