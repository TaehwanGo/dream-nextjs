import { PORTAL_ID } from "@/constants/ids";
import ReactDOM from "react-dom";

interface Props {
  children: React.ReactNode;
}
export default function ModalPortal({ children }: Props) {
  // 서버사이드에선 이것을 렌더링하지 않는다.
  if (typeof window === "undefined") return null;

  const node = document.getElementById(PORTAL_ID) as Element;
  return ReactDOM.createPortal(children, node);
}
