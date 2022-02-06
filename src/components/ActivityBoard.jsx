import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import ActivityList from "./ActivityList.jsx";

const ActivityBoard = () => {
  const [activities, setActivities] = useState([]);

  const apiUrl = "https://aircall-job.herokuapp.com";
  const pageSize = 4;

  useEffect(() => {
    axios
      .get(`${apiUrl}/activities`)
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleReset = () => {
    axios
      .get(`${apiUrl}/reset`)
      .then((response) => {
        if (response.status === 200) {
          const newActivities = activities.map((activity) => {
            const newActivity = {};
            Object.assign(newActivity, activity);
            newActivity.is_archived = false;
            return newActivity;
          });

          setActivities(newActivities);
        } else {
          alert("Error Resetting Activities");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleArchive = (id) => {
    const activity = activities.find((activity) => activity.id === id);
    axios
      .post(`${apiUrl}/activities/${id}`, {
        is_archived: !activity.is_archived,
      })
      .then((response) => {
        if (response.status === 200) {
          const newActivities = activities.map((item) => {
            if (item.id === id) {
              const updatedItem = {};
              Object.assign(updatedItem, item);
              updatedItem.is_archived = !item.is_archived;
              return updatedItem;
            }
            return item;
          });

          setActivities(newActivities);
        } else {
          alert("Error Resetting Activities");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Tabs defaultActiveKey="first">
      <Tab eventKey="first" title="Feed">
        <ActivityList
          activities={activities.filter((activity) => !activity.is_archived)}
          pageSize={pageSize}
          handleArchive={handleArchive}
          showResetButton={false}
          handleReset={handleReset}
        />
      </Tab>

      <Tab eventKey="second" title="Archive">
        <ActivityList
          activities={activities.filter((activity) => activity.is_archived)}
          pageSize={pageSize}
          handleArchive={handleArchive}
          showResetButton={true}
          handleReset={handleReset}
        />
      </Tab>
    </Tabs>
  );
};

export default ActivityBoard;
