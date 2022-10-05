import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['email'])

export class Employee {
    @PrimaryGeneratedColumn()
    idPegawai: number

    @Column({length : 100}) 
    fullName: string

    @Column({length : 100})
    email: string

    @Column({length : 15})
    phoneNumber: string

    @Column({length: 20})
    status: StatusPegawai
}

enum StatusPegawai {
    active = "Pegawai Aktif",
    inactive = "Tidak Aktif"
}

export class EmployeeDTO {
    @IsString()
    @IsNotEmpty()
    fullName: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsPhoneNumber()
    phoneNumber: string

    @IsString()
    @IsNotEmpty()
    @IsEnum(StatusPegawai)
    status: StatusPegawai
}