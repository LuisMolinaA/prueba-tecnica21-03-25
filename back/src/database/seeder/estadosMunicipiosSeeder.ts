import { Sequelize } from "sequelize-typescript";
import { Estado } from "../../models/estados";
import { Municipio } from "../../models/municipios";
import signale from "signale";

const estadosYMunicipios = [
  { name: "Aguascalientes", municipios: ["Aguascalientes", "Calvillo", "Jesús María"] },
  { name: "Baja California", municipios: ["Tijuana", "Mexicali", "Ensenada", "Tecate"] },
  { name: "Campeche", municipios: ["Campeche", "Carmen", "Champotón"] },
  { name: "Chiapas", municipios: ["Tuxtla Gutiérrez", "Tapachula", "San Cristóbal de las Casas"] },
  { name: "Chihuahua", municipios: ["Chihuahua", "Ciudad Juárez", "Delicias", "Parral"] },
  { name: "Coahuila", municipios: ["Saltillo", "Torreón", "Monclova", "Piedras Negras"] },
  { name: "Durango", municipios: ["Durango", "Gómez Palacio", "Lerdo"] },
  { name: "Guanajuato", municipios: ["León", "Irapuato", "Celaya", "Salamanca"] },
  { name: "Guerrero", municipios: ["Acapulco", "Chilpancingo", "Iguala"] },
  { name: "Hidalgo", municipios: ["Pachuca", "Tulancingo", "Tula de Allende"] },
];

export const seedEstadosMunicipios = async (sequelize: Sequelize) => {
  try {
    await sequelize.sync(); 

    for (const estadoData of estadosYMunicipios) {
      const estado = await Estado.create({
        name: estadoData.name,
        Activo: true,
      });

      for (const municipioName of estadoData.municipios) {
        await Municipio.create({
          EstadoID: estado.id, 
          name: municipioName,
          Activo: true,
        });
      }
    }

    signale.success("Estados y Municipios insertados correctamente.");
  } catch (error) {
    signale.error("Error en el seeder:", error);
  }
};
