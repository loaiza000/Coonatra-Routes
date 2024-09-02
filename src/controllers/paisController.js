import { response } from "../helpers/response.js";
import { barrioModel } from "../models/barrioModel.js";
import { ciudadModel } from "../models/ciudadModel.js";
import { empresaBusesModel } from "../models/empresaBusesModel.js";
import { paisModel } from "../models/paisModel.js";
import { rutaModel } from "../models/rutaModel.js";

const paisController = {};

paisController.getAll = async (req, res) => {
  try {
    const paises = await paisModel.find();
    return response(res, 200, true, paises, "paises encontrados");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

paisController.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const paisEncontrado = await paisModel.findById({ _id: id });
    if (!paisEncontrado) {
      return response(res, 404, false, "pais no encontrado");
    }

    return response(res, 200, true, paisEncontrado, "pais encontrado");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

paisController.postPais = async (req, res) => {
  try {
    const { nombre, codigo, identidad } = req.body;
    const nombreRepetido = await paisModel.findOne({ nombre: nombre });
    if (nombreRepetido) {
      return response(
        res,
        400,
        false,
        "",
        "el nombre del pais ya esta registrado"
      );
    }

    const codigoRepetido = await paisModel.findOne({ codigoPostal: codigo });
    if (codigoRepetido) {
      return response(
        res,
        400,
        false,
        "",
        "el codigo del pais ya esta registrado"
      );
    }

    const identidadRepetida = await paisModel.findOne({ identidad: identidad });
    if (identidadRepetida) {
      return response(
        res,
        400,
        false,
        "",
        "la identidad del pais ya esta registrado"
      );
    }

    const nuevoPais = await paisModel.create(req.body);
    return response(res, 201, true, nuevoPais, "pais creado");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

paisController.putPais = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, codigo, identidad } = req.body;

    const paisEncontrado = await paisModel.findById({ _id: id });
    if (!paisEncontrado) {
      return response(res, 404, false, "", "pais no encontrado");
    }

    if (paisEncontrado.nombre !== nombre) {
      const nombreRepetido = await paisModel.findOne({ nombre: nombre });
      if (nombreRepetido) {
        return response(res, 400, false, "", "el nombre ya esta registrado");
      }
    }

    if (codigoRepetido.codigoPostal !== codigo) {
      const codigoRepetido = await paisModel.findOne({ codigoPostal: codigo });
      if (codigoRepetido) {
        return response(
          res,
          400,
          false,
          "",
          "el codigo postyal ya esta registrado"
        );
      }
    }

    if (paisEncontrado.identidad !== identidad) {
      const identidadRepetida = await paisModel.findOne({
        identidad: identidad,
      });
      if (identidadRepetida) {
        return response(
          res,
          400,
          false,
          "",
          "la identidad del pais ya esta registrada"
        );
      }
    }

    await paisEncontrado.updateOne(req.body);
    return response(res, 200, true, "", "pais encontrado");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

paisController.deletePais = async (req, res) => {
  try {
    const { id } = req.params;
    const paisEncontrado = await paisModel.findById({ _id: id });
    if (!paisEncontrado) {
      return response(res, 404, false, "", "pais no encontrado");
    }

    const paisBarrio = await barrioModel.findOne({ pais: id });
    if (paisBarrio) {
      return response(res, 400, false, "", "el pais esta asociado a un barrio");
    }

    const paisCiudad = await ciudadModel.findOne({ pais: id });
    if (paisCiudad) {
      return response(
        res,
        400,
        false,
        "",
        "el pais esta asociado a una ciudad"
      );
    }

    const paisEmpresa = await empresaBusesModel.findOne({ pais: id });
    if (paisEmpresa) {
      return response(
        res,
        400,
        false,
        "",
        "el pais esta asociado a una empresa de buses"
      );
    }

    const paisRuta = await rutaModel.findOne({ pais: id });
    if (paisRuta) {
      return response(res, 400, false, "", "el pais esta asociado a una ruta");
    }

    paisEncontrado.deleteOne();
    return response(res, 200, true, "", "pais eliminado");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

// ** OTHERS 

paisController.getPaisByName = async (req, res) => {
  try {
    const { name } = req.params;
    const paisEncontrado = await paisModel.findOne({ nombre: name });
    if (!paisEncontrado) {
      return response(res, 404, false, "", "pais no encontrado");
    }

    return response(res, 200, true, paisEncontrado, "pais encontrado");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

export default paisController;
