import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ActivityPreview = ({ activity, handleArchive }) => {
  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start my-2"
    >
      <Link to={`/activities/${activity.id}`}>
        <div className="ms-2 me-auto">
          <div className="fw-bold">{activity.via}</div>
          Cras justo odio
        </div>
      </Link>
      <Button
        variant="light"
        className="mt-1"
        onClick={() => {
          handleArchive(activity.id);
        }}
      >
        {activity.is_archived ? "Unarchive it" : "Archive it"}
      </Button>
    </ListGroup.Item>
  );
};

export default ActivityPreview;
