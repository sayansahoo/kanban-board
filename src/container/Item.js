import React from "react";
import { makeStyles } from "@material-ui/core";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import profile from "../utils/images/profile.PNG";

const useStyles = makeStyles(() => ({
  box: {
    display: "flex",
    borderRadius: 4,
    border: "1px solid rgb(0 0 0 / 20%)",
    padding: "15px 15px 0 15px",
    fontSize: 14,
    marginBottom: 20,
    flexDirection: "column",
    background: "white",
  },
  firstRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  priority: {
    marginRight: 10,
    alignItems: "center",
    display: "flex",
    padding: "2px 5px",
    color: "white",
    textTransform: "uppercase",
    fontSize: 8,
    fontWeight: 600,
    borderRadius: 3,
  },
  title: {
    fontWeight: 600,
    marginBottom: 5,
  },
  tags: {
    color: "#03d7fc",
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 10,
  },
  circle: {
    border: "1px dashed rgba(0,0,0,0.5)",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    position: "relative",
  },
  addBtn: {
    left: "25%",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bottom: "12%",
    color: "rgba(0,0,0,0.5)",
  },
  imgCircle: {
    borderRadius: "50%",
    width: "22px",
    height: "23px",
    position: "relative",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: '50%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
}));

const Item = (props) => {
  const { item } = props;
  const classes = useStyles();
  const backgroundColor = {
    high: "orange",
    urgent: "red",
    normal: "green",
    low: "lightGreen",
  };

  return (
    <div className={classes.box}>
      <div className={classes.firstRow}>
        <div style={{ display: "flex", marginRight: 50 }}>
          <div
            className={classes.priority}
            style={{
              background: backgroundColor[item.priority.toLowerCase()],
            }}
          >
            {item.priority}
          </div>
          <div style={{ color: "rgba(0,0,0,0.5)" }}>#{item.ticketNo}</div>
        </div>
        <div style={{ color: "rgba(0,0,0,0.5)" }}>{item.time}</div>
      </div>
      <div className={classes.title}>{item.title}</div>
      <div className={classes.tags}>
        {item.tags.map((t, idx) => (
          <span>{`${t}${idx !== item.tags.length - 1 ? "," : ""} `}</span>
        ))}
      </div>
      <div className={classes.firstRow}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <ChatBubbleIcon
            style={{ color: "rgba(0,0,0,0.5)", fontSize: 14, marginRight: 5 }}
          />
          <div
            style={{ fontSize: 10, color: "rgba(0,0,0,0.5)", marginRight: 8 }}
          >
            {item.comments && item.comments.length}
          </div>
          <AttachFileIcon style={{ color: "rgba(0,0,0,0.5)", fontSize: 14 }} />
          <div
            style={{ fontSize: 10, color: "rgba(0,0,0,0.5)", marginRight: 8 }}
          >
            3
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={classes.circle} style={{ marginRight: 5 }}>
            <div className={classes.addBtn}>+</div>
          </div>
          <div alt="img" className={classes.imgCircle}>
            <img className={classes.img} src={profile} alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
