import React, { useState } from "react";
import {
  Form,
  Icon,
  Input,
  Select,
  Button,
  Row,
  Col,
  notification
} from "antd";
import { signUpAdminApi } from "../../../../api/clase";
import { getAccessTokenApi } from "../../../../api/auth";

import "./AddClaseForm.scss";

export default function EditClaseForm(props) {
  const { setIsVisibleModal, setReloadUsers } = props;
  const [claseData, setClaseData] = claseState({});

  const addUser = event => {
    event.preventDefault();

    if (
      !claseData.laboratorio ||
      !claseData.dia ||
      !claseData.horainicio ||
      !claseData.horafinal ||
      !claseData.docente ||
      !claseData.materia ||
        !claseData.nivel ||
        !claseData.carrera
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios."
      });
    } else if (claseData.password !== claseData.repeatPassword) {
      notification["error"]({
        message: "Las contraseñas tienen que ser iguale."
      });
    } else {
      const accesToken = getAccessTokenApi();

      signUpAdminApi(accesToken, userData)
        .then(response => {
          notification["success"]({
            message: response
          });
          setIsVisibleModal(false);
          setReloadUsers(true);
          setUserData({});
        })
        .catch(err => {
          notification["error"]({
            message: err
          });
        });
    }
  };

  return (
    <div className="add-clase-form">
      <AddForm
        userData={claseData}
        setUserData={setClaseData}
        addUser={addClase}
      />
    </div>
  );
}

function AddForm(props) {
  const { claseData, setClaseData, addClase } = props;
  const { Option } = Select;

  return (
    <Form className="form-add" onSubmit={addClase}>
      <Row gutter={24}>
        <Col span={12}>
            <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selecióna un Laboratorio"
              onChange={e => setClaseData({ ...claseData, laboratorio: e })}
              value={claseData.laboratorio}
            >
              <Option value="admin">Laboratorio 1 A</Option>
              <Option value="editor">Laboratorio 1 B</Option>
              <Option value="reviwer">Laboratorio 1 A 2</Option>
                <Option value="reviwer">Laboratorio 2</Option>
            </Select>
          </Form.Item>
        </Col>
          <Form.Item>
            <Input
              prefix={<Icon type="user" />}
              placeholder="Dìa"
              value={claseData.dia}
              onChange={e =>
                setClaseData({ ...claseData, dia: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="mail" />}
              placeholder="Hora Inicio"
              value={claseData.horainicio}
              onChange={e =>
                setClaseData({ ...claseData, horainicio: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="mail" />}
              placeholder="Hora Final"
              value={claseData.horafinal}
              onChange={e =>
                setClaseData({ ...claseData, horafinal: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
          <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="mail" />}
              placeholder="Ingrese nombre del Docente"
              value={claseData.docente}
              onChange={e =>
                setClaseData({ ...claseData, docente: e.target.value })
              }
            />
          </Form.Item>
        </Col>
          <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selecióna una Carrera"
              onChange={e => setClaseData({ ...claseData, materia: e })}
              value={claseData.materia}
            >
              <Option value="admin"> Base de datos</Option>
              <Option value="editor">Compiladores</Option>
              <Option value="reviwer">Administracion educativa</Option>
                <Option value="reviwer">Gestion Empresarial</Option>
            </Select>
          </Form.Item>
        </Col>
          <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selecióna un Nivel"
              onChange={e => setClaseData({ ...claseData, nivel: e })}
              value={claseData.nivel}
            >
              <Option value="admin"> Primero</Option>
              <Option value="editor">Segundo</Option>
              <Option value="reviwer">Tercero</Option>
                <Option value="reviwer">Cuarto</Option>
                <Option value="reviwer">Quinto</Option>
                <Option value="reviwer">Sexto</Option>
                <Option value="reviwer">Septimo</Option>
                <Option value="reviwer">Octavo</Option>
                <Option value="reviwer">Noveno</Option>
                <Option value="reviwer">Decimo</Option>
            </Select>
          </Form.Item>
        </Col>
          <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selecióna una Carrera"
              onChange={e => setClaseData({ ...claseData, carrera: e })}
              value={claseData.carrera}
            >
              <Option value="admin"> Sistemas y Computacion</Option>
              <Option value="editor">Contabilidad</Option>
              <Option value="reviwer">Administracion</Option>
                <Option value="reviwer">Gestion Ambiental</Option>
                <Option value="reviwer">Agro Industria</Option>
                <Option value="reviwer">Educacion</Option>
                <Option value="reviwer">Enfermerìa</Option>
                <Option value="reviwer">Comercio Exterior</Option>
            </Select>
          </Form.Item>
        </Col>

      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear Clase
        </Button>
      </Form.Item>
    </Form>
  );
}
