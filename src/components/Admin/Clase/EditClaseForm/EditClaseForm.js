import React, { useState, useEffect, useCallback } from "react";
import {
  Avatar,
  Form,
  Icon,
  Input,
  Select,
  Button,
  Row,
  Col,
  notification
} from "antd";
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import {
  updateClaseApi,
  uploadAvatarApi,
  getAvatarApi
} from "../../../../api/clase";
import { getAccessTokenApi } from "../../../../api/auth";

import "./EditClaseForm.scss";

export default function EditClaseForm(props) {
  const { clase, setIsVisibleModal, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData({
      name: clase.name,
      lastname: clase.lastname,
      email: clase.email,
      role: clase.role,
      avatar: clase.avatar
    });
  }, [clase]);

  useEffect(() => {
    if (clase.avatar) {
      getAvatarApi(clase.avatar).then(response => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [clase]);

  useEffect(() => {
    if (avatar) {
      setUserData({ ...claseData, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const updateClase = e => {
    e.preventDefault();
    const token = getAccessTokenApi();
    let ClaseUpdate = claseData;

    if (claseUpdate.password || claseUpdate.repeatPassword) {
      if (claseUpdate.password !== claseUpdate.repeatPassword) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales."
        });
        return;
      } else {
        delete claseUpdate.repeatPassword;
      }
    }

    if (!claseUpdate.name || !claseUpdate.lastname || !claseUpdate.email) {
      notification["error"]({
        message: "El nombre, apellidos y email son obligatorios."
      });
      return;
    }

    if (typeof claseUpdate.avatar === "object") {
      uploadAvatarApi(token, claseUpdate.avatar, clase._id).then(response => {
        claseUpdate.avatar = response.avatarName;
        updateClaseApi(token, claseUpdate, clase._id).then(result => {
          notification["success"]({
            message: result.message
          });
          setIsVisibleModal(false);
          setReloadClase(true);
        });
      });
    } else {
      updateClaseApi(token, claseUpdate, clase._id).then(result => {
        notification["success"]({
          message: result.message
        });
        setIsVisibleModal(false);
        setReloadClase(true);
      });
    }
  };

  return (
    <div className="edit-clase-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        claseData={claseData}
        setClaseData={setClaseData}
        updateClase={updateClase}
      />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const { claseData, setClaseData, updateClase } = props;
  const { Option } = Select;

  return (
    <Form className="form-edit" onSubmit={updateClase}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="clase" />}
              placeholder="Nombre"
              value={userData.name}
              onChange={e => setClaseData({ ...claseData, name: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="clase" />}
              placeholder="Apellidos"
              value={claseData.lastname}
              onChange={e =>
                setClaseData({ ...claseData, lastname: e.target.value })
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
              placeholder="Correo electronico"
              value={claseData.email}
              onChange={e =>
                setClaseata({ ...claseData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Seleccióna una rol"
              onChange={e => setClaseData({ ...claseData, role: e })}
              value={claseData.role}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Docente</Option>
              <Option value="reviewr">Estudiante</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Contraseña"
              onChange={e =>
                setClaseData({ ...claseData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Repetir contraseña"
              onChange={e =>
                setClaseData({ ...claseData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
