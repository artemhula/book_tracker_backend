import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: express.Response) {
    const user = await this.authService.findUserOrCreate({
      email: req.user.email,
      fullName: req.user.name,
      avatarUrl: req.user.avatarUrl,
    });

    const { accessToken, refreshToken } =
      await this.authService.generateTokensAndSave(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });

    res.redirect(
      `${process.env.FRONTEND_URL_CALLBACK}?accessToken=${accessToken}`
    );
  }

  @Post('refresh')
  async refreshAccessToken(@Req() req: express.Request) {
    const refreshToken = req.cookies['refreshToken'];
    const { accessToken } =
      await this.authService.refreshAccessToken(refreshToken);

    return { accessToken };
  }

  @Post('logout')
  logout(@Res() res: express.Response) {
    res.clearCookie('refreshToken');
    return { ok: true };
  }
}
