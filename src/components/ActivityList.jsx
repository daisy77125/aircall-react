import React, { useState, useEffect } from "react";
import { Tabs, Tab, Button, ListGroup } from "react-bootstrap";
import ActivityPreview from "./ActivityPreview.jsx";
import axios from "axios";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const apiUrl = "https://aircall-job.herokuapp.com";

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
        <ListGroup as="ol">
          {activities
            .filter((activity) => !activity.is_archived)
            .map((activity) => (
              <ActivityPreview
                key={activity.id}
                activity={activity}
                handleArchive={handleArchive}
              />
            ))}
        </ListGroup>
      </Tab>
      <Tab eventKey="second" title="Archive">
        <Button
          variant="light"
          className="mt-1 text-center w-100"
          onClick={handleReset}
        >
          Unarchive all calls{" "}
        </Button>
        <ListGroup as="ol">
          {activities
            .filter((activity) => activity.is_archived)
            .map((activity) => (
              <ActivityPreview
                key={activity.id}
                activity={activity}
                handleArchive={handleArchive}
              />
            ))}
        </ListGroup>
      </Tab>
    </Tabs>
  );
};

export default ActivityList;
