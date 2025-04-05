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
      src: `${getBaseUrl()}/fonts/EBGaramond-Regular.ttf`,
      fontStyle: "normal",
      fontWeight: "normal",
    },
    {
      src: `${getBaseUrl()}/fonts/EBGaramond-Italic.ttf`,
      fontStyle: "italic",
      fontWeight: "normal",
    },
    {
      src: `${getBaseUrl()}/fonts/EBGaramond-Bold.ttf`,
      fontStyle: "normal",
      fontWeight: "bold",
    },
    {
      src: `${getBaseUrl()}/fonts/EBGaramond-BoldItalic.ttf`,
      fontWeight: "bold",
      fontStyle: "italic",
    },
  ],
})

const styles = StyleSheet.create({
  page: {
    padding: "18pt 16pt",
    fontFamily: "Garamond",
    fontSize: 11,
    lineHeight: 1.15,
  },
  header: {
    marginBottom: 12,
  },
  fullName: {
    fontSize: 29,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  location: {
    fontSize: 11,
    textAlign: "center",
    marginBottom: 1,
  },
  contactInfo: {
    fontSize: 11,
    textAlign: "center",
    marginBottom: 8,
  },
  websiteLink: {
    fontSize: 10,
    textAlign: "right",
    color: "blue",
    textDecoration: "none",
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 4,
  },
  sectionDivider: {
    borderBottomWidth: 0.3,
    borderBottomColor: "#000000",
    marginBottom: 6,
  },
  sectionContent: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  companyName: {
    fontSize: 13,
    fontWeight: "bold",
  },
  experienceDate: {
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "right",
  },
  experienceBulletContainer: {
    maxWidth: 430,
  },
  experienceSubHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  positionTitle: {
    fontSize: 11,
    fontStyle: "italic",
  },
  experienceLocation: {
    fontSize: 11,
    fontStyle: "italic",
    textAlign: "right",
  },
  bulletPoint: {
    marginBottom: 1,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  schoolName: {
    fontSize: 13,
    fontWeight: "bold",
  },
  educationDate: {
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "right",
  },
  educationSubHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  degree: {
    fontSize: 11,
    fontStyle: "italic",
  },
  gpa: {
    fontSize: 11,
    fontStyle: "italic",
    textAlign: "right",
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  projectName: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 3,
  },
  projectDate: {
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "right",
  },
  projectLink: {
    fontSize: 10,
    color: "blue",
    textDecoration: "none",
  },
  projectDot: {
    fontSize: 9,
    textDecoration: "none",
    marginLeft: 3,
    marginRight: 3,
  },
})

export function ResumeTemplate_001({ resume }: { resume: Resume }) {
  const sortedWebsites = resume.websites.sort((a, b) => a.index - b.index)
  const sortedSkills = resume.skills.sort((a, b) => a.index - b.index)
  const sortedEducation = resume.education.sort((a, b) => a.index - b.index)
  const sortedExperience = resume.experience.sort((a, b) => a.index - b.index)
  const sortedProjects = resume.projects.sort((a, b) => a.index - b.index)

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
            {sortedWebsites.map((website, index) => (
              <Link key={index} src={website.url} style={styles.websiteLink}>
                <Text style={{ color: "black" }}>
                  {"  "}•{"  "}
                </Text>
                {website.url.replace("https://", "").replace("www.", "")}
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
            {sortedSkills.map((skill, index) => (
              <Text key={index}>
                {skill.skill}
                {index < sortedSkills.length - 1 ? ", " : ""}
              </Text>
            ))}
          </Text>
        </View>

        {/* Experience Section */}
        <View style={styles.sectionContent}>
          <Text style={styles.sectionHeader}>EXPERIENCE</Text>
          <View style={styles.sectionDivider} />

          {sortedExperience.map((exp, index) => (
            <View
              key={index}
              style={{
                marginBottom: index < resume.experience.length - 1 ? 12 : 0,
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
                {exp.bullets
                  .sort((a, b) => a.index - b.index)
                  .map((bullet, index) => (
                    <Text key={index}>• {bullet.bullet}</Text>
                  ))}
              </View>
            </View>
          ))}
        </View>

        {/* Projects Section */}
        <View style={styles.sectionContent}>
          <Text style={styles.sectionHeader}>PROJECTS</Text>
          <View style={styles.sectionDivider} />

          {sortedProjects.map((project, index) => (
            <View
              key={index}
              style={{
                marginBottom: index < resume.projects.length - 1 ? 10 : 0,
              }}
            >
              <View style={styles.projectHeader}>
                <Text style={styles.projectName}>{project.name}</Text>
                {project.link && (
                  <>
                    <Text style={styles.projectDot}>{"  "}•</Text>
                    <Link src={project.link} style={styles.projectLink}>
                      {project.link.replace("https://", "").replace("www.", "")}
                    </Link>
                  </>
                )}
              </View>
              <View>
                {project.bullets
                  .sort((a, b) => a.index - b.index)
                  .map((bullet, index) => (
                    <Text key={index}>• {bullet.bullet}</Text>
                  ))}
              </View>
            </View>
          ))}
        </View>

        {/* Education Section */}
        <View style={styles.sectionContent}>
          <Text style={styles.sectionHeader}>EDUCATION</Text>
          <View style={styles.sectionDivider} />

          {sortedEducation.map((edu, index) => (
            <View
              key={index}
              style={{
                marginBottom: index < resume.education.length - 1 ? 10 : 0,
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
