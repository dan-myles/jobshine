import React from "react"
import {
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"

import type { Resume } from "@acme/validators"
import { getBaseUrl } from "@acme/common"

Font.register({
  family: "Garamond",
  fonts: [
    {
      src: `http://localhost:3000/fonts/EBGaramond-Regular.ttf`,
      fontStyle: "normal",
      fontWeight: "normal",
    },
    {
      src: `http://localhost:3000/fonts/EBGaramond-Italic.ttf`,
      fontStyle: "italic",
      fontWeight: "normal",
    },
    {
      src: `http://localhost:3000/fonts/EBGaramond-Bold.ttf`,
      fontStyle: "normal",
      fontWeight: "bold",
    },
    {
      src: `http://localhost:3000/fonts/EBGaramond-BoldItalic.ttf`,
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
})

const styles = StyleSheet.create({
  page: {
    padding: "20pt 16pt",
    fontFamily: "Garamond",
    fontSize: 12,
    lineHeight: 1.2,
  },
  header: {
    marginBottom: 15,
  },
  fullName: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  location: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 2,
  },
  contactInfo: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },
  websiteLink: {
    fontSize: 11,
    textAlign: "right",
    color: "blue",
    textDecoration: "none",
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sectionDivider: {
    borderBottomWidth: 0.3,
    borderBottomColor: "#000000",
    marginBottom: 8,
  },
  sectionContent: {
    marginBottom: 15,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  experienceDate: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "right",
  },
  experienceBulletContainer: {
    maxWidth: 425,
  },
  experienceSubHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  positionTitle: {
    fontSize: 12,
    fontStyle: "italic",
  },
  experienceLocation: {
    fontSize: 12,
    fontStyle: "italic",
    textAlign: "right",
  },
  bulletPoint: {
    marginBottom: 2,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  schoolName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  educationDate: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "right",
  },
  educationSubHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  degree: {
    fontSize: 12,
    fontStyle: "italic",
  },
  gpa: {
    fontSize: 12,
    fontStyle: "italic",
    textAlign: "right",
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  projectName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  projectDate: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "right",
  },
  projectLink: {
    fontSize: 11,
    color: "blue",
    textDecoration: "none",
  },
  projectDot: {
    fontSize: 10,
    textDecoration: "none",
    marginLeft: 3,
    marginRight: 3,
  },
})

export function ResumeTemplate_001({ resume }: { resume: Resume }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.fullName}>{resume.fullName}</Text>
        </View>
        <View>
          <Text style={styles.location}>{resume.location}</Text>
        </View>
        <View>
          <Text style={styles.contactInfo}>
            {resume.email}
            {"  "}•{"  "}
            {resume.phone}
            {resume.websites.map((website, index) => (
              <Link key={index} src={website} style={styles.websiteLink}>
                <Text style={{ color: "black" }}>
                  {"  "}•{"  "}
                </Text>
                {website.replace("https://", "")}
              </Link>
            ))}
          </Text>
        </View>

        {/* Summary Section */}
        <View style={styles.sectionContent}>
          <Text style={styles.sectionHeader}>SUMMARY</Text>
          <View style={styles.sectionDivider} />
          <Text>{resume.summary}</Text>
        </View>

        {/* Skills Section */}
        <View style={styles.sectionContent}>
          <Text style={styles.sectionHeader}>SKILLS</Text>
          <View style={styles.sectionDivider} />
          <Text>
            {resume.skills.map((skill, index) => (
              <Text key={index}>
                {skill}
                {index < resume.skills.length - 1 ? ", " : ""}
              </Text>
            ))}
          </Text>
        </View>

        {/* Experience Section */}
        <View style={styles.sectionContent}>
          <Text style={styles.sectionHeader}>EXPERIENCE</Text>
          <View style={styles.sectionDivider} />

          {resume.experience.map((exp, index) => (
            <View
              key={index}
              style={{
                marginBottom: index < resume.experience.length - 1 ? 15 : 0,
              }}
            >
              <View style={styles.experienceHeader}>
                <Text style={styles.companyName}>{exp.company}</Text>
                <Text style={styles.experienceDate}>
                  {exp.from} - {exp.to}
                </Text>
              </View>
              <View style={styles.experienceSubHeader}>
                <Text style={styles.positionTitle}>{exp.title}</Text>
                <Text style={styles.experienceLocation}>{exp.location}</Text>
              </View>
              <View style={styles.experienceBulletContainer}>
                {exp.bullets.map((bullet, index) => (
                  <Text key={index}>• {bullet}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Projects Section */}
        <View style={styles.sectionContent}>
          <Text style={styles.sectionHeader}>PROJECTS</Text>
          <View style={styles.sectionDivider} />

          {resume.projects.map((project, index) => (
            <View
              key={index}
              style={{
                marginBottom: index < resume.projects.length - 1 ? 12 : 0,
              }}
            >
              <View style={styles.projectHeader}>
                <Text style={styles.projectName}>{project.name}</Text>
                {project.link && (
                  <>
                    <Text style={styles.projectDot}>{"  "}•</Text>
                    <Link src={project.link} style={styles.projectLink}>
                      {project.link.replace("https://", "")}
                    </Link>
                  </>
                )}
              </View>
              <View>
                {project.bullets.map((bullet, index) => (
                  <Text key={index}>• {bullet}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Education Section */}
        <View style={styles.sectionContent}>
          <Text style={styles.sectionHeader}>EDUCATION</Text>
          <View style={styles.sectionDivider} />

          {resume.education.map((edu, index) => (
            <View
              key={index}
              style={{
                marginBottom: index < resume.education.length - 1 ? 12 : 0,
              }}
            >
              <View style={styles.educationHeader}>
                <Text style={styles.schoolName}>{edu.school}</Text>
                <Text style={styles.educationDate}>
                  {edu.from} - {edu.to}
                </Text>
              </View>
              <View style={styles.educationSubHeader}>
                <Text style={styles.degree}>
                  {edu.degree} in {edu.field}
                </Text>
                {edu.gpa && <Text style={styles.gpa}>GPA: {edu.gpa}</Text>}
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}
