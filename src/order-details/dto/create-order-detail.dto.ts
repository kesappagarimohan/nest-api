import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDetailDto {

    @ApiProperty()
    Amount:number

    @ApiProperty()
    qty:number

    @ApiProperty()
    order:number

    @ApiProperty()
    product:number

    @ApiProperty()
    user:string


}
