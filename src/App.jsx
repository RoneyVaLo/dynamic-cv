import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ResumeDownload from "./pages/ResumeDownload";
import ResumeEdit from "./pages/ResumeEdit";
import { useTranslation } from "react-i18next";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ResumeEdit />,
      errorElement: <div className="text-white">Pagina no encontrada...</div>,
    },
    {
      path: "/download",
      element: <ResumeDownload />,
      errorElement: <div>Pagina no encontrada...</div>,
    },
  ]);

  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
      localStorage.setItem("lang", lng);
      window.location.reload();
    }
  };

  return (
    <div className="bg-[#363636]">
      <div className="fixed top-4 left-10 flex gap-2 z-10">
        <button
          onClick={() => changeLanguage("es")}
          className={`bg-slate-300 px-3 py-1 rounded hover:scale-105 active:scale-95 transition-transform duration-200 ${
            i18n.language === "es" ? "font-bold" : ""
          }`}
        >
          ES
        </button>
        <button
          onClick={() => changeLanguage("en")}
          className={`bg-slate-300 px-3 py-1 rounded hover:scale-105 active:scale-95 transition-transform duration-200 ${
            i18n.language === "en" ? "font-bold" : ""
          }`}
        >
          EN
        </button>
      </div>

      <RouterProvider router={router} />
    </div>
  );
};

export default App;
