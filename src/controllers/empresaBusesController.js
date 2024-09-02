import { busesModel } from "../models/busesModel.js";
import { conductoresModel } from "../models/conductoresModel.js";
import { empresaBusesModel } from "../models/empresaBusesModel.js";
import { paisModel } from "../models/paisModel.js";
import { rutaModel } from "../models/rutaModel.js";
import { response } from "../helpers/response.js";

const empresaBusesController = {};

empresaBusesController.getAll = async (req, res) => {
  try {
    const empresas = await empresaBusesModel.find();
    return response(res, 200, true, empresas, "lista de empresas");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

empresaBusesController.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const empresaEncontrada = await empresaBusesModel.findById({ _id: id });
    if (!empresaEncontrada) {
      return response(res, 404, false, "", "empresa no encontrada");
    }
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

empresaBusesController.postEmpresa = async (req, res) => {
  try {
    const { nombre, runt, rut, pais } = req.body;

    const nombreRepetido = await empresaBusesModel.findOne({ nombre: nombre });
    if (nombreRepetido) {
      return response(res, 400, false, "", "el nombre ya esta registrado");
    }

    const runtRepetido = await empresaBusesModel.findOne({ runt: runt });
    if (runtRepetido) {
      return response(res, 400, false, "", "el runt ya esta registrado");
    }

    const rutRepetido = await empresaBusesModel.findOne({ rut: rut });
    if (rutRepetido) {
      return response(res, 400, false, "", "el rut ya esta repetido");
    }

    const paisExiste = await paisModel.findById({ _id: pais });
    if (!paisExiste) {
      return response(res, 404, false, "", "pais no encontrado");
    }

    const nuevaEmpresa = await empresaBusesModel.create(req.body);
    return response(res, 201, true, nuevaEmpresa, "empresa de buses creada");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

empresaBusesController.putEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, runt, rut, pais } = req.body;
    const empresaEncontrada = await empresaBusesModel.findById({ _id: id });
    if (!empresaEncontrada) {
      return response(res, 404, false, "", "empresa no encontrada");
    }

    if (empresaEncontrada.nombre !== nombre) {
      const nombreRepetido = await empresaBusesModel.findOne({
        nombre: nombre,
      });
      if (nombreRepetido) {
        return response(res, 400, false, "", "el nombre ya esta registrado");
      }
    }

    if (empresaBusesModel.runt !== runt) {
      const runtRepetido = await empresaBusesModel.findOne({ runt: runt });
      if (runtRepetido) {
        return response(res, 400, false, "", "el runt ya esta registrado");
      }
    }

    if (empresaEncontrada.rut !== rut) {
      const rutRepetido = await empresaBusesModel.findOne({ rut: rut });
      if (rutRepetido) {
        return response(res, 400, false, "", "el rut ya esta registrado");
      }
    }

    if (empresaEncontrada.pais !== pais) {
      const paisExiste = await paisModel.findById({ _id: pais });
      if (!paisExiste) {
        return response(res, 404, false, "", "pais no encontrada");
      }
    }

    await empresaEncontrada.updateOne(req.body);
    return response(res, 200, true, "", "empresa actualizada");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

empresaBusesController.deleteEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const empresaEncontrada = await empresaBusesModel.findById({ _id: id });
    if (!empresaEncontrada) {
      return response(res, 404, false, "", "empresa no encontrada");
    }

    const empresaBuses = await busesModel.findOne({ empresaBuses: id });
    if (empresaBuses) {
      return response(res, 400, false, "", "la empresa tiene buses asociados");
    }

    const empresaConductores = await conductoresModel.findOne({
      empresaBuses: id,
    });
    if (empresaConductores) {
      return response(
        res,
        400,
        false,
        "",
        "la empresa tien conductores asociados"
      );
    }

    const empresaRuta = await rutaModel.findOne({ empresaBuses: id });
    if (empresaRuta) {
      return response(res, 400, false, "", "la empresa tiene rutas asociadas");
    }

    await empresaEncontrada.deleteOne();
    return response(res, 200, true, "", "empresa eliminada");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

// ** OTHERS

empresaBusesController.getEmpresaByName = async (req, res) => {
  try {
    const { name } = req.params;
    const empresaEncontrada = await empresaBusesModel.findOne({ nombre: name });
    if (!empresaEncontrada) {
      return response(res, 404, false, "", "empresa no encontrada");
    }
    return response(res, 200, true, empresaEncontrada, "empresa encontrada");
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

// ** LISTAR EMPRESAS PAIS ESP

empresaBusesController.getEmpresasByPais = async (req, res) => {
  try {
    const { id } = req.params;
    const paisFound = await paisModel.findById({ _id: id });
    if (!paisFound) {
      return response(res, 404, false, "", "pais no encontrado");
    }

    const empresaPais = await empresaBusesModel.find({ pais: paisFound._id });
    if (empresaPais.length === 0) {
      return response(
        res,
        404,
        false,
        "",
        "el pais no tiene empresa de buses registrada"
      );
    }

    return response(
      res,
      200,
      true,
      empresaPais,
      "lista de empresa de buses del pais encontrado"
    );
  } catch (error) {
    return response(res, 500, false, "", error.message);
  }
};

export default empresaBusesController;
