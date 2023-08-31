import { useAppSelector } from "../app/hooks";

const FloatingButton = () => {
  const UiUpdate = useAppSelector((state) => state.home.UiUpdate);

  function drag_start(event: any) {
    var style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData(
      "text/plain",
      parseInt(style.getPropertyValue("left"), 10) -
        event.clientX +
        "," +
        (parseInt(style.getPropertyValue("top"), 10) - event.clientY)
    );
  }
  function drag_over(event: any) {
    event.preventDefault();
    return false;
  }
  function drop(event: any) {
    var offset = event.dataTransfer.getData("text/plain").split(",");
    var dm: any = document.getElementById("dragme");
    dm.style.left = event.clientX + parseInt(offset[0], 10) + "px";
    dm.style.top = event.clientY + parseInt(offset[1], 10) + "px";
    event.preventDefault();
    return false;
  }
  var dm: any = document.getElementById("dragme");
  if (dm) {
    dm.addEventListener("dragstart", drag_start, false);
  }
  document.body.addEventListener("dragover", drag_over, false);
  document.body.addEventListener("drop", drop, false);

  return (
    <div
      className="absolute right-[2.5px] bottom-[70px] bg-primary rounded-full flex justify-center items-center"
      draggable="true"
      id="dragme"
      style={{ display: UiUpdate ? "block" : "none" }}
    >
      <img
        src="/images/refresh-arrow-white.png"
        alt="refresh"
        className="h-10 w-10 p-3"
      />
    </div>
  );
};

export default FloatingButton;
