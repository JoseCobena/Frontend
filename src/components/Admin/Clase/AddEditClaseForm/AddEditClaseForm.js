import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, notification } from "antd";
import { getAccessTokenApi } from "../../../../api/auth";
import { addCourseApi, updateCourseApi } from "../../../../api/course";

import "./AddEditClaseForm.scss";

export default function AddEditClaseForm(props) {
  const { setIsVisibleModal, setReloadClase, clase } = props;
  const [claseData, setClaseData] = useState({});

  useEffect(() => {
    clase ? setClaseData(clase) : setClaseData({});
  }, [clase]);

  const addClase = e => {
    e.preventDefault();

    if (!claseData.idClase) {
      notification["error"]({
        message: "El id del curso es obligatorio"
      });
    } else {
      const accessToken = getAccessTokenApi();

      addClaseApi(accessToken, claseData)
        .then(response => {
          const typeNotification =
            response.code === 200 ? "success" : "warning";
          notification[typeNotification]({
            message: response.message
          });
          setIsVisibleModal(false);
          setReloadClase(true);
          setClaseData({});
        })
        .catch(() => {
          notification["error"]({
            message: "Error del servidor, intentelo más tarde."
          });
        });
    }
  };

  const updateClase = e => {
    e.preventDefault();

    const accessToken = getAccessTokenApi();

    updateClaseApi(accessToken, clase._id, claseData)
      .then(response => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message
        });
        setIsVisibleModal(false);
        setReloadClase(true);
        setClaseData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor, intentelo más tarde."
        });
      });
  };

  return (
    <div className="add-edit-clase-form">
      <AddEditForm
        clase={clase}
        addClase={addClase}
        updateClase={updateClase}
        claseData={claseData}
        setClaseData={setClaseData}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { clase, addClase, updateClase, claseData, setClaseData } = props;

  return (
    <Form
      className="form-add-edit"
      onSubmit={clase ? updateClase : addClase}
    >
      <Form.Item>
        <Input
          prefix={<Icon type="key" />}
          placeholder="ID del curso"
          value={claseData.idClase}
          onChange={e =>
            setClaseData({ ...claseData, idClase: e.target.value })
          }
          disabled={clase ? true : false}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="link" />}
          placeholder="Url del curso"
          value={claseData.link}
          onChange={e => setClaseData({ ...claseData, link: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="gift" />}
          placeholder="Cupon de descuento"
          value={claseData.coupon}
          onChange={e =>
            setClaseData({ ...claseData, coupon: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="dollar" />}
          placeholder="Precio de la clase"
          value={claseData.price}
          onChange={e =>
            setClaseData({ ...claseData, price: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          {clase ? "Actualizar clase" : "Crear clase"}
        </Button>
      </Form.Item>
    </Form>
  );
}
