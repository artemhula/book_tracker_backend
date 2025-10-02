import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import express from 'express';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTemporaryRedirectResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Redirect to Google OAuth2 login page',
  })
  @ApiTemporaryRedirectResponse({
    description: 'Redirect to Google OAuth2 login page',
  })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @ApiOperation({
    summary: 'Google OAuth2 callback',
    description:
      'Handles the OAuth2 callback from Google, generates JWT tokens, and redirects to the frontend with the access token.',
  })
  @ApiOkResponse({
    description: 'User authenticated successfully and tokens generated.',
  })
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

  @ApiOperation({
    summary: 'Refresh the access token using the refresh token cookie.',
  })
  @ApiOkResponse({
    description: 'Access token refreshed successfully.',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing refresh token.',
  })
  @Post('refresh')
  async refreshAccessToken(@Req() req: express.Request) {
    const refreshToken = req.cookies['refreshToken'];
    const { accessToken } =
      await this.authService.refreshAccessToken(refreshToken);

    return { accessToken };
  }

  @ApiOperation({
    summary: 'Logout the user',
    description: 'Clears the refresh token cookie to log out the user.',
  })
  @ApiOkResponse({
    description: 'User logged out successfully.',
  })
  @Post('logout')
  logout(@Res() res: express.Response) {
    res.clearCookie('refreshToken');
    res.json({ ok: true });
  }
}
