import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
    description: 'Unique identifier for the user',
  })
  id: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
  })
  email: string;

  @ApiProperty({
    example: 'Name Surname',
    description: 'Name of the user',
  })
  name: string;

  @ApiProperty({
    example: '2025-09-05T10:34:56.789Z',
    description: 'Timestamp when the user was created',
  })
  createdAt: string;

  @ApiProperty({
    example: '2025-09-06T10:34:56.789Z',
    description: 'Timestamp when the user was last updated',
  })
  updatedAt: string;
}
