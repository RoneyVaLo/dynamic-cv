import {
  Document,
  Link,
  Page,
  PDFDownloadLink,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import BulletItem from "../components/download/BulletItem";
import { useData } from "../context/useData";

const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#111",
  },
  header: {
    textAlign: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    marginVertical: 2,
    color: "#444",
  },
  section: {
    marginTop: 6,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 8,
    borderBottom: "1 solid #000",
    textTransform: "uppercase",
  },
  text: {
    marginBottom: 1,
    lineHeight: 1.2,
    textAlign: "justify",
    hyphens: "none",
  },
  bold: {
    fontWeight: "bold",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  bullet: {
    width: 10,
  },
  listText: {
    flex: 1,
  },
  link: {
    color: "black",
  },
});

// 📄 Documento dinámico
const ResumeDocument = ({ data }) => {
  // const { t } = useTranslation();

  // const personal = t("personal", { returnObjects: true });
  // const profile = t("profile", { returnObjects: true });
  // const technologies = t("technologies", { returnObjects: true });
  // const experience = t("experience", { returnObjects: true });
  // const education = t("education", { returnObjects: true });
  // const skills = t("skills", { returnObjects: true });
  // const languages = t("languages", { returnObjects: true });
  // const labels = t("labels", { returnObjects: true });

  return (
    <Document>
      {/* Página 1 */}
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personal.name}</Text>
          <Text style={styles.subtitle}>{data.personal.title}</Text>
          <Text style={styles.subtitle}>
            {data.personal.contact.place} | {data.personal.contact.email} |{" "}
            {data.personal.contact.phone}
          </Text>
          <Text style={styles.subtitle}>
            {data.personal.contact.websites.map((w, i) => (
              <>
                <Link src={w.src} key={i} style={styles.link}>
                  {w.name}
                </Link>
                {i + 1 < data.personal.contact.websites.length && " | "}
              </>
            ))}
          </Text>
        </View>

        {/* Perfil Profesional */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.labels.profile}</Text>
          {data.profile.map((p, i) => (
            <Text key={i} style={styles.text}>
              {p}
            </Text>
          ))}
        </View>

        {/* Tecnologías */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.labels.technologies}</Text>
          {Object.entries(data.technologies).map(([key, value]) => (
            <Text key={key} style={styles.text}>
              <Text style={styles.bold}>{key}:</Text> {value}
            </Text>
          ))}
        </View>

        {/* Experiencia Profesional */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.labels.experience}</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={{ marginBottom: 8 }}>
              <Text style={[styles.text, styles.bold]}>{exp.project}</Text>
              <Text style={styles.text}>
                {exp.company} | {exp.date}
              </Text>
              <Text style={[styles.text, styles.bold]}>
                {data.labels.description}
              </Text>
              <Text style={[styles.text, { lineHeight: 1 }]}>
                {exp.description}
              </Text>
              {exp.tasks.map((task, idx) => (
                <BulletItem key={idx}>{task}</BulletItem>
              ))}
            </View>
          ))}
        </View>
      </Page>

      {/* Página 2 */}
      <Page size="A4" style={styles.page}>
        {/* Educación */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.labels.education}</Text>
          {data.education.map((edu, i) => (
            <View key={i}>
              <Text style={[styles.text, styles.bold]}>• {edu.title}</Text>
              <Text style={[styles.text, { marginLeft: 8, marginTop: -6 }]}>
                {edu.institution} | {edu.year}
              </Text>
            </View>
          ))}
        </View>

        {/* Habilidades */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.labels.skills}</Text>
          {data.skills.map((skill, i) => (
            <BulletItem key={i} style={styles.text}>
              {skill}
            </BulletItem>
          ))}
        </View>

        {/* Idiomas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.labels.languages}</Text>
          {data.languages.map((lang, i) => (
            <Text key={i} style={styles.text}>
              {lang}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const ResumeDownload = () => {
  const { data } = useData();
  const { i18n } = useTranslation();

  return (
    <div className="relative">
      <PDFViewer className="w-full min-h-screen" showToolbar={false}>
        <ResumeDocument data={data} />
      </PDFViewer>

      {/* 📄 Link de descarga del PDF */}
      <PDFDownloadLink
        document={<ResumeDocument data={data} />}
        fileName={`CV_Roney_Valdelomar_${i18n.language}.pdf`}
        className="fixed top-4 right-10 bg-slate-300 px-4 py-2 rounded hover:scale-105 active:scale-95 transition-transform duration-200"
      >
        {({ loading }) => (loading ? "Generando PDF..." : "Descargar PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default ResumeDownload;
