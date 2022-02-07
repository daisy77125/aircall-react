import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";

const ActivityPreview = ({ activity, handleArchive }) => {
  const getMessage = (activity) => {
    if (activity.call_type === "voicemail") {
      return "left a voice message";
    }
    return `${activity.call_type === "missed" ? "tried to call" : "called"} ${
      activity.to
    }`;
  };

  const iconColor = activity.call_type === "missed" ? "red" : "green";

  const borderStyle = {
    borderBottom: "1px dotted black",
    width: "20%",
  };

  return (
    <ListGroup.Item as="li" className="my-2">
      <div className="d-flex justify-content-start align-items-center mb-2">
        <div style={borderStyle}></div>
        <span className="px-1">
          {moment(activity.created_at).format("YYYY-MM-DD hh:mm:ss A")}
        </span>
        <div style={borderStyle}></div>
      </div>
      <div className="d-flex justify-content-start align-items-center">
        <i
          className={
            activity.call_type === "voicemail"
              ? "bi bi-voicemail"
              : "bi bi-telephone-" + activity.direction
          }
          style={{ fontSize: "1rem", color: iconColor }}
        ></i>
        <Link
          to={`/activities/${activity.id}`}
          className="ms-3"
          style={{ textDecoration: "none", color: "black" }}
        >
          <span>{activity.from}</span>
          <div>{getMessage(activity)}</div>
        </Link>
        <Button
          variant="light"
          className="ms-auto"
          onClick={() => {
            handleArchive(activity.id);
          }}
        >
          {activity.is_archived ? (
            "Unarchive it"
          ) : (
            <i className="bi-archive"></i>
          )}
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default ActivityPreview;
