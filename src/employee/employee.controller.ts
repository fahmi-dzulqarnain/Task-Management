import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeeDTO } from './employee.entity';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
    constructor(private service: EmployeeService) {}

    @Get()
    getAll() {
        return this.service.getAll()
    }

    @Get(':id')
    getByID(@Param('id') id: string) {
        return this.service.getByID(parseInt(id))
    }

    @Post()
    createNew(@Body() newEmployee: EmployeeDTO) {
        return this.service.createOne(newEmployee)
    }

    @Put(':id')
    updateByID(@Param('id') id: string, @Body() employee: Partial<EmployeeDTO>) {
        const parsedID = Number(id)

        if (parsedID == NaN) return {
            message: "Employee's id must be a number"
        }

        return this.service.updateByID(parsedID, employee)
    }

    @Delete(':id')
    deleteByID(@Param('id') id: string) {
        const parsedID = Number(id)

        if (parsedID == NaN) return {
            message: "Employee's id must be a number"
        }

        return this.service.deleteByID(parsedID)
    }
}
