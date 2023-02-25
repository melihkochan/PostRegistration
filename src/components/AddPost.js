import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AddPost.css";

const Addpost = () => {

  const [data, setData] = useState([{}]);
  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    await axios
      .get("http://localhost:4000/posts")
      .then((res) => setData(res.data));
  };
  const [formData, setFormData] = useState({
    post: "",
  });

  const [updateData, setUpdateData] = useState({
    id: "",
    post: "",
  });

  const handleFormSubmit = async (e) => {
    let response = await axios.post("http://localhost:4000/posts", formData);
    if (response) {
      alert("Yazi basarili sekilde eklendi.");
    } else {
      alert("Yazi eklenemedi.");
    }
    setFormData({
      post: "",
    });
    getPost();
  };
  
  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:4000/posts/" + id)
      .then((res) => alert("Silme işlemi başarılı."));
    getPost();
  };

  const handleUpdate = async () => {
    await axios
      .put(`http://localhost:4000/posts/${updateData.id}`, updateData)
      .then((res) => {
        alert("Güncelleme Başarili!");
        getPost();
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div>
          <h1>Yazı Ekleme Uygulaması</h1>
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Yazı gir"
            value={formData.post}
            onChange={(e) => setFormData({ ...formData, post: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-success" onClick={handleFormSubmit}>
            Ekle
          </button>
        </div>
      </div>
      <div>
        <h1>Listelenen Yazılar</h1>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Yazı</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((post) => (
                <tr>
                  <td>{post.post}</td>
                  <td
                    style={{ justifyContent: "space-between" }}
                  >
                    <button
                      className="btn btn-info"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() =>
                        setUpdateData({
                          post: post.post,
                          id: post.id,
                        })
                      }
                    >
                      Güncelle
                    </button>
                    <button  style={{ marginLeft :"20px"}}
                      className="btn btn-danger"
                      onClick={() => handleDelete(post.id)}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Yazı Güncelle
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {" "}
              <div className="mb-3">
                <label className="form-label">
                  Değiştirmek istedğiniz Yaziyi giriniz
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Yazı gir"
                  value={updateData.post}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, post: e.target.value })
                  }
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Kapat
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => handleUpdate()}
              >
                Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addpost;
