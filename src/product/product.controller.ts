import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiTags, ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt.guard";

@ApiTags("Product")
@Controller("product")
// @UseGuards(JwtAuthGuard) : apply the guard to all the routes
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiNotFoundResponse({ description: "No data is Created...  😿" })
  @ApiOkResponse({ description: "Product Data Created... 😺" })
  @Post("bulk")
  createBulk() {
    return this.productService.bulkCreate();
  }

  @ApiNotFoundResponse({ description: "No data is found...  😿" })
  @ApiOkResponse({ description: "All Product Data found... 😺" })
  @Get()
  findAll(
    @Query("page") page: number = 1,
    @Query("size") size: number = 20,
    @Query("serachByTerm") serachByTerm: string
  ) {
    return this.productService.findAll(page, size, serachByTerm);
  }

  @ApiNotFoundResponse({
    description: "No data is found for the specified ID... 😿",
  })
  @ApiOkResponse({ description: "Product Data found... 😺" })
  @Get("search")
  findByQuery(@Query("q") query: string) {
    return this.productService.fingByQuery(query);
  }

  @ApiNotFoundResponse({
    description: "No data is found for the specified ID... 😿",
  })
  @ApiOkResponse({ description: "Product Data found... 😺" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  @ApiNotFoundResponse({ description: "No data is Updated...  😿" })
  @ApiOkResponse({ description: "Product Data Updated for ID... 😺" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @ApiNotFoundResponse({ description: "No data is Deleted...  😿" })
  @ApiOkResponse({ description: "Product Data Deleted for ID... 😺" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}
