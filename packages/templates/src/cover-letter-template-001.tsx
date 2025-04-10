import React from "react"
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"

import type { CoverLetter } from "@jobshine/validators"
import { getBaseUrl } from "@jobshine/common"

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
    padding: "40pt 30pt",
    fontFamily: "Garamond",
    fontSize: 12,
    lineHeight: 1.3,
  },
  senderInfo: {
    textAlign: "left",
    marginBottom: 30,
  },
  senderName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  senderContact: {
    fontSize: 11,
    marginBottom: 2,
  },
  senderWebsiteLink: {
    fontSize: 11,
    color: "blue",
    textDecoration: "none",
  },
  dateStyle: {
    fontSize: 12,
    marginBottom: 30,
    textAlign: "left",
  },
  salutation: {
    fontSize: 12,
    marginBottom: 15,
  },
  bodyText: {
    fontSize: 12,
    marginBottom: 15,
    textAlign: "justify",
  },
  closingText: {
    fontSize: 12,
    marginBottom: 4,
  },
  typedSenderName: {
    fontSize: 12,
    fontWeight: "bold",
  },
})

export function CoverLetterTemplate_001({
  coverLetter,
}: {
  coverLetter: CoverLetter
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sender Info (Top Left) */}
        <View style={styles.senderInfo}>
          <Text style={styles.senderName}>{coverLetter.senderName}</Text>
          {coverLetter.senderAddress.split("\n").map((line, index) => (
            <Text key={`sender-addr-${index}`} style={styles.senderContact}>
              {line}
            </Text>
          ))}
          <Text style={styles.senderContact}>{coverLetter.senderPhone}</Text>
          <Text style={styles.senderContact}>{coverLetter.senderEmail}</Text>
        </View>

        {/* Salutation */}
        <Text style={styles.salutation}>Dear Hiring Manager,</Text>

        {/* Body Text */}
        {coverLetter.body.split("\n").map((paragraph, index) => (
          <Text key={`body-para-${index}`} style={styles.bodyText}>
            {paragraph}
          </Text>
        ))}

        {/* Closing */}
        <Text style={styles.closingText}>Sincerely,</Text>
        <Text style={styles.typedSenderName}>{coverLetter.senderName}</Text>
      </Page>
    </Document>
  )
}
