import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RoleGuard } from './common/guard/role.guard';
import { AuthorizationGuard } from './common/guard/authorization.guard';
import { Roles } from './common/decorator/role.decorator';

/*
  apply guard for all routes in this controller
*/
@UseGuards(AuthorizationGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('data')
  @Roles(['admin'])
  @UseGuards(RoleGuard)
  getdata(): string {
    return 'This is for admin only';
  }
}
