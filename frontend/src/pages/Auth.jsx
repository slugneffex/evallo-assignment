import getRandomNumber from "../utils/getRandomNumber";
import AuthForm from "../components/screens/AuthForm";

const Gallery = [
  "https://eviet.edu.vn/uploads/57(1)(1).jpg",
  "https://img.freepik.com/premium-vector/e-learning-online-education-online-teacher-computer-monitor-kids-studying-home-via-internet_1207-1025.jpg",
  "https://media.istockphoto.com/id/1396113348/vector/3d-web-vector-illustrations-online-concept-computer-with-open-pages-e-learning-design-over.jpg?s=612x612&w=0&k=20&c=UuGSBpij7N-sZLRU-akf97-k7EexWmKgv15EgeApRy0=",
];

const Register = () => {
  return (
    <div className="w-full h-screen flex flex-row-reverse">
      <AuthForm />

      <div className="bg-green-400 flex-1">
        <img
          src={Gallery[getRandomNumber()]}
          alt=""
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default Register;
