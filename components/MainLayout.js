import Meta from "./Meta";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Meta />
      {children}
    </div>
  );
};

export default MainLayout;
