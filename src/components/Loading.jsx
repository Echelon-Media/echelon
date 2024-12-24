import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <ReactLoading
      style={{ margin: "5% auto", width: "10%" }}
      type={"bubbles"}
      color={"black"}
      delay={20}
    />
  );
};

export default Loading;
