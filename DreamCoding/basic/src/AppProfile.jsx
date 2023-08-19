import "./App.css";
import Avatar from './components/Avatar';
import Profile from "./components/Profile";

export default function AppProfile() {
  return (
    <div>
      <Avatar
        image="https://images.unsplash.com/photo-1602033350291-a9ab8d800269?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fCVFQyU5NiVCQyVFQSVCNSVCNHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        isNew={true}
      ></Avatar>
      <Profile
        image="https://images.unsplash.com/photo-1602033350291-a9ab8d800269?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fCVFQyU5NiVCQyVFQSVCNSVCNHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        name="rina"
        isNew={true}
        title="프론트엔드 고수"
      ></Profile>
      <Profile
        image="https://images.unsplash.com/photo-1691573479026-14dbac630c88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
        name="Anonymous"
        title="프론트엔드 초보"
      ></Profile>
      <Profile
        image="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=922&q=80"
        name="Andrew"
        title="백엔드 개발자"
      ></Profile>
    </div>
  );
}
