import React, { useState } from "react";
import "./index.css";
import { Table, Input, message, Button, Modal } from "antd";
import { v4 as uuidv4 } from "uuid";

const TextApp = () => {
  const [texts, setTexts] = useState([]);
  const [value, setValue] = useState("");

  const handleAdd = () => {
    setTexts([
      ...texts,
      {
        id: uuidv4(),
        content: value,
      },
    ]);
    setValue("");
  };

  const handleDelete = (id) => {
    setTexts(texts.filter((item) => item.id !== id));
    message.success("Metin silindi.");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Text",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Güncelle
          </Button>
          <Button type="dashed" onClick={() => handleDelete(record.id)}>
            Sil
          </Button>
        </>
      ),
    },
  ];

  const handleEdit = (record) => {
    Modal.confirm({
      title: "Güncelleme Ekranı",
      content: (
        <Input defaultValue={record.content}  />
      ),
      onOk: () => {
        const inputValue = document.querySelector(".ant-modal-content input").value;
        setTexts((texts) =>
          texts.map((item) =>
            item.id === record.id ? { ...item, content: inputValue } : item
          )
        );
      },
    });
  };

  return (
    <div className="App">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Button type="primary" onClick={handleAdd}>
        Ekle
      </Button>
      <Table columns={columns} dataSource={texts} />
    </div>
  );
};

export default TextApp;
