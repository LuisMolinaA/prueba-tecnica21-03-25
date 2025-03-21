import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Estado } from './estados';
import { Domicilio } from './domicilio';

@Table({ tableName: 'Municipios' })

export class Municipio extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @ForeignKey(() => Estado)
  @Column({ allowNull: false })
  EstadoID!: number;

  @BelongsTo(() => Estado)
  estado!: Estado;

  @Column({ allowNull: false })
  name!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  Activo!: boolean;

  @HasMany(() => Domicilio)
  domicilios!: Domicilio[];
}