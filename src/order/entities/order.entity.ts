import { UserEntity } from "src/auth/entities/user.entity";
import { OrderDetail } from "src/order-details/entities/order-detail.entity";
import { Payment } from "src/payment/entities/payment.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'order'})
export class Order {

    @PrimaryGeneratedColumn({type:'integer'})
    orderId:number

    @Column({type:'decimal',precision:10})
    orderAmount:number

    @Column({type:'datetime',default:()=>'CURRENT_TIMESTAMP'})
    orderDate:Date

    @Column({type:'date',nullable:true})
    shippingDate:string;

    @Column({default:'pending'})
    orderStatus:string;

    @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.userId)
    @JoinColumn({name:'userId'})
    user:UserEntity;

    

    @OneToMany(()=>OrderDetail,(orderDetail)=>orderDetail.order)
    orderDetail:OrderDetail[];

    @OneToMany(()=>Payment,(payment)=>payment.order)
    payment:Payment[];
}
