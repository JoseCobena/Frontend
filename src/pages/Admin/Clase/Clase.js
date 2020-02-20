import React, { useState, useEffect } from "react";
import { Button, notification } from "antd";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import Modal from "../../../components/Modal";
import ClaseList from "../../../components/Admin/Clase/ListClases";
import Pagination from "../../../components/Pagination";
import AddEditClaseForm from "../../../components/Admin/Clase/AddEditClaseForm";
import { getClaseApi} from "../../../api/clase";

import "./Clase.scss";

function Clase(props) {
  const { location, history } = props;
  const [clase, setclase] = useState(null);
  const [reloadClase, setReloadclase] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const { page = 1 } = queryString.parse(location.search);

  useEffect(() => {
    getClaseApi(12, page)
      .then(response => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          setclase(response.clase);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor."
        });
      });
    setReloadclase(false);
  }, [page, reloadClase]);

  const addClase = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo clase");
    setModalContent(
      <AddEditClaseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadClase={setReloadClase}
        clase={null}
      />
    );
  };

  const editClase = clase => {
    setIsVisibleModal(true);
    setModalTitle("Editar clase");
    setModalContent(
      <AddEditClaseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadClase={setReloadClase}
        clase={clase}
      />
    );
  };

  if (!clase) {
    return null;
  }

  return (
    <div className="clase">
      <div className="clase__add-clase">
        <Button type="primary" onClick={addClase}>
          Nuevo clase
        </Button>
      </div>
      <ClaseList
        clase={clase}
        setReloadClase={setReloadClase}
        editClase={editClase}
      />
      <Pagination clase={clase} location={location} history={history} />
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        width="75%"
      >
        {modalContent}
      </Modal>
    </div>
  );
}

export default withRouter(Clase);
