import { barrioModel } from "../models/barrioModel.js";
import { ciudadModel } from "../models/ciudadModel.js";
import { conductoresModel } from "../models/conductoresModel.js";
import { paisModel } from "../models/paisModel.js";
import { rutaModel } from "../models/rutaModel.js";
import { response } from "../helpers/response.js";

const ciudadController = {};

ciudadController.getAll = async (req, res) => {
  try {
    const ciudades = await ciudadModel.find();
    return response(res, 200, true, ciudades, "lista de ciudades");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

ciudadController.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const ciudadEncontrado = await ciudadModel.findById({ _id: id });
    if (!ciudadEncontrado) {
      return response(res, 404, false, "", "ciudad no encontrada");
    }

    return response(res, 200, true, ciudadEncontrado, "ciudad encontrada");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

ciudadController.postCiudad = async (req, res) => {
  try {
    const { pais, nombre, codigo } = req.body;
    const nombreRepetido = await ciudadModel.findOne({ nombre: nombre });
    if (nombreRepetido) {
      return response(res, 400, false, "", "el nombre ya esta registrado");
    }

    const codigoRepetido = await ciudadModel.findOne({ codigoPostal: codigo });
    if (codigoRepetido) {
      return response(
        res,
        400,
        false,
        "",
        "el codigo postal ya esta resgistrado"
      );
    }

    const paisEncontrado = await paisModel.findById({ _id: pais });
    if (!paisEncontrado) {
      return response(res, 404, false, "", "pais no encontrado");
    }

    const nuevaCiudad = await ciudadModel.create(req.body);
    return response(res, 200, true, nuevaCiudad, "ciudad creada");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

ciudadController.putCiudad = async (req, res) => {
  try {
    const { id } = req.params;
    const { pais, nombre, codigo } = req.body;
    const ciudadEncontrada = await ciudadModel.findOne({ _id: id });
    if (!ciudadEncontrada) {
      return response(res, 404, false, "", "ciudad no encontrada");
    }

    if (ciudadEncontrada.nombre !== nombre) {
      const nombreRepetido = await ciudadModel.findOne({ nombre: nombre });
      if (nombreRepetido) {
        return response(res, 404, false, "", "el nombre ya esta registrado");
      }
    }

    if (ciudadEncontrada.codigoPostal !== codigo) {
      const codigoRepetido = await ciudadModel.findOne({
        codigoPostal: codigo,
      });
      if (codigoRepetido) {
        return response(
          res,
          400,
          false,
          "",
          "el codigo postal ya esta registrado"
        );
      }
    }

    if (ciudadEncontrada.pais !== pais) {
      const paisEncontrado = await paisModel.findById({ _id: pais });
      if (!paisEncontrado) {
        return response(res, 404, false, "", "pais no encontrado");
      }
    }

    await ciudadEncontrada.updateOne(req.body);
    return response(res, 200, true, "", "ciudad actualizada");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

ciudadController.deleteCiudad = async (req, res) => {
  try {
    const { id } = req.params;
    const ciudadEncontrada = await ciudadModel.findById({ _id: id });
    if (!ciudadEncontrada) {
      return response(res, 404, false, "", "ciudad no encontrada");
    }

    const ciudadBarrio = await barrioModel.findOne({ ciudad: id });
    if (ciudadBarrio) {
      return response(
        res,
        400,
        false,
        "",
        "la ciudad esta asocaida a un barrio"
      );
    }

    const ciudadConductores = await conductoresModel.findOne({ ciudad: id });
    if (ciudadConductores) {
      return response(
        res,
        400,
        false,
        "",
        "la ciudad esta asociada a un conductor"
      );
    }

    const ciudadRuta = await rutaModel.findOne({ ciudad: id });
    if (ciudadRuta) {
      return response(
        res,
        400,
        false,
        "",
        "la ciudad esta asociada a una ruta"
      );
    }

    await ciudadEncontrada.deleteOne();
    return response(res, 200, true, "", "ciudad eliminada");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

// ** OTHERS 

ciudadController.getCiudadByName = async (req, res) => {
  try {
    const { name } = req.params;
    const ciudadEncontrada = await ciudadModel.findOne({ nombre: name });
    if (!ciudadEncontrada) {
      return response(res, 404, false, "", "ciudad no encontrada");
    }

    return response(res, 200, true, ciudadEncontrada, "ciudad encontrada");
  } catch (error) { 
    return response(res, 500, false, "", error.message);
  }
};

// ** LISTAR TODAS LAS CIUDADES DE PAIS ESP

ciudadController.getAllCiudadesByPais = async (req, res) => {
  try {
    const { id } = req.params;
    const paisFound = await paisModel.findById({ _id: id });
    if (!paisFound) {
      return response(res, 404, false, "", "pais no encontrado");
    }

    const ciudadesByPais = await ciudadModel.find({ pais: paisFound._id });
    if (ciudadesByPais.length === 0) {
      return response(
        res,
        404,
        false,
        "",
        "el pais no tiene ciudades registradas"
      );
    }

    return response(
      res,
      200,
      true,
      ciudadesByPais,
      "lista de ciudades del pais encontrado"
    );
    
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

export default ciudadController;
