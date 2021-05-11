import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@ApiTags('Address')
@Controller('address')
@UseGuards(JwtAuthGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiNotFoundResponse({ description: 'No data is Created...  😿' })
  @ApiOkResponse({ description: 'Adress Data Created for ID... 😺' })
  @Post()
  create(@Request() req: any, @Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(req.user.userId, createAddressDto);
  }

  @ApiNotFoundResponse({ description: 'No data is Found...  😿' })
  @ApiOkResponse({ description: 'All Adress Data Found... 😺' })
  @Get()
  findAll(@Request() req:any) {
    return this.addressService.findAll(req.user.userId);
  }

  @ApiNotFoundResponse({ description: 'No data is Found...  😿' })
  @ApiOkResponse({ description: 'Adress Data Found for ID... 😺' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @ApiNotFoundResponse({ description: 'No data is Updated...  😿' })
  @ApiOkResponse({ description: 'Adress Data Updated for ID... 😺' })
  @ApiBody({ type: CreateAddressDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @ApiNotFoundResponse({ description: 'No data is Deleted...  😿' })
  @ApiOkResponse({ description: 'Adress Data Deleted for ID... 😺' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
