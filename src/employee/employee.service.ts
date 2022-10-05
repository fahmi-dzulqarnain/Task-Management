import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee, EmployeeDTO } from './employee.entity';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private repository: Repository<Employee>
    ) { }

    async getAll() {
        return await this.repository.find()
    }

    async createOne(dto: EmployeeDTO) {
        const newEmployee = this.repository.create(dto)
        await this.repository.save(newEmployee)
        return newEmployee
    }

    async getByID(id: number) {
        const isExist = await this.repository.findOne({
            where: {
                idPegawai: id
            }
        })

        if (!isExist) return {
            message: `There is no data with id ${id}`
        }
        
        return isExist
    }

    async updateByID(id: number, dto: Partial<EmployeeDTO>) {
        const isExist = await this.getByID(id)

        if (!isExist) return {
            message: `There is no data with id ${id}`
        }

        await this.repository.update({
            idPegawai: id
        }, dto)

        return {
            message: `Employee with id ${id} has been updated`,
            data: isExist
        }
    }

    async deleteByID(id: number) {
        const isExist = await this.getByID(id)

        if (!isExist) return {
            message: `There is no data with id ${id}`
        }

        await this.repository.delete({idPegawai: id})
        return {
            message: `Data with id ${id} has been deleted`
        }
    }
}
