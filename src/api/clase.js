import { basePath, apiVersion } from "./config";

//añadir clase
export function addClaseApi(token, clase) {
  const url = `${basePath}/${apiVersion}/add-clase`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(clase)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}


//Obtener clases
export function getClaseApi(urlClase) {
  const url = `${basePath}/${apiVersion}/get-clase/${urlClase}`;

  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}

//Actualizar y editar clase
export function updateClaseApi(token, id, data) {
  const url = `${basePath}/${apiVersion}/update-clase/${id}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(data)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}
export function deleteClaseApi(token, id) {
  const url = `${basePath}/${apiVersion}/delete-clase/${id}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}