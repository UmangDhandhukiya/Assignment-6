/**
 * Renders a basic, full-screen loading spinner component.
 * Parameters: None.
 * The component covers the entire viewport (h-screen) with a white background and centers a spinner element (styled via the external 'loader' CSS class) to indicate an ongoing background process.
 */

const Loader = () => {
  return (
    <div className="h-screen bg-white flex justify-center items-center">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
