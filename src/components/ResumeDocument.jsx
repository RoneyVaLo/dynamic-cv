import { Document, Link, Page, Text, View } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import BulletItem from "./BulletItem";

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
    textAlign: "balance",
  },
  //   listItem: {
  //     marginLeft: 10,
  //     lineHeight: 1.2,
  //     marginVertical: 2,
  //   },
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

const ResumeDocument = () => {
  const { t } = useTranslation();

  const personal = t("personal", { returnObjects: true });
  const profile = t("profile", { returnObjects: true });
  const technologies = t("technologies", { returnObjects: true });
  const experience = t("experience", { returnObjects: true });
  const education = t("education", { returnObjects: true });
  const skills = t("skills", { returnObjects: true });
  const languages = t("languages", { returnObjects: true });
  // const labels = t("labels", { returnObjects: true });
  console.log(personal);

  return (
    <Document>
      {/* Página 1 */}
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.name}>{personal.name}</Text>
          <Text style={styles.subtitle}>{personal.title}</Text>
          <Text style={styles.subtitle}>
            {personal.contact.place} | {personal.contact.email} |{" "}
            {personal.contact.phone}
          </Text>
          <Text style={styles.subtitle}>
            {personal.contact.websites.map((w, i) => (
              <>
                <Link src={w.src} key={i} style={styles.link}>
                  {w.name}
                </Link>
                {i + 1 < personal.contact.websites.length && " | "}
              </>
            ))}
          </Text>
        </View>

        {/* Perfil Profesional */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil Profesional</Text>
          {profile.map((p, i) => (
            <Text key={i} style={styles.text}>
              {p}
            </Text>
          ))}
        </View>

        {/* Tecnologías */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tecnologías</Text>
          {Object.entries(technologies).map(([key, value]) => (
            <Text key={key} style={styles.text}>
              <Text style={styles.bold}>{key}:</Text> {value}
            </Text>
          ))}
        </View>

        {/* Experiencia Profesional */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experiencia Profesional</Text>
          {experience.map((exp, i) => (
            <View key={i} style={{ marginBottom: 8 }}>
              <Text style={[styles.text, styles.bold]}>{exp.project}</Text>
              <Text style={styles.text}>
                {exp.company} | {exp.date}
              </Text>
              <Text style={[styles.text, styles.bold]}>Descripción</Text>
              <Text style={styles.text}>{exp.description}</Text>
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
          <Text style={styles.sectionTitle}>Educación</Text>
          {education.map((edu, i) => (
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
          <Text style={styles.sectionTitle}>Habilidades</Text>
          {skills.map((skill, i) => (
            <BulletItem key={i} style={styles.text}>
              {skill}
            </BulletItem>
          ))}
        </View>

        {/* Idiomas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Idiomas</Text>
          {languages.map((lang, i) => (
            <Text key={i} style={styles.text}>
              {lang}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ResumeDocument;
