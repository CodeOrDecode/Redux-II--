import axios from "axios";
import { ERROR, LOADING, MAINTHEME, TODODATA } from "./actionitems";

export function handletodo(value){
    return {type:TODODATA,payload:value}

}


export function handleloading(value){
    return {type:LOADING,payload:value}

}


export function handleerror(value){
    return {type:ERROR,payload:value}

}

export function handletheme(){
    return {type:MAINTHEME}

}


export const getTodoData = async (dispatch) => {
    try {
      dispatch(handleloading(true));
      let { data } = await axios({
        method: "get",
        url: "http://localhost:3000/todos",
      });
      dispatch(handletodo(data));
      dispatch(handleloading(false));
    } catch (error) {
      dispatch(handleloading(false));
      dispatch(handleerror(true));
      console.log(error);
    }
  };



export  const handleAdd =(title)=> async (dispatch) => {
    try {
      let obj = { title: title, status: false };
      await axios({
        method: "post",
        url: "http://localhost:3000/todos",
        data: obj,
      });
      dispatch(getTodoData)
    } catch (error) {
      console.log(error);
    }
  };


 export const handleDelete =(id)=> async (dispatch) => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:3000/todos/${id}`,
      });
      dispatch(getTodoData)
    } catch (error) {
      console.log(error);
    }
  };


 export const handleEditis=(etitle,id)=> async (dispatch) => {
    try {
      let obj = { title: etitle };
      await axios({
        method: "patch",
        url: `http://localhost:3000/todos/${id}`,
        data: obj,
      });
      dispatch(getTodoData)
   
    } catch (error) {
      console.log(error);
    }
  };


 export const handleStatus =(id, val)=> async (dispatch) => {
    try {
      let obj = { status: !val };
      await axios({
        method: "patch",
        url: `http://localhost:3000/todos/${id}`,
        data: obj,
      });
      dispatch(getTodoData)
    } catch (error) {
      console.log(error);
    }
  };
