import React from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Icon from "../components/Icon";
import Button from "../components/Button";
import Box from "../components/Box";
import { Link } from "react-router-dom";
import axios from "axios";

const Home: React.FC = () => {
  const [search, setSearch] = React.useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [tasks, setTasks] = React.useState<any[]>([]);
  const [startIndex, setStartIndex] = React.useState(0);
  const apiUrl = process.env.REACT_APP_API_URL || "";

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSearchSubmit();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [search]);

  // Funções de manipulação de dados
  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao obter os dados:", error);
    }
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await axios.get(apiUrl + `?searchTerm=${search}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao obter os dados:", error);
    }
  };

  const handleClear = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
    setSearch("");
    fetchData();
  };

  const handleDelete = async (itemId: number) => {
    try {
      await axios.delete(`${apiUrl}/${itemId}`);
      fetchData();
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  };

  const handleConfirm = async (itemId: number) => {
    try {
      const currentDate = new Date();
      const formattedTime = currentDate.toLocaleTimeString("en-US", {
        hour12: false,
      });

      await axios.patch(`${apiUrl}/${itemId}`, { time_end: formattedTime });
      fetchData();
    } catch (error) {
      console.error("Erro ao confirmar:", error);
    }
  };

  const handleDesconfirm = async (itemId: number) => {
    try {
      await axios.patch(`${apiUrl}/${itemId}`, { time_end: "00:00:00" });
      fetchData();
    } catch (error) {
      console.error("Erro ao desconfirmar:", error);
    }
  };

  const handleNext = () => {
    setStartIndex(startIndex + 3);
  };

  const handlePrev = () => {
    setStartIndex(Math.max(startIndex - 3, 0));
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    return `${hours}h:${minutes}min`;
  };
  return (
    <React.Fragment>
      <Card height="10%">
        <form className="form">
          <Input
            inputRef={inputRef}
            valueChange={setSearch}
            value={search}
            type="text"
            readOnly={false}
            placeholder="Pesquisa..."
          />
          <div className="bar-buttons">
            {search !== "" && (
              <Button action={handleClear}>
                <Icon
                  imageUrl="https://img.icons8.com/dusk/64/close-window--v1.png"
                  alt="clear-symbol"
                />
              </Button>
            )}
            <Button action={handleSearchSubmit}>
              <Icon
                imageUrl="https://img.icons8.com/dusk/64/google-web-search.png"
                alt="search"
              />
            </Button>

            <Box width="20px" />
            <Button>
              <Link to="create">
                <Icon
                  imageUrl="https://img.icons8.com/dusk/64/plus-2-math.png"
                  alt="create"
                />
              </Link>
            </Button>
          </div>
        </form>
      </Card>
      <Card height="67%" justifyContent="space-between">
        <div className="data-list">
          {tasks.length === 0 ? (
            <p>Não foi encontrado tarefas.</p>
          ) : (
            <ul>
              {tasks.slice(startIndex, startIndex + 3).map((task) => (
                <li key={task.id}>
                  <Card
                    color={
                      task.time_end == null || task.time_end === "00:00:00"
                        ? "var(--cor-cyan)"
                        : "var(--cor-green)"
                    }
                  >
                    <div className="task">
                      <div className="task-info">
                        <span className="title">{task.name}</span>
                        <span className="description">{task.description}</span>
                        <span className="time">
                          {"Horário Início: " + formatTime(task.time_start)}
                        </span>
                        <span className="time">
                          {task.time_expected_end !== "00:00:00"
                            ? "Horário Previsto: " +
                              formatTime(task.time_expected_end)
                            : ""}
                        </span>
                        <span className="time">
                          {task.time_end !== "00:00:00"
                            ? "Horário Conclusão: " + formatTime(task.time_end)
                            : ""}
                        </span>
                      </div>

                      <div className="task-icon">
                        {!task.time_end || task.time_end === "00:00:00" ? (
                          <Button action={() => [handleConfirm(task.id)]}>
                            <Icon
                              imageUrl="https://img.icons8.com/dusk/64/checked-checkbox.png"
                              alt="checked"
                            />
                          </Button>
                        ) : (
                          <Button action={() => [handleDesconfirm(task.id)]}>
                            <Icon
                              imageUrl="https://img.icons8.com/dusk/64/close-window--v1.png"
                              alt="deschecked"
                            />
                          </Button>
                        )}
                        <Box width="5px" />
                        <Button action={() => [handleDelete(task.id)]}>
                          <Icon
                            imageUrl="https://img.icons8.com/dusk/64/indeterminate-checkbox.png"
                            alt="trash"
                          />
                        </Button>
                        <Box width="5px" />
                        <Button>
                          <Link to={`create/${task.id}`}>
                            <Icon
                              imageUrl="https://img.icons8.com/dusk/64/create-new.png"
                              alt="edit"
                            />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bar-buttons" >
          <Button
            width="130px"
            height="40px"
            color="var(--cor-red)"
            action={handlePrev}
          >
            <span>Voltar</span>
          </Button>

          <Box width="50px" />
          <Button
            width="130px"
            height="40px"
            color="var(--cor-green)"
            action={handleNext}
          >
            <span>Avançar</span>
          </Button>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Home;
