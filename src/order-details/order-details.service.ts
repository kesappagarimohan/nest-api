import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user/user.service';

import { Repository } from 'typeorm';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetail } from './entities/order-detail.entity';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail)private orderDetailrepository:Repository<OrderDetail>,private userService:UserService
  ){}

 async create(uId:string,createOrderDetailDto: CreateOrderDetailDto) {
    const user = await this.userService.findById(uId)
    
    const {Amount,qty} = createOrderDetailDto;
    return this.orderDetailrepository.save({
      orderAmount:Amount,
      orderQty:qty,
      user:user,
        
    })
  }

  findAll() {
    return this.orderDetailrepository.find();
  }

 async findOne(id: number) {
    return this.orderDetailrepository.findOne(id).then((data)=>{
      if(!data) throw new NotFoundException();
      return data;
    });
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailrepository.update({orderDetailId:id},{
      orderAmount:updateOrderDetailDto.Amount,
      orderQty:updateOrderDetailDto.qty
    }).then((data)=>{
      if(!data) throw new NotFoundException();
      return data;
    });
  }

  remove(id: number) {
    return this.orderDetailrepository.delete({orderDetailId:id});
  }
}
