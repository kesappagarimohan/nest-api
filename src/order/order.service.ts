import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user/user.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository:Repository<Order>,
    private userService:UserService
  ){

  }
 async create(uId:string,createOrderDto: CreateOrderDto) {
    const user =await this.userService.findById(uId)
    const{amount,sDate,status}=createOrderDto;

    return this.orderRepository.save({
      orderAmount:amount,
      shippingDate:sDate,
      orderStatus:status,
      user:user
    })
  }

  findAll() {
    return this.orderRepository.find();
  }

  async findOne(id: number) {
    return this.orderRepository.findOne(id).
    then((data)=>{
      if(!data) throw new NotFoundException();
      return data;
    })
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update({orderId:id},{
      orderAmount:updateOrderDto.amount,
      shippingDate:updateOrderDto.sDate,
      orderStatus:updateOrderDto.status
    }).then((data)=>{
      if(!data) throw new NotFoundException();
      return data;
    })
  }

  remove(id: number) {
    return this.orderRepository.delete({orderId:id});
  }
}
