import taskdonecss from "./Todo.module.css";

function Taskdone(props) {
  return (
    <div className={taskdonecss.container}>
      <section className={taskdonecss.SecContainer}>
        <div className={taskdonecss.prog}>Task Progress</div>
        <button className={taskdonecss.bar}>
          {" "}
          <span className={taskdonecss.two}>{props.Ctask}</span>/{props.Ttask}{" "}
          Completed
        </button>
      </section>
      <div>
        <h5 className={taskdonecss.Hpending}>
          Pending Task:{" "}
          <span style={{ color: "#00bb44", fontSize: "19px" }}>
            {props.Ptask}
          </span>
        </h5>
      </div>
    </div>
  );
}

export default Taskdone;
