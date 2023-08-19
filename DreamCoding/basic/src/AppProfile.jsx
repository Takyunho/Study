import "./App.css";
import Profile from "./components/Profile";

export default function AppProfile() {
  return (
    <>
      <Profile
        image="https://images.unsplash.com/photo-1602033350291-a9ab8d800269?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fCVFQyU5NiVCQyVFQSVCNSVCNHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        name="rina"
        title="프론트엔드 고수"
      ></Profile>
      <Profile
        image="https://images.unsplash.com/photo-1691573479026-14dbac630c88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
        name="Anonymous"
        title="프론트엔드 초보"
      ></Profile>
    </>
  );
}
