import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiNotFoundResponse({ description: 'No data is Created...  😿' })
  @ApiOkResponse({ description: 'Order Data Created for ID... 😺' })
  @Post()
  create(@Request() req:any,@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(req.user.userId,req.body.productId,createOrderDto);
  }

  @ApiNotFoundResponse({ description: 'No data is Found...  😿' })
  @ApiOkResponse({ description: 'All Order Data Found... 😺' })
  @Get()
  findAll(@Request() req:any) {
    return this.orderService.findAll(req.user.userId);
  }

  @ApiNotFoundResponse({ description: 'No data is Found...  😿' })
  @ApiOkResponse({ description: 'Order Data found for ID... 😺' })
  @Get(':id')
  findOne(@Param('id') id: string,) {
    return this.orderService.findOne(+id)
  }

  @ApiNotFoundResponse({ description: 'No data is Updated...  😿' })
  @ApiOkResponse({ description: 'Order Data Updated for ID... 😺' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @ApiNotFoundResponse({ description: 'No data is Deleted...  😿' })
  @ApiOkResponse({ description: 'Product Data Deleted for ID... 😺' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
