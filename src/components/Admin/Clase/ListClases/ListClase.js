import React, { useState, useEffect } from "react";
import { List, Button, Icon, Modal as ModalAntd, notification } from "antd";
import DragSortableList from "react-drag-sortable";
import Modal from "../../../Modal";
import AddEditCourseForm from "../AddEditClaseForm";
import { getAccessTokenApi } from "../../../../api/auth";
import {
  getClaseDataUdemyApi,
  deleteClaseApi,
  updateClaseApi
} from "../../../../api/clase";

import "./ClaseLists.scss";

const { confirm } = ModalAntd;

export default function ClaseList(props) {
  const { clase, setReloadClase } = props;
  const [listClase, setListClase] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const listClaseArray = [];
    clase.forEach(clase => {
      listClaseArray.push({
        content: (
          <clase
            course={clase}
            deleteClase={deleteClase}
            editClaseModal={editClaseModal}
          />
        )
      });
    });
    setListClase(listClaseArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clase]);

  const onSort = (sortedList, dropEvent) => {
    const accessToken = getAccessTokenApi();

    sortedList.forEach(item => {
      const { _id } = item.content.props.course;
      const order = item.rank;
      updateClaseApi(accessToken, _id, { order });
    });
  };

  const addClaseModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nueva clase");
    setModalContent(
      <AddEditCourseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadClase}
      />
    );
  };

  const editClaseModal = clase => {
    setIsVisibleModal(true);
    setModalTitle("Actualizando clase");
    setModalContent(
      <AddEditCourseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadClase}
        course={clase}
      />
    );
  };

  const deleteClase = clase => {
    const accesToken = getAccessTokenApi();

    confirm({
      title: "Eliminando clase",
      content: `¿Estas seguro de que quieres eliminar el clase ${clase.idClase}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteClaseApi(accesToken, clase._id)
          .then(response => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message
            });
            setReloadClase(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor, intentelo más tarde."
            });
          });
      }
    });
  };

  return (
    <div className="clase-list">
      <div className="clase-list__header">
        <Button type="primary" onClick={addClaseModal}>
          Nueva Clase
        </Button>
      </div>

      <div className="clase-list__items">
        {listClase.length === 0 && (
          <h2 style={{ textAlign: "center", margin: 0 }}>
            No tienes clases creados
          </h2>
        )}
        <DragSortableList items={listClase} onSort={onSort} type="vertical" />
      </div>

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function Clase(props) {
  const { clase, deleteClase, editClaseModal } = props;
  const [claseData, setClaseData] = useState(null);

  useEffect(() => {
    getClaseDataUdemyApi(clase.idClase).then(response => {
      if (response.code !== 200) {
        notification["warning"]({
          message: `La clase con el id ${clase.idClase} no se ha encontrado.`
        });
      }
      setClaseData(response.data);
    });
  }, [clase]);

  if (!claseData) {
    return null;
  }

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editClaseModal(clase)}>
          <Icon type="edit" />
        </Button>,
        <Button type="danger" onClick={() => deleteClase(clase)}>
          <Icon type="delete" />
        </Button>
      ]}
    >
      <img
        src={claseData.image_480x270}
        alt={claseData.title}
        style={{ width: "100px", marginRight: "20px" }}
      />
      <List.Item.Meta
        title={`${claseData.title} | ID: ${clase.idClase}`}
        description={claseData.headline}
      />
    </List.Item>
  );
}
