import React, { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Box from "../components/Box";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Create: React.FC = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("var(--cor-green)");

  const nameInputRef = React.useRef<HTMLInputElement>(null);

  const handleClear = (): void => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
    setName("");
    setDescription("");
    setDate("");
    setStartTime("");
    setEndTime("");
  };

  const createTask = async () => {
    const apiUrl = process.env.REACT_APP_API_URL || "";

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const trimmedDate = date.trim();
    const trimmedStartTime = startTime.trim();
    const trimmedEndTime = endTime.trim();

    if (
      [trimmedName, trimmedDescription, trimmedDate, trimmedStartTime].some(
        (field) => field === ""
      )
    ) {
      throw new Error(
        "Preencha todos os campos antes de criar ou editar a tarefa."
      );
    }

    if (trimmedEndTime !== "" && trimmedStartTime > trimmedEndTime) {
      throw new Error("A hora de início não pode ser maior à hora de término.");
    }

    const data = {
      name: trimmedName,
      description: trimmedDescription,
      date: trimmedDate,
      time_start:
        trimmedStartTime.length === 8
          ? trimmedStartTime
          : trimmedStartTime + ":00",
      time_expected_end:
        trimmedEndTime !== "" ? trimmedEndTime + ":00" : "00:00:00",
      time_end: "00:00:00",
    };

    try {
      if (id) {
        const response = await axios.patch(`${apiUrl}/${id}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          return "Tarefa editada com sucesso!";
        } else {
          throw new Error("Ops! Ocorreu um erro ao editar a tarefa.");
        }
      } else {
        const response = await axios.post(apiUrl, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          return "Tarefa cadastrada com sucesso!";
        } else {
          throw new Error("Ops! Ocorreu um erro ao cadastrar a tarefa.");
        }
      }
    } catch (error) {
      console.error("Error creating/editing task:", error);
      throw new Error("Ops! Ocorreu um erro ao criar ou editar a tarefa.");
    }
  };

  const fetchTaskData = async () => {
    if (id) {
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/${id}`;
        const response = await axios.get(apiUrl);
        const taskData = response.data;

        setName(taskData.name || "");
        setDescription(taskData.description || "");
        setDate(taskData.date || "");
        setStartTime(taskData.time_start || "");
        setEndTime(
          taskData.time_expected_end !== "00:00:00"
            ? taskData.time_expected_end || ""
            : ""
        );
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    }
  };

  React.useEffect(() => {
    fetchTaskData();
  }, [id]);

  const handleCreateNew = () => {
    setMessage("");
    createTask()
      .then((successMessage) => {
        setMessage(successMessage);
        setMessageColor("var(--cor-green)");
        handleClear();
      })
      .catch((errorMessage) => {
        setMessage(errorMessage.message);
        setMessageColor("var(--cor-red)");
      })
      .finally(() => {
        setTimeout(() => {
          setMessage("");
        }, 2000);
      });
  };

  return (
    <React.Fragment>
      <Card height="65%">
        <form className="form" style={{ flexDirection: "column" }}>
          <Input
            placeholder="Nome..."
            inputRef={nameInputRef}
            valueChange={setName}
            value={name}
            type="text"
            readOnly={false}
          />
          <Input
            placeholder="Descrição..."
            valueChange={setDescription}
            value={description}
            type="text"
            readOnly={false}
          />
          <div className="row">
            <Input
              label="Data"
              valueChange={setDate}
              value={date}
              type="date"
              readOnly={false}
            />
            <Box width="50px" />
            <Input
              label="Início"
              valueChange={setStartTime}
              value={startTime}
              type="time"
              readOnly={false}
            />
            <Box width="50px" />
            <Input
              label="Fim"
              valueChange={setEndTime}
              value={endTime}
              type="time"
              readOnly={false}
            />
          </div>

          <div className="bar-buttons">
            {[name, description, date, startTime, endTime].some(
              (field) => field !== ""
            ) && (
              <React.Fragment>
                <Button
                  width="130px"
                  height="40px"
                  color="var(--cor-cyan)"
                  action={handleClear}
                >
                  <span>Limpar</span>
                </Button>{" "}
                <Box width="50px" />
              </React.Fragment>
            )}

            <Link to="/" style={{ textDecoration: "none", color: "#f2f2f2" }}>
              <Button width="130px" height="40px" color="var(--cor-red)">
                Cancelar
              </Button>
            </Link>

            <Box width="50px" />
            <Button
              width="130px"
              height="40px"
              color="var(--cor-green)"
              action={handleCreateNew}
            >
              <span>{id ? "Editar" : "Criar"}</span>
            </Button>
          </div>
        </form>
      </Card>
      {message && (
        <Card color={messageColor}>
          <span>{message}</span>
        </Card>
      )}
    </React.Fragment>
  );
};

export default Create;
