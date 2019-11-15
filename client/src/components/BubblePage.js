import React, { useState, useEffect } from "react";
import axios from "axios";

//utils
import { axiosWithAuth } from "../utils/axiosWithAuth";

//components
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";


const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [item, setItem] = useState([])
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  // console.log(colorList);

  useEffect(() => {
    axiosWithAuth()
      .get('/colors')
      .then(res => setColorList(res.data))
      .catch(err => console.log('err in BubblePage.useEffect', err))
  }, [])

    useEffect(() => {
      something()
    }, [])

    const something = () => {
      axiosWithAuth()
        .get('/colors')
        .then(res => setItem(res.data))
        .catch(err => (console.log('error in something', err)))
    }


  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} something = {something}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
