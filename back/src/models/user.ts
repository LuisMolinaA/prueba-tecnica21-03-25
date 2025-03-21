import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Domicilio } from './domicilio';
import bcrypt from "bcryptjs";

@Table({ tableName: 'Users', timestamps: true })
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ allowNull: false, unique: true })
  email!: string;

  @Column({ allowNull: false })
  password!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  permisos!: boolean;

  @HasMany(() => Domicilio)
  domiciliosCreados!: Domicilio[];

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}