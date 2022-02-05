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

  return (
    <React.Fragment>
      <h1>{activity.from}</h1>
    </React.Fragment>
  );
};

export default ActivityDetail;
