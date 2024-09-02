import { busesModel } from "../models/busesModel.js";
import { conductoresModel } from "../models/conductoresModel.js";
import { empresaBusesModel } from "../models/empresaBusesModel.js";
import { rutaModel } from "../models/rutaModel.js";
import { response } from "../helpers/response.js";

const busesController = {};

busesController.getAll = async (req, res) => {
  try {
    const buses = await busesModel.find();
    return response(res, 200, true, buses, "lista de buses");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

busesController.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const busEncontrado = await busesModel.findById({ _id: id });
    if (!busEncontrado) {
      return response(res, 404, false, "", "bus no encontrado");
    }

    return response(res, 200, true, busEncontrado, "bus encontrado");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

busesController.postBus = async (req, res) => {
  try {
    const { placa, conductores, empresa, ruta } = req.body;

    const placaRepetida = await busesModel.findOne({ placa: placa });
    if (placaRepetida) {
      return response(res, 400, false, "", "la placa ya esta registrada");
    }

    const conductorExiste = await conductoresModel.findById({
      _id: conductores,
    });
    if (!conductorExiste) {
      return response(res, 404, false, "", "conductor no encontrado");
    }

    const empresaExiste = await empresaBusesModel.findById({ _id: empresa });
    if (!empresaExiste) {
      return response(res, 404, false, "", "empresa de buses no encontrada");
    }

    const rutaExiste = await rutaModel.findById({ _id: ruta });
    if (!rutaExiste) {
      return response(res, 404, false, "", "ruta no encontrada");
    }

    const nuevoBus = await busesModel.create(req.body);
    return response(res, 201, true, nuevoBus, "bus creado");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

busesController.putBus = async (req, res) => {
  try {
    const { id } = req.params;
    const { placa, conductores, empresa, ruta } = req.body;

    const busEncontrado = await busesModel.findById({ _id: id });
    if (!busEncontrado) {
      return response(res, 404, false, "", "bus no encontrado");
    }

    if (busEncontrado.placa !== placa) {
      const placaRepetida = await busesModel.findOne({ placa: placa });
      if (placaRepetida) {
        return response(res, 400, false, "", "la placa ya esta registrada");
      }
    }

    if (busEncontrado.conductores !== conductores) {
      const conductorExiste = await conductoresModel.findById({
        _id: conductores,
      });
      if (!conductorExiste) {
        return response(res, 404, false, "", "conductor no encontrado");
      }
    }

    if (busEncontrado.empresaBuses !== empresa) {
      const empresaExiste = await empresaBusesModel.findById({ _id: empresa });
      if (!empresaExiste) {
        return response(res, 404, false, "", "empresa de buses no encontrado");
      }
    }

    if (busEncontrado.ruta !== ruta) {
      const rutaExiste = await rutaModel.findById({ _id: ruta });
      if (!rutaExiste) {
        return response(res, 404, false, "", "ruta no encontrada");
      }
    }

    await busEncontrado.updateOne(req.body);
    return response(res, 200, true, "", "bus actualizado");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

busesController.deleteBus = async (req, res) => {
  try {
    const { id } = req.params;
    const busEncontrado = await busesModel.findById({ _id: id });
    if (!busEncontrado) {
      return response(res, 404, false, "", "bus no encontrado");
    }

    await busEncontrado.deleteOne();
    return response(res, 200, true, "", "bus eliminado");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

// **  OTHERS

busesController.getBusesByPlaca = async (req, res) => {
  try {
    const { placa } = req.params;
    const busEncontrado = await busesModel.findOne({ placa: placa });
    if (!busEncontrado) {
      return response(res, 404, false, "", "bus no encontrado");
    }

    return response(res, 200, true, busEncontrado, "bus no encontrado");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

// ** LISTAR TODOS LOS BUSES DE UNA RUTA ESP

busesController.bussesByRuta = async (req, res) => {
  try {
    const { id } = req.params;
    const rutaFound = await rutaModel.findById({ _id: id });
    if (!rutaFound) {
      return response(res, 404, false, "", "ruta no encontrada");
    }

    const busesRuta = await busesModel.find({ ruta: rutaFound._id });
    if (busesRuta.length === 0) {
      return response(
        res,
        400,
        false,
        "",
        "no hay buses registrados en esta ruta"
      );
    }

    return response(res, 200, true, busesRuta, "lista de buses de la ruta");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

// ** LISTAR TODOS LOS BUSES DE UNA EMPRESA ESP

busesController.busesByEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const empresaFound = await empresaBusesModel.findById({ _id: id });
    if (!empresaFound) {
      return response(res, 404, false, "", "empresa no encontrada");
    }

    const busesEmpresa = await busesModel.find({
      empresaBuses: empresaFound._id,
    });
    if (busesEmpresa.length === 0) {
      return response(
        res,
        404,
        false,
        "",
        "la empresa no tiene buses registrados"
      );
    }

    return response(
      res,
      200,
      true,
      busesEmpresa,
      "lista de buses registrados en la empresa"
    );
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

// ** TOTAL DE GANANCIAS DE UN BUS

busesController.getGananciasByBus = async (req, res) => {
  try {
    const { id } = req.params;
    const { costoPasaje, numeroPasajeros, costoGasolina } = req.body;

    const busEncontrado = await busesModel.findById({ _id: id });
    if (!busEncontrado) {
      return response(res, 404, false, "", "bus no encontrado");
    }

    if (costoPasaje <= 0 || numeroPasajeros <= 0 || costoGasolina <= 0) {
      return response(
        res,
        400,
        false,
        "",
        "ingrese valores validos y positivos"
      );
    }

    const totalGananciasSinGasolina = costoPasaje * numeroPasajeros;
    const totalGanancias = totalGananciasSinGasolina - costoGasolina;

    return response(
      res,
      200,
      true,
      "",
      "total de ganancias sin tanquear el bus $ " +
        totalGananciasSinGasolina +
        " total de ganancias con el bus tanqueado $ " +
        totalGanancias
    );
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

export default busesController;
