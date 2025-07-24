import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// JWT ile koruma sağlar
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {} 