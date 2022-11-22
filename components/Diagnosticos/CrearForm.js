import BackendConfig from "../../config/backend";
import { MedicineBoxOutlined } from "@ant-design/icons";
import axios from "axios";
import { Form, Input, Typography, Select, message, Upload, Button } from "antd";
import { useState } from "react";
const { Option } = Select;
const { Dragger } = Upload;
const { Title } = Typography;

const CrearForm = () => {
  const [diagnosticoForm] = Form.useForm();
  const [imagesUrls, setImagesUrls] = useState([]);

  const uploadProperties = {
    name: "file",
    multiple: true,
    action: BackendConfig.uploadImageEndpoint,
    customRequest: function (options) {
      const { onSuccess, onError, file, onProgress } = options;

      const fmData = new FormData();

      fmData.append("tomografia", file);

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          onProgress({ percent: (event.loaded / event.total) * 100 });
        },
      };

      let url = `${process.env.NEXT_PUBLIC_DIAGNOSE_ENDPOINT}/images/upload`;
      axios
        .post(url, fmData, config)
        .then((res) => {
          onSuccess("Ok");
          console.log(`Response:\n ${JSON.stringify(res.data)}`);

          setImagesUrls((prevImagesUrls) => {
            return prevImagesUrls.concat(res.data.url);
          });
        })
        .catch((err) => {
          console.log("Error: ", err);
          onError({ err });
        });
    },
    onChange(info) {
      const { status } = info.file;

      if (status === "done") {
        message.success(`${info.file.name} se cargó correctamente.`);
      } else if (status === "error") {
        message.error(`${info.file.name} falló en cargarse.`);
      }
    },
  };
  const onFinishFormHandler = (valuesForm) => {
    const { subject, description, type_analysis } = valuesForm;

    const body = {
      subject: subject,
      description: description,
      typeAnalysis: type_analysis,
      imagesUrls: imagesUrls,
    };

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    let url = `${process.env.NEXT_PUBLIC_DIAGNOSE_ENDPOINT}/`;
    axios
      .post(url, body, config)
      .then((res) => {
        message.success(
          `Le enviaremos un email cuando el diagnóstico esté listo ✅`
        );
        diagnosticoForm.resetFields();
        setImagesUrls([]); // limpiamos todas las urls de las imágenes
        console.log(`Response:\n ${JSON.stringify(res.data)}`);
      })
      .catch((err) => {
        message.error(`Ocurrió un error inténtelo más tarde: ${err}`);
      });
  };

  return (
    <>
      <Title level={2}>Realizar Diagnóstico</Title>
      <Form
        name="crear_diagnostico"
        form={diagnosticoForm}
        autoComplete="off"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        onFinish={onFinishFormHandler}
      >
        <Form.Item
          label="Asunto"
          name="subject"
          tooltip="Asunto del análisis"
          rules={[
            {
              required: true,
              message: "Porfavor incluye el Asunto.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tipo"
          name="type_analysis"
          tooltip='Tipo de la tomografía, p.ej. "Cervical"'
          rules={[
            {
              required: true,
              message: "Porfavor incluye el tipo de tomografía.",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Selecciona el tipo de diagnóstico"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="cervical">Cervical</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Tomografías"
          name="tomografias"
          valuePropName="tomografias"
          rules={[
            {
              required: true,
              message: "Porfavor incluye al menos una tomografía.",
            },
          ]}
        >
          <Dragger {...uploadProperties}>
            <p className="ant-upload-drag-icon">
              <MedicineBoxOutlined />
            </p>
            <p className="ant-upload-text">
              Sube imágenes de tus radiografías aquí
            </p>
            <p className="ant-upload-hint">
              Trata de subir la mayor cantidad de imágenes posible para mejorar
              la precisión del diagnóstico.
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item
          name="description"
          label="Descripción"
          tooltip="Descripción del análisis (máx 200 letras)"
          rules={[
            {
              required: true,
              message: "Porfavor incluye una breve descripción.",
            },
          ]}
        >
          <Input.TextArea showCount maxLength={150} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Empezar Diagnóstico
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default CrearForm;
