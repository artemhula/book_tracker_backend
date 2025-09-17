import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const user = await this.authService.findUserOrCreate({
      email: req.user.email,
      fullName: req.user.name,
      avatarUrl: req.user.avatarUrl,
    });

    return this.authService.generateTokensAndSave(user);
  }

  @Post('refresh')
  async refreshAccessToken(@Body('refreshToken') refreshToken: string) {
    const accessToken = await this.authService.refreshAccessToken(refreshToken);
    return accessToken;
  }
}
