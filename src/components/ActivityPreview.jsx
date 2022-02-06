import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ActivityPreview = ({ activity, handleArchive }) => {
  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start my-2"
    >
      <Link
        to={`/activities/${activity.id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="pt-3">
          {activity.direction === "inbound" && (
            <h3 className="text-dark">{"From: " + activity.from}</h3>
          )}
          {activity.direction === "outbound" && (
            <h3 className="text-dark">{"To: " + activity.to}</h3>
          )}
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
