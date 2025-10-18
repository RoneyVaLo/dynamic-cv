import React from "react";
import BulletItem from "../components/edit/BulletItem";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { useData } from "../context/useData";

const ResumeEdit = () => {
  const { data, setData } = useData();

  const navigate = useNavigate();

  // Evita errores si el contexto aún no está cargado
  if (!data || Object.keys(data).length === 0) {
    return <div>Cargando...</div>;
  }

  const {
    personal,
    profile,
    technologies,
    experience,
    education,
    skills,
    languages,
    labels,
  } = data;

  // 🔹 Añadir nueva educación directamente al contexto
  const addEducation = () => {
    const newEducation = { title: "", institution: "", year: "" };
    setData({
      ...data,
      education: [...(education || []), newEducation],
    });
  };

  // Eliminar educación
  const removeEducation = (index) =>
    setData({
      ...data,
      education: education.filter((_, i) => i !== index),
    });

  // 🔹 Añadir nueva habilidad directamente al contexto
  const addSkill = () => {
    setData({
      ...data,
      skills: [...(skills || []), ""],
    });
  };

  // Eliminar skill
  const removeSkill = (index) =>
    setData({
      ...data,
      skills: skills.filter((_, i) => i !== index),
    });

  // Eliminar tecnología
  const removeTechnology = (key) => {
    const updated = { ...technologies };
    delete updated[key];
    setData({ ...data, technologies: updated });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg">
      {/* Page 1 */}
      <div className="p-9 text-md text-gray-900 min-h-screen">
        {/* Header */}
        <div className="text-center mb-3">
          <h1 className="text-2xl font-bold mb-0.5">{personal.name}</h1>
          {/* <p className="text-md mb-0.5 text-gray-600">{personal.title}</p> */}
          <input
            type="text"
            defaultValue={personal.title}
            onChange={(e) =>
              setData({
                ...data,
                personal: { ...personal, title: e.target.value },
              })
            }
            className="text-md my-1 w-full text-gray-600 text-center border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 placeholder-transparent"
          />
          <p className="text-md mb-0.5 text-gray-600">
            {personal.contact.place} | {personal.contact.email} |{" "}
            {personal.contact.phone}
          </p>
          <p className="text-md text-gray-600">
            {personal.contact.websites.map((w, i) => (
              <React.Fragment key={i}>
                <a href={w.src} className="text-black hover:underline">
                  {w.name}
                </a>
                {i + 1 < personal.contact.websites.length && " | "}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Professional Profile */}
        <div className="mt-6 mb-4">
          <h2 className="text-lg font-bold mb-2 border-b border-black uppercase">
            {labels.profile}
          </h2>
          <textarea
            className="leading-snug text-justify w-full min-h-20 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 placeholder-transparent px-2"
            defaultValue={profile.join("\n")}
            onChange={(e) =>
              setData({
                ...data,
                profile: e.target.value.split("\n"),
              })
            }
            rows={Math.ceil(profile.join("\n").length / 80) || 1}
          />
        </div>

        {/* Technologies */}
        <div className="mt-6 mb-4">
          <h2 className="text-lg font-bold mb-2 border-b border-black uppercase">
            {labels.technologies}
          </h2>
          {Object.entries(technologies).map(([key, value]) => (
            <div
              key={key}
              className="mb-2.5 leading-tight text-justify flex gap-2 items-center"
            >
              <span className="font-bold">{key}:</span>
              <input
                type="text"
                defaultValue={value}
                onChange={(e) =>
                  setData({
                    ...data,
                    technologies: { ...technologies, [key]: e.target.value },
                  })
                }
                className="flex-1 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 placeholder-transparent px-2"
              />
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removeTechnology(key)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Professional Experience */}
        <div className="mt-6 mb-4">
          <h2 className="text-lg font-bold mb-2 border-b border-black uppercase">
            {labels.experience}
          </h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <p className="font-bold mb-0.5 leading-tight text-justify">
                {exp.project}
              </p>
              <p className="mb-0.5 leading-tight text-justify">
                {exp.company} | {exp.date}
              </p>
              <p className="font-bold my-2 leading-tight text-justify">
                {labels.description}
              </p>
              <p className="mb-0.5 leading-tight text-justify">
                {exp.description}
              </p>
              {exp.tasks.map((task, idx) => (
                <BulletItem key={idx}>{task}</BulletItem>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Page 2 */}
      <div className="p-9 text-md text-gray-900 min-h-screen border-t-2 border-gray-300">
        {/* Education */}
        <div className="mt-6 mb-4">
          <h2 className="text-lg font-bold mb-2 border-b border-black uppercase">
            {labels.education}
          </h2>
          {education?.map((edu, i) => (
            <div
              key={i}
              className="mb-3 border border-slate-200 p-2 rounded-lg relative"
            >
              <div className="flex gap-2 items-center mb-2">
                <input
                  type="text"
                  value={edu.title}
                  onChange={(e) => {
                    const updated = education.map((ed, idx) =>
                      idx === i ? { ...ed, title: e.target.value } : ed
                    );
                    setData({ ...data, education: updated });
                  }}
                  className="font-bold w-full border-2 border-slate-300 rounded-lg focus:border-blue-500 px-2"
                />

                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeEducation(i)}
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={edu.institution}
                  size={edu.institution.length}
                  onChange={(e) => {
                    const updated = education.map((ed, idx) =>
                      idx === i ? { ...ed, institution: e.target.value } : ed
                    );
                    setData({ ...data, education: updated });
                  }}
                  className="border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 placeholder-transparent px-2"
                />
                <span className="border-l border-r mx-1"></span>
                <input
                  type="text"
                  value={edu.year}
                  size={edu.year.toString().length}
                  onChange={(e) => {
                    const updated = education.map((ed, idx) =>
                      idx === i ? { ...ed, year: e.target.value } : ed
                    );
                    setData({ ...data, education: updated });
                  }}
                  className="w-24 border-2 border-slate-300 rounded-lg focus:border-blue-500 px-2"
                />
              </div>
            </div>
          ))}
          <div className="w-full flex justify-center mt-4">
            <button
              className="px-6 py-2 border cursor-pointer rounded hover:scale-105 active:scale-95 transition-transform duration-200"
              onClick={addEducation}
            >
              <Plus className="h-6 w-6 text-emerald-600" />
            </button>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6 mb-4">
          <h2 className="text-lg font-bold mb-2 border-b border-black uppercase">
            {labels.skills}
          </h2>
          {skills?.map((skill, i) => (
            <div
              key={i}
              className="flex items-center gap-2 border border-slate-200 p-2 rounded-lg mb-2"
            >
              <input
                type="text"
                value={skill}
                onChange={(e) => {
                  const updated = skills.map((s, idx) =>
                    idx === i ? e.target.value : s
                  );
                  setData({ ...data, skills: updated });
                }}
                className="flex-1 border-2 border-slate-300 rounded-lg focus:border-blue-500 px-2"
              />
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removeSkill(i)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <div className="w-full flex justify-center mt-4">
            <button
              className="px-6 py-2 border cursor-pointer rounded hover:scale-105 active:scale-95 transition-transform duration-200"
              onClick={addSkill}
            >
              <Plus className="h-6 w-6 text-emerald-600" />
            </button>
          </div>
        </div>

        {/* Languages */}
        <div className="mt-6 mb-4">
          <h2 className="text-lg font-bold mb-2 border-b border-black uppercase">
            {labels.languages}
          </h2>
          {languages.map((lang, i) => (
            <p key={i} className="mb-0.5 leading-tight text-justify text-md">
              {lang}
            </p>
          ))}
        </div>

        <div className="w-full flex justify-center items-center my-4 pt-4">
          <button
            className="bg-slate-300 px-4 py-2 cursor-pointer rounded hover:scale-105 active:scale-95 transition-transform duration-200"
            onClick={() => navigate("/download")}
          >
            {labels.downloadButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeEdit;
