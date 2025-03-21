import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Municipio } from './municipios';

@Table({ tableName: 'Estados' })
export class Estado extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column({ allowNull: false })
  name!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  Activo!: boolean;

  @HasMany(() => Municipio)
  municipios!: Municipio[];
}
