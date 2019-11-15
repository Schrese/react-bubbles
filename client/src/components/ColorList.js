import React, { useState, useEffect } from "react";
import axios from "axios";

//utils
import { axiosWithAuth } from "../utils/axiosWithAuth";


const initialColor = {
  color: "",
  code: { hex: "" }
};
// 
const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  // console.log(updateColors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [item, setItem] = useState([])

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = props => {
    // e.preventDefault();
    axiosWithAuth() 
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res)
        setColorToEdit(res.data)
        props.history.push('/colors')
      })
      .catch(err => console.log('err in ColorList.saveEdit', err))
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    
  };

  // useEffect(() => {
  //   something()
  // }, [])

  // const something = () => {
  //   axiosWithAuth()
  //     .get('/colors')
  //     .then(res => setItem(res.data))
  //     .catch(err => (console.log('error in something', err)))
  // }

  const deleteColor = props => {
    // e.preventDefault();
    console.log(props)
    axiosWithAuth()
      .delete(`/colors/${props.id}`)
      .then(res => {
        setColorToEdit(res.data)
        props.history.push(`/${props.id}`)
      })
      .catch(err => console.log('error in deleteColor', err))
    // make a delete request to delete this color
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
