import { response } from "../helpers/response.js";
import { rutaModel } from "../models/rutaModel.js";
import { empresaBusesModel } from "../models/empresaBusesModel.js";
import { conductoresModel } from "../models/conductoresModel.js";
import { barrioModel } from "../models/barrioModel.js";
import { ciudadModel } from "../models/ciudadModel.js";
import { paisModel } from "../models/paisModel.js";
import { busesModel } from "../models/busesModel.js";

const rutaController = {};

rutaController.getAll = async (req, res) => {
  try {
    const rutas = await rutaModel.find();
    return response(res, 200, true, rutas, "lista de rutas");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

rutaController.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const rutaEncontrada = await rutaModel.findById({ _id: id });
    if (!rutaEncontrada) {
      return response(res, 404, false, "", "ruta no encontrada");
    }

    return response(res, 200, true, rutaEncontrada, "ruta encontrada");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

rutaController.postRuta = async (req, res) => {
  try {
    const { numeroRuta, empresaBuses, conductor, barrio, ciudad, pais } =
      req.body;
    const rutaRepetida = await rutaModel.findOne({ numeroRuta: numeroRuta });
    if (rutaRepetida) {
      return response(
        res,
        404,
        false,
        "",
        "el numero de ruta ya esta registrado"
      );
    }

    const empresaExiste = await empresaBusesModel.findById({
      _id: empresaBuses,
    });
    if (!empresaExiste) {
      return response(res, 404, false, "", "empresa de buses no encontrada");
    }

    const conductorExiste = await conductoresModel.findById({ _id: conductor });
    if (!conductorExiste) {
      return response(res, 404, false, "", " conductor no encontrado");
    }

    const barrioExiste = await barrioModel.findById({ _id: barrio });
    if (!barrioExiste) {
      return response(res, 404, false, "", "barrio no encontrado");
    }

    const ciudadExiste = await ciudadModel.findById({ _id: ciudad });
    if (!ciudadExiste) {
      return response(res, 404, false, "", "ciudad no encontrada");
    }

    const paisExiste = await paisModel.findById({ _id: pais });
    if (!paisExiste) {
      return response(res, 404, false, "", "pais no encontrado");
    }

    const nuevaRuta = await rutaModel.create(req.body);
    return response(res, 201, true, nuevaRuta, "ruta creada");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

rutaController.putRuta = async (req, res) => {
  try {
    const { id } = req.params;
    const { numeroRuta, empresaBuses, conductor, barrio, ciudad, pais } =
      req.body;

    const rutaEncontrada = await rutaModel.findById({ _id: id });
    if (!rutaEncontrada) {
      return response(res, 404, false, "", "ruta no encontrada");
    }

    if (rutaEncontrada.numeroRuta !== numeroRuta) {
      const rutaRepetida = await rutaModel.findOne({ numeroRuta: numeroRuta });
      if (rutaRepetida) {
        return response(
          res,
          404,
          false,
          "",
          "el numero de ruta ya esta registrado"
        );
      }
    }

    if (rutaEncontrada.empresaBuses !== empresaBuses) {
      const empresaExiste = await empresaBusesModel.findById({
        _id: empresaBuses,
      });
      if (!empresaExiste) {
        return response(res, 404, false, "", "empresa de buses no encontrada");
      }
    }

    if (rutaEncontrada.conductor !== conductor) {
      const conductorExiste = await conductoresModel.findById({
        _id: conductor,
      });
      if (!conductorExiste) {
        return response(res, 404, false, "", " conductor no encontrado");
      }
    }

    if (rutaEncontrada.barrio !== barrio) {
      const barrioExiste = await barrioModel.findById({ _id: barrio });
      if (!barrioExiste) {
        return response(res, 404, false, "", "barrio no encontrado");
      }
    }

    if (rutaEncontrada.ciudad !== ciudad) {
      const ciudadExiste = await ciudadModel.findById({ _id: ciudad });
      if (!ciudadExiste) {
        return response(res, 404, false, "", "ciudad no encontrada");
      }
    }

    if (rutaEncontrada.pais !== pais) {
      const paisExiste = await paisModel.findById({ _id: pais });
      if (!paisExiste) {
        return response(res, 404, false, "", "pais no encontrado");
      }
    }

    await rutaEncontrada.updateOne(req.body);
    return response(res, 200, true, "", "ruta actualizada");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

rutaController.deleteRuta = async (req, res) => {
  try {
    const { id } = req.params;
    const rutaEncontrada = await rutaModel.findById({ _id: id });
    if (!rutaEncontrada) {
      return response(res, 404, false, "", "ruta no encontrada");
    }

    const rutaBuses = await busesModel.findOne({ ruta: id });
    if (rutaBuses) {
      return response(res, 400, false, "", "la ruta esta asociada a un bus");
    }

    await rutaEncontrada.deleteOne();
    return response(res, 200, true, "", "ruta eliminada");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

// ** OTHERS

rutaController.getRutaByNumber = async (req, res) => {
  try {
    const { numero } = req.params;
    const rutaEncontrada = await rutaModel.findOne({ numeroRuta: numero });
    if (!rutaEncontrada) {
      return response(res, 404, false, "", "ruta no encontrada");
    }

    return response(res, 200, true, rutaEncontrada, "ruta encontrada");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

// ** LISTAR RUTAS POR CIUDAD ESP

rutaController.getRutaByCiudad = async (req, res) => {
  try {
    const { id } = req.params;
    const ciudadFound = await ciudadModel.findById({ _id: id });
    if (!ciudadFound) {
      return response(res, 404, false, "", "ciudad no encontrada");
    }

    const rutasByCiudad = await rutaModel.find({ ciudad: ciudadFound._id });
    if (rutasByCiudad.length === 0) {
      return response(
        res,
        404,
        false,
        "",
        "la ciudad no tiene rutas asociadas"
      );
    }

    return response(
      res,
      200,
      true,
      rutasByCiudad,
      "rutas que estan asociadas en la ciudad"
    );
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

export default rutaController;
