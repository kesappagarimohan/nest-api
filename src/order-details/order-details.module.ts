import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Order } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/order.service';


@Module({
  imports:[TypeOrmModule.forFeature([OrderDetail,Order])],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService,OrderService]
})
export class OrderDetailsModule {}
