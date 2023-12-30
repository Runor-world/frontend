const MainContentWrapper = ({ children }) => {
  return (
    <section className="w-full min-h-[50vh] main-x-p mt-32 lg:mt-40 flex flex-col justify-center gap-10 py-5">
      {children}
    </section>
  );
};

MainContentWrapper.propTypes = {};

export default MainContentWrapper;
