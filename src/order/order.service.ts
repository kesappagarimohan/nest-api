import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user/user.service';
import { ProductService } from 'src/product/product.service';

import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository:Repository<Order>,
    private userService:UserService,private productService:ProductService
   
  ){

  }
 async create(userId:string,productId:number,createOrderDto: CreateOrderDto) {
    const user =await this.userService.findById(userId);
    const product = await this.productService.findOne(productId)
    const{amount,sDate,status}=createOrderDto;

    return this.orderRepository.save({
      orderAmount:amount,
      shippingDate:sDate,
      orderStatus:status,
      userId:user,
      productId:product

    })
  }

  async findAll(userId:string) {
    const user=await this.userService.findById(userId)
    return this.orderRepository.find({where:{userId:user}});
  }

  async findOne(userId: string, id: number) {
    const user = await this.userService.findById(userId)
    return this.orderRepository.findOne({
      where: { userId: user, orderId: id }
    }).then((data) => {
      if (!data) throw new NotFoundException();
      return data;
      
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    
    
    return this.orderRepository.update({orderId:id},{
    
      orderAmount:updateOrderDto.amount,
      shippingDate:updateOrderDto.sDate,
      orderStatus:updateOrderDto.status,
      
    }).then((data)=>{
      if(!data) throw new NotFoundException();
      return data;
    })
  }

  remove(id: number) {
    return this.orderRepository.delete({orderId:id});
  }
}
