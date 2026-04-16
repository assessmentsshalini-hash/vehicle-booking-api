import { Global, Module } from '@nestjs/common';
import { ResponseService } from 'src/common/services/response.service';

@Global()
@Module({
  providers: [ResponseService],
  exports: [ResponseService],
})
export class CommonModule {}
