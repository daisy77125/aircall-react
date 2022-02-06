import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState([]);
  const apiUrl = "https://aircall-job.herokuapp.com";

  useEffect(() => {
    axios
      .get(`${apiUrl}/activities/${id}`)
      .then((response) => {
        setActivity(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const items = [];
  Object.entries(activity).forEach(([key, value]) => {
    items.push(
      <li className="list-group-item" key={key}>
        {key}: {value}
      </li>
    );
  });

  return (
    <React.Fragment>
      <ul className="list-group">{items}</ul>
    </React.Fragment>
  );
};

export default ActivityDetail;
