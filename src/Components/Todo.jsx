import React from "react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Todoitem from "./Todoitem";
import { useState } from "react";
import Loading from "./Loading";
import Error from "./Error";
import style from "../Css/Todo.module.css";
import { handletheme } from "../Redux/Todo/action";
import { getTodoData } from "../Redux/Todo/action";
import { handleAdd } from "../Redux/Todo/action";
import { handleEditis } from "../Redux/Todo/action";
import { Icon, useColorMode } from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [etitle, setEtitle] = useState("");
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [editshow, setEditshow] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();

  const alltodo = useSelector((state) => {
    return state.todo;
  });

  const decider = useSelector((state) => {
    return state.extra;
  });

  const themeSh = useSelector((state) => {
    return state.thememainweb;
  });
  console.log(themeSh.theme);

  function handleTitle(event) {
    setTitle(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(handleAdd(title));
    setTitle("");
  }

  function handleeditTitle(val, val2) {
    setEtitle(val);
    setId(val2);
    setEditshow(true);
  }

  function handleThemeChange() {
    dispatch(handletheme());
  }

  function handleEchange(event) {
    setEtitle(event.target.value);
  }

  function handleGoShow() {
    setEditshow(false);
    dispatch(handleEditis(etitle, id));
    setEtitle("");
  }

  function handleIt() {
    toggleColorMode();
    handleThemeChange();
  }

  useEffect(() => {
    dispatch(getTodoData);
  }, []);

  if (decider.loading) {
    return <Loading />;
  }

  if (decider.error) {
    return <Error />;
  }

  return (
    <div className={themeSh.theme ? style.maindiv : style.maindivblack}>
      <div className={style.maindiv1}>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="enter title"
            value={title}
            onChange={handleTitle}
            className={style.chakrainput}
          />
          <Button
            type="submit"
            className={themeSh.theme ? style.button1 : style.button1black}
          >
            Add Todo
          </Button>

          <Icon
            style={{ marginLeft: "16px",cursor:"pointer" }}
            as={MoonIcon}
            onClick={handleIt}
          />
        </form>
      </div>

      {editshow && (
        <div className={style.maindiv1}>
          <Input
            value={etitle}
            onChange={handleEchange}
            className={style.chakrainput}
          />
          <Button
            type="submit"
            onClick={() => {
              handleGoShow();
            }}
            className={themeSh.theme ? style.button1 : style.button1black}
          >
            Edit Title
          </Button>
        </div>
      )}

      <div style={{ marginTop: "50px" }}>
        <div className={style.showgrid}>
          {alltodo.map((ele) => {
            return (
              <Todoitem
                key={ele.id}
                {...ele}
                handleeditTitle={handleeditTitle}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Todo;
