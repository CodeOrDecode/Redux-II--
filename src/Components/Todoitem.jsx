import React from "react";
import { Button } from "@chakra-ui/react";
import style from "../Css/Todoitem.module.css";
import { useSelector } from "react-redux";
import { handleDelete } from "../Redux/Todo/action";
import { useDispatch } from "react-redux";
import { handleStatus } from "../Redux/Todo/action";

const Todoitem = ({
  id,
  title,
  status,
  handleeditTitle,
}) => {

  const themeSh = useSelector((state) => {
    return state.thememainweb;
  });
  console.log(themeSh.theme)

const dispatch = useDispatch();


function handleDeletelogic(){
  dispatch(handleDelete(id))
}

function handleditstatus(){
  dispatch(handleStatus(id,status))
}

  return (
    <div className={themeSh.theme?style.todoitemdiv: style.todoitemdivblack}>
      <h3 style={{margin:"12px 0px"}}>{title}</h3>
      <Button
      className={themeSh.theme ?style.button1:style.button1black} 
        onClick={handleditstatus}
      >
        {status ? "completed" : "pending"}
      </Button>

      <Button
        className={themeSh.theme ?style.button1:style.button1black} 
        style={{marginLeft:"14px"}}
        onClick={() => {
          handleeditTitle(title, id);
        }}
      >
        Edit
      </Button>

      <Button
         className={themeSh.theme ?style.button1:style.button1black} 
        style={{marginLeft:"14px"}}
       onClick={handleDeletelogic}
      >
        Delete
      </Button>
    </div>
  );
};

export default Todoitem;
