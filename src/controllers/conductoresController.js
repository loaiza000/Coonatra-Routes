import { response } from "../helpers/response.js";
import { busesModel } from "../models/busesModel.js";
import { ciudadModel } from "../models/ciudadModel.js";
import { conductoresModel } from "../models/conductoresModel.js";
import { empresaBusesModel } from "../models/empresaBusesModel.js";
import { rutaModel } from "../models/rutaModel.js";

const conductoresController = {};

conductoresController.getAll = async (req, res) => {
  try {
    const conductores = await conductoresModel.find();
    return response(res, 200, true, conductores, "lista de conductores");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

conductoresController.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const conductorEncontrado = await conductoresModel.findById({ _id: id });
    if (!conductorEncontrado) {
      return response(res, 404, false, "", "conductor no encontrado");
    }

    return response(
      res,
      200,
      true,
      conductorEncontrado,
      "conductor encontrado"
    );
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

conductoresController.postConductor = async (req, res) => {
  try {
    const { correo, empresaBuses, ciudad } = req.body;
    const correoRepetido = await conductoresModel.findOne({ correo: correo });
    if (correoRepetido) {
      return response(res, 400, false, "", "el correo ya esta registrado");
    }

    const empresaExiste = await empresaBusesModel.findById({
      _id: empresaBuses,
    });
    if (!empresaExiste) {
      return response(res, 404, false, "", "empresa no encontrada");
    }

    const ciudadExiste = await ciudadModel.findById({ _id: ciudad });
    if (!ciudadExiste) {
      return response(res, 404, false, "", "ciudad no encontrada");
    }

    const nuevoConductor = await conductoresModel.create(req.body);
    return response(res, 201, false, nuevoConductor, "conductor creado");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

conductoresController.putConductor = async (req, res) => {
  try {
    const { id } = req.params;
    const { correo, empresa, ciudad } = req.body;
    const conductorEncontrado = await conductoresModel.findById({ _id: id });
    if (!conductorEncontrado) {
      return response(res, 404, false, "", "conductor no encontrado");
    }

    if (conductorEncontrado.correo !== correo) {
      const correoRepetido = await conductoresModel.findOne({ correo: correo });
      if (correoRepetido) {
        return response(res, 400, false, "", "el correo ya esta registrado");
      }
    }

    if (conductorEncontrado.empresaBuses !== empresa) {
      const empresaExiste = await empresaBusesModel.findById({ _id: empresa });
      if (!empresaExiste) {
        return response(res, 404, false, "", "empresa de buses no encontrada");
      }
    }

    if (conductorEncontrado.ciudad !== ciudad) {
      const ciudadExiste = await ciudadModel.findById({ _id: ciudad });
      if (!ciudadExiste) {
        return response(res, 404, false, "", "ciudad no encontrada");
      }
    }

    await conductorEncontrado.updateOne(req.body);
    return response(res, 200, true, "", "conductor actualizado");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

conductoresController.deleteConductor = async (req, res) => {
  try {
    const { id } = req.params;
    const conductorEncontrado = await conductoresModel.findById({ _id: id });
    if (!conductorEncontrado) {
      return response(res, 404, false, "", "conductor no encontrado");
    }

    const conductorBuses = await busesModel.findOne({ conductores: id });
    if (conductorBuses) {
      return response(
        res,
        400,
        false,
        "",
        "el conductor esta asociado a un bus"
      );
    }

    const conductorRuta = await rutaModel.findOne({ conductores: id });
    if (conductorRuta) {
      return response(
        res,
        400,
        false,
        "",
        "el conductor esta asociado a una ruta"
      );
    }

    await conductorEncontrado.deleteOne();
    return response(res, 200, true, "", "conductor eliminado");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

// ** OTHERS

conductoresController.getConductorByName = async (req, res) => {
  try {
    const { name } = req.params;
    const conductorEncontrado = await conductoresModel.findOne({
      nombre: name,
    });
    if (!conductorEncontrado) {
      return response(res, 404, false, "", "conductor no encontrado");
    }

    return response(
      res,
      200,
      true,
      conductorEncontrado,
      "conductor encontrado"
    );
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

// ** LISTAR CONDUCTORES POR EMPRESA ESP

conductoresController.getConductoresByEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const empresaFound = await empresaBusesModel.findById({ _id: id });
    if (!empresaFound) {
      return response(res, 404, false, "", "ruta no encontrada");
    }

    const conductoresByEmpresa = await conductoresModel.find({
      empresaBuses: empresaFound._id,
    });
    if (conductoresByEmpresa.length === 0) {
      return response(
        res,
        404,
        false,
        "",
        "la empresa no tiene conductores asociados"
      );
    }

    return response(
      res,
      200,
      true,
      conductoresByEmpresa,
      "lista de conductores asociados a la empresa"
    );
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

export default conductoresController;
