import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Home() {
  const [data, setData] = useState([]);
  // const [deleteData, setDeletedata] = useState([]);
  const showPeople = async () => {
    await axios.get('http://localhost:5000').then((res) => {
      // const { data } = res;
      // console.log(res);
      setData(res.data);
    });
  };
  console.log(data);
  useEffect(() => {
    showPeople();
  }, []);

  // delete people

  const deletePeople = async (id) => {
    console.log(id);
    await axios
      .delete(`http://localhost:5000/crud/delete/${id}`)
      .then((res) => {
        // console.log(res);
        console.log(res.data);
        showPeople();
      });
  };

  return (
    <div>
      <div className="row my-3">
        <div className="col">
          <h1>Home</h1>
        </div>
        <div className="col-6">
          <Link to="/crud">
            <button type="button" className="btn btn-success">
              Add data
            </button>
          </Link>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr>
              <th>{(index += 1)}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.number}</td>
              <td className="d-flex justify-content-between">
                <div className="row ">
                  <div className=" col-6 m-1">
                    <NavLink to={`update/${item._id}`}>
                      <button type="button" className="btn btn-secondary">
                        Update
                      </button>
                    </NavLink>
                  </div>
                  <div className=" col m-1">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deletePeople(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
