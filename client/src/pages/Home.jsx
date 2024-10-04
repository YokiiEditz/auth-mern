import { useSelector } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  console.log("currentUser", currentUser);

  return (
    <>
      <div>
        <h1>Welcome to my Auth App, {currentUser?.username?.toUpperCase()}</h1>
        <br />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur,
          officiis molestias. Explicabo, voluptas impedit exercitationem quo
          itaque harum deleniti. Consequatur eum velit ad ipsam temporibus
          perferendis cupiditate natus dolorem est! Explicabo, obcaecati
          doloremque. Itaque quis rem corrupti illo incidunt, mollitia ipsam
          modi eligendi quaerat, ut, optio placeat dolorem enim ipsa.
        </p>
      </div>
    </>
  );
};

export default Home;
