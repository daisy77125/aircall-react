import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

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

  const displayItem = (key, value) => (
    <li className="list-group-item" key={key}>
      {key}: {value}
    </li>
  );
  const items = [];
  Object.entries(activity).forEach(([key, value]) => {
    switch (key) {
      case "id":
        break;
      case "created_at":
        items.push(
          displayItem("time", moment(value).format("YYYY-MM-DD hh:mm:ss A"))
        );
        break;
      case "direction":
        items.push(displayItem(key, value));
        break;
      case "from":
        items.push(displayItem(key, value));
        break;
      case "to":
        items.push(displayItem(key, value));
        break;
      case "via":
        items.push(displayItem(key, value));
        break;
      case "duration":
        items.push(displayItem(key, value + " sec"));
        break;
      case "is_archived":
        items.push(
          displayItem("status", value ? "archived" : "not archived yet")
        );
        break;
      case "call_type":
        items.push(displayItem("type", value));
        break;
      default:
        break;
    }
  });

  return <ul className="list-group list-group-flush">{items}</ul>;
};

export default ActivityDetail;
