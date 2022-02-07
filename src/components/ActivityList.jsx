import React, { useState } from "react";
import { ListGroup, Button, Container, Row, Column } from "react-bootstrap";
import ActivityPreview from "./ActivityPreview.jsx";
import PaginationBar from "./PaginationBar.jsx";

const ActivityList = ({
  activities,
  pageSize,
  handleArchive,
  showResetButton,
  handleReset,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current activities
  const indexOfLastActivity = currentPage * pageSize;
  const indexOfFirstActivity = indexOfLastActivity - pageSize;
  const currentActivities = activities.slice(
    indexOfFirstActivity,
    indexOfLastActivity
  );

  return (
    <>
      {showResetButton && (
        <Button
          variant="light"
          className="mt-1 text-center w-100"
          onClick={handleReset}
        >
          Unarchive all calls{" "}
        </Button>
      )}

      <ListGroup as="ol">
        {currentActivities.map((activity) => (
          <ActivityPreview
            key={activity.id}
            activity={activity}
            handleArchive={handleArchive}
          />
        ))}
      </ListGroup>

      <PaginationBar
        totalPageCount={Math.ceil(activities.length / pageSize)}
        currentPage={currentPage}
        paginate={paginate}
      />
    </>
  );
};

export default ActivityList;
