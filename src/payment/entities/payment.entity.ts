import { UserEntity } from "src/auth/entities/user.entity";
import { UserService } from "src/auth/user/user.service";
import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'payment'})
export class Payment {

    @PrimaryGeneratedColumn()
    paymentId:number

    @Column({default:'pending'})
    paymentStatus:string

    @Column({default:0,type:'decimal',precision:10})
    payAmount:number

    @Column()
    paymentData:string

    @ManyToOne(()=>Product,(product)=>product.productId)
    @JoinColumn({name:'productId'})
    product:Product

    @ManyToOne(()=>Order,(order)=>order.orderId)
    @JoinColumn({name:'orderId'})
    order:Order;

    @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.userId)
    @JoinColumn({name:'userId'})
    user:UserEntity


}
