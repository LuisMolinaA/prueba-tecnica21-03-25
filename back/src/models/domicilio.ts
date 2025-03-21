import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Municipio } from './municipios';
import { Estado } from './estados'; // Asegúrate de importar el modelo Estado
import { User } from './user'; // Asegúrate de que esta importación esté correcta

@Table({ tableName: 'Domicilios', timestamps: true })
export class Domicilio extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @ForeignKey(() => Municipio)
  @Column({ allowNull: false })
  municipioID!: number;

  @BelongsTo(() => Municipio)
  municipio!: Municipio;

  @ForeignKey(() => Estado) 
  @Column({ allowNull: false })
  estadoID!: number;

  @BelongsTo(() => Estado) 
  estado!: Estado;

  @Column({ allowNull: false })
  colonia!: string;

  @Column({ allowNull: false })
  domicilio!: string;

  @Column({ allowNull: false })
  numExterior!: string;

  @Column({ allowNull: false })
  entreCalles!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  Activo!: boolean;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  usuarioCreo!: number;

  @BelongsTo(() => User)
  usuario!: User;
}
