import { barrioModel } from "../models/barrioModel.js";
import { ciudadModel } from "../models/ciudadModel.js";
import { paisModel } from "../models/paisModel.js";
import { rutaModel } from "../models/rutaModel.js";
import { response } from "../helpers/response.js";

const barrioController = {};

barrioController.getAll = async (req, res) => {
  try {
    const barrios = await barrioModel.find();
    return response(res, 200, true, barrios, "lsita de barrios");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

barrioController.findById = async (req, res) => {
  try {
    const { id } = req.params;
    const barrioEncontrado = await barrioModel.findById({ _id: id });
    if (!barrioEncontrado) {
      return response(res, 404, false, "", "barrio no encontrado");
    }

    return response(res, 200, true, barrioEncontrado, "barrio encontrado");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

barrioController.postBarrio = async (req, res) => {
  try {
    const { nombre, ciudad, pais } = req.body;
    const nombreRepetido = await barrioModel.findOne({ nombre: nombre });
    if (nombreRepetido) {
      return response(
        res,
        400,
        false,
        "",
        "el nombre del barrio ya esta registrado"
      );
    }

    const ciudadExiste = await ciudadModel.findById({ _id: ciudad });
    if (!ciudadExiste) {
      return response(res, 404, false, "", "ciduad no encontrada");
    }

    const paisExiste = await paisModel.findById({ _id: pais });
    if (!paisExiste) {
      return response(res, 404, false, "", "pais no encontrado");
    }

    const nuevoBarrio = await barrioModel.create(req.body);
    return response(res, 201, true, nuevoBarrio, "barrio creado");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

barrioController.putBarrio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, ciudad, pais } = req.body;

    const barrioEncontrado = await barrioModel.findById({ _id: id });
    if (!barrioEncontrado) {
      return response(res, 404, false, "", "barrio no encontrado");
    }

    if (barrioEncontrado.nombre !== nombre) {
      const nombreRepetido = await barrioModel.findOne({ nombre: nombre });
      if (nombreRepetido) {
        return response(res, 400, false, "", "el nombre yaz esta registrado");
      }
    }

    if (barrioEncontrado.ciudad !== ciudad) {
      const ciudadExiste = await ciudadModel.findById({ _id: ciudad });
      if (!ciudadExiste) {
        return response(res, 404, false, "", "ciudad no encontrada");
      }
    }

    if (barrioEncontrado.pais !== pais) {
      const paisExiste = await paisModel.findById({ _id: id });
      if (!paisExiste) {
        return response(res, 404, false, "", "pais no encontrado");
      }
    }

    await barrioEncontrado.updateOne(req.body);
    return response(res, 200, true, "", "barrio actualizado");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

barrioController.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const barrioEncontrado = await barrioModel.findById({ _id: id });
    if (!barrioEncontrado) {
      return response(res, 404, false, "", "barrio no encontrado");
    }

    const barrioRuta = await rutaModel.findOne({ barrio: id });
    if (barrioRuta) {
      return response(
        res,
        400,
        false,
        "",
        "el barrio esta asociado a una ruta"
      );
    }

    await barrioEncontrado.deleteOne();
    return response(res, 200, true, "", "barrio eliminado");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

// ** OTHERS

barrioController.getBarrioByName = async (req, res) => {
  try {
    const { name } = req.params;
    const barrioEncontrado = await barrioModel.findOne({ nombre: name });
    if (!barrioEncontrado) {
      return response(res, 404, false, "", "barrio no encontrado");
    }

    return response(res, 200, true, barrioEncontrado, "barrio no encontrado");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

// ** LISTAR TODOS LOS BARRIOS DE UNA CIUDAD ESP

barrioController.getBarrioByCiudad = async (req, res) => {
  try {
    const { id } = req.params;
    const ciudadFound = await ciudadModel.findById({ _id: id });
    if (!ciudadFound) {
      return response(res, 404, false, "", "ciudad no encontrada");
    }

    const barrioCiudad = await barrioModel.find({ ciudad: ciudadFound._id });
    if (barrioCiudad.length === 0) {
      return response(
        res,
        404,
        false,
        "",
        "no hay barrios registrados en la ciudad"
      );
    }

    return response(
      res,
      200,
      true,
      barrioCiudad,
      "lista de barrios registrados en la ciudad"
    );
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

// ** LISTAR BARRIOS POR PAIS ESP

barrioController.getBarrioByPais = async (req, res) => {
  try {
    const { id } = req.params;
    const paisFound = await paisModel.findById({ _id: id });
    if (!paisFound) {
      return response(res, 404, false, "", "pais no encontrado");
    }

    const barrioByPais = await barrioModel.find({ pais: paisFound._id });
    if (barrioByPais.length === 0) {
      return response(
        res,
        404,
        false,
        "",
        "el pais no tiene barrios registrados"
      );
    }

    return response(
      res,
      200,
      true,
      barrioByPais,
      "lista de barrios del pais encontrado"
    );
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

export default barrioController;
