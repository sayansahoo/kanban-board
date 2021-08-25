import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { mock } from "./mock";
import Item from "./Item";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-around",
    padding: "60px 30px 0 30px",
    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap",
    },
  },
  column: {
    display: "flex",
    flexDirection: "column",
    minWidth: "20%",
  },
  title: {
    fontWeight: 600,
    fontSize: 16,
  },
  columnHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },
}));

const Home = () => {
  const classes = useStyles();
  const [data, setData] = useState();

  useEffect(() => {
    let temp = {};
    const dataStored = sessionStorage.getItem("dataStored");
    const tempData =
      dataStored && Object.keys(dataStored).length
        ? JSON.parse(dataStored)
        : mock;
    Object.entries(tempData).forEach(([key, val]) => {
      temp = {
        ...temp,
        [key]: [
          ...Object.values(val).map((val1) => {
            return { ...val1, _id: uuid() };
          }),
        ],
      };
    });
    setData(temp);
  }, []);

  const statusArray = ["New Tasks", "In Progress", "Review", "Done"];

  const dragEndHandler = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const draggedCard = data[source.droppableId].find(
        (item, idx) => item._id === draggableId
      );
      let res;
      const ifSourceGreater = source.index > destination.index;
      if (ifSourceGreater) {
        const temp1 = [...data[source.droppableId]].slice(0, destination.index);
        const temp2 = [...data[source.droppableId]]
          .slice(destination.index)
          .filter((item) => item._id !== draggableId);
        let temp = [...temp1, draggedCard, ...temp2];
        res = {
          ...data,
          [destination.droppableId]: temp,
        };
      } else {
        const filteredData = data[source.droppableId].filter(
          (item) => item._id !== draggableId
        );
        const temp1 = filteredData.slice(0, destination.index);
        const temp2 = filteredData.slice(destination.index);
        const temp = [...temp1, draggedCard, ...temp2];
        res = {
          ...data,
          [destination.droppableId]: temp,
        };
      }
      setData(res);
      sessionStorage.setItem("dataStored", JSON.stringify(res));
    }

    if (source.droppableId !== destination.droppableId) {
      const draggedCard = data[source.droppableId].find(
        (item, idx) => item._id === draggableId
      );
      const removedData = data[source.droppableId].filter(
        (item) => item._id !== draggableId
      );
      const temp1 = data[destination.droppableId].slice(0, destination.index);
      const temp2 = data[destination.droppableId].slice(destination.index);
      const temp = [...temp1, draggedCard, ...temp2];

      const res = {
        ...data,
        [source.droppableId]: removedData,
        [destination.droppableId]: temp,
      };
      setData(res);
      sessionStorage.setItem("dataStored", JSON.stringify(res));
    }
  };

  return (
    <>
      {data && Object.keys(data).length && (
        <DragDropContext
          // onDragUpdate={(e) => console.log(e)}
          onDragEnd={dragEndHandler}
        >
          <div className={classes.container}>
            {statusArray.map((status, idx) => {
              return (
                <Droppable
                  droppableId={status.toLowerCase().split(" ").join("")}
                >
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={classes.column}
                      >
                        <div className={classes.columnHeader}>
                          <div className={classes.title}>{status}</div>
                          <MoreHorizIcon
                            fontSize="medium"
                            style={{ color: "rgba(0,0,0,0.5)" }}
                          />
                        </div>
                        {data[status.toLowerCase().split(" ").join("")].map(
                          (item, index) => (
                            <Draggable
                              index={index}
                              key={item._id}
                              draggableId={item._id}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps.style}
                                  >
                                    <Item item={item} />
                                  </div>
                                );
                              }}
                            </Draggable>
                          )
                        )}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              );
            })}
          </div>
        </DragDropContext>
      )}
    </>
  );
};

export default Home;
